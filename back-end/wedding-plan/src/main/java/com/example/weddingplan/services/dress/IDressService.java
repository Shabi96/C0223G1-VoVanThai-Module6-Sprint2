package com.example.weddingplan.services.dress;

import com.example.weddingplan.model.Dress;
import com.example.weddingplan.projection.IDressProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IDressService {
    Page<Dress> getAllByFlagDeleteIsFalseAndNameDressAndTypeDress_NameTypeDressAndItemStatus_NameStatus
            (Pageable pageable, String nameDress, String nameTypeDress, String nameStatus);
    Dress getDressByName(String name);
    List<Dress> getDressByFlagDeleteIsFalse();
    List<Dress> getAllByNameTypeDress(String typeDress);

    Dress getDressByFlagDeleteIsFalseAndIdDress(Long id);
    List<IDressProjection> getDressRented(String name, String date);

    void addNewDress(Dress dress);
    List<Dress> getDressByDateMaintenanceIsNotNullAndFlagDeleteIsFalse();
    List<Dress> getDressByDateMaintenanceIsNotNullAndFlagDeleteIsFalseAndItemStatus_IdStatus(Long id);
    List<Dress> getDressReady(String nameType, Long idStatus);

}
