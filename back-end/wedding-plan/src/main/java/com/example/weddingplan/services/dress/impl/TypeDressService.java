package com.example.weddingplan.services.dress.impl;

import com.example.weddingplan.model.TypeDress;
import com.example.weddingplan.repository.dress.ITypeDressRepository;
import com.example.weddingplan.services.dress.ITypeDressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeDressService implements ITypeDressService {
    @Autowired
    private ITypeDressRepository typeDressRepository;


    @Override
    public TypeDress getById(Long id) {
        return typeDressRepository.findById(id).orElse(null);
    }
}
