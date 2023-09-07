package com.example.weddingplan.services.dress;

import com.example.weddingplan.model.Dress;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IDressService {
    Page<Dress> getAllByFlagDeleteIsFalseAndNameDressAndTypeDress_NameTypeDressAndItemStatus_NameStatus
            (Pageable pageable, String nameDress, String nameTypeDress, String nameStatus);
    Dress getDressByName(String name);
    List<Dress> getDressByFlagDeleteIsFalse();


}
