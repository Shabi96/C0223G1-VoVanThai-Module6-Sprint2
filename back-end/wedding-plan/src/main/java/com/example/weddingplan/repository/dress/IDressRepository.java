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
            value = "select d.id_dress as idDress, d.name_dress as nameDress " +
                    "from dress d " +
                    "left join contract_detail cd on d.id_dress = cd.id_dress " +
                    "left join contract c on c.id_contract = cd.id_contract " +
                    "join type_dress td on td.id_type_dress = d.id_type_dress " +
                    "where d.id_status = 1 and td.name_type_dress = :name " +
                    "or d.id_status = 2 and ((:date <= date_sub(c.start_date, interval 10 day)) or (:date >= date_add(c.end_date, interval 7 day ))) and td.name_type_dress = :name " +
                    "group by d.id_dress")
    List<IDressProjection> getDressRented(@Param("name") String name , @Param("date") String date);

}
