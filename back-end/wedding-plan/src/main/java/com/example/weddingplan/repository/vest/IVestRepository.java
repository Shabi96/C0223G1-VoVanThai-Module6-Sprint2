package com.example.weddingplan.repository.vest;

import com.example.weddingplan.model.Vest;
import com.example.weddingplan.projection.IVestProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface IVestRepository extends JpaRepository<Vest, Long> {
    Vest getVestByFlagDeleteIsFalseAndIdVest(Long id);

    Page<Vest> getVestByFlagDeleteIsFalseAndNameVestContainingAndItemStatus_NameStatusContaining(Pageable pageable, String nameVest, String nameStatus);

    List<Vest> getAllByFlagDeleteIsFalse();

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value =
            "select v.id_vest as idVest, v.name_vest as nameVest\n" +
                    "from vest v\n" +
                    "where v.id_status = 1\n" +
                    "   or v.id_status = 2 and v.id_vest in (\n" +
                    "    select distinct cd.id_vest\n" +
                    "    from contract_detail cd\n" +
                    "             join contract c\n" +
                    "                  on c.id_contract = cd.id_contract\n" +
                    "    where ((:date <= date_sub(c.start_date, interval 10 day)) or (:date >= date_add(c.end_date, interval 7 day )))\n" +
                    "      and c.status_contract = false and c.cancel_contract = false\n" +
                    "      and cd.id_vest not in (\n" +
                    "        select cd.id_vest\n" +
                    "        from contract_detail cd\n" +
                    "                 join contract c\n" +
                    "                      on c.id_contract = cd.id_contract\n" +
                    "        where ((:date <= date_sub(c.start_date, interval 10 day)) or (:date >= date_add(c.end_date, interval 7 day )))\n" +
                    "    )\n" +
                    ");")
    List<IVestProjection> getVestRented(@Param("date") String date);

    List<Vest> getAllByItemStatus_IdStatus(Long id);

    List<Vest> getVestByDateMaintenanceIsNotNullAndFlagDeleteIsFalse();
    List<Vest> getVestByDateMaintenanceIsNotNullAndFlagDeleteIsFalseAndItemStatus_IdStatus(Long id);

}
