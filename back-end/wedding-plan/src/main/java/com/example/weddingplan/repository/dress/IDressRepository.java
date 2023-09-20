package com.example.weddingplan.repository.dress;

import com.example.weddingplan.model.Dress;
import com.example.weddingplan.projection.IDressProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface IDressRepository extends JpaRepository<Dress, Long> {
    Page<Dress> getAllByFlagDeleteIsFalseAndNameDressContainingAndTypeDress_NameTypeDressContainingAndItemStatus_NameStatusContaining
            (Pageable pageable, String nameDress, String nameTypeDress, String nameStatus);

    Dress getDressByFlagDeleteIsFalseAndNameDressContaining(String name);

    List<Dress> getAllByFlagDeleteIsFalse();

    List<Dress> getAllByFlagDeleteIsFalseAndTypeDress_NameTypeDress(String typeDress);

    Dress getDressByFlagDeleteIsFalseAndIdDress(Long id);

    @Modifying
    @Query(nativeQuery = true,
            value = "select d.id_dress as idDress, d.name_dress as nameDress\n" +
                    "from dress d\n" +
                    "         join type_dress td on td.id_type_dress = d.id_type_dress\n" +
                    "where d.id_status = 1 and td.name_type_dress = :name\n" +
                    "   or d.id_status = 2 and d.id_dress in (\n" +
                    "    select distinct cd.id_dress\n" +
                    "    from contract_detail cd\n" +
                    "             join contract c\n" +
                    "                  on c.id_contract = cd.id_contract\n" +
                    "    where ((:date <= date_sub(c.start_date, interval 10 day)) or (:date >= date_add(c.end_date, interval 7 day )))\n" +
                    "      and c.status_contract = false and c.cancel_contract = false\n" +
                    "      and cd.id_dress not in (\n" +
                    "        select cd.id_dress\n" +
                    "        from contract_detail cd\n" +
                    "                 join contract c\n" +
                    "                      on c.id_contract = cd.id_contract\n" +
                    "        where ((:date <= date_sub(c.start_date, interval 10 day)) or (:date >= date_add(c.end_date, interval 7 day )))\n" +
                    "    )\n" +
                    ");")
    List<IDressProjection> getDressRented(@Param("name") String name, @Param("date") String date);

    List<Dress> getAllByTypeDress_NameTypeDressAndItemStatus_IdStatus(String nameType, Long idStatus);

    List<Dress> getDressByDateMaintenanceIsNotNullAndFlagDeleteIsFalse();

    List<Dress> getDressByDateMaintenanceIsNotNullAndFlagDeleteIsFalseAndItemStatus_IdStatus(Long id);
}
