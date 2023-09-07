package com.example.weddingplan.services.dress.impl;

import com.example.weddingplan.model.Dress;
import com.example.weddingplan.repository.dress.IDressRepository;
import com.example.weddingplan.services.dress.IDressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DressService implements IDressService {
    @Autowired
    private IDressRepository dressRepository;
    @Override
    public Page<Dress> getAllByFlagDeleteIsFalseAndNameDressAndTypeDress_NameTypeDressAndItemStatus_NameStatus(Pageable pageable, String nameDress, String nameTypeDress, String nameStatus) {
        return dressRepository.getAllByFlagDeleteIsFalseAndNameDressContainingAndTypeDress_NameTypeDressContainingAndItemStatus_NameStatusContaining(pageable, nameDress, nameTypeDress, nameStatus);
    }

    @Override
    public Dress getDressByName(String name) {
        return dressRepository.getDressByFlagDeleteIsFalseAndNameDressContaining(name);
    }

    @Override
    public List<Dress> getDressByFlagDeleteIsFalse() {
        return dressRepository.getAllByFlagDeleteIsFalse();
    }
}
