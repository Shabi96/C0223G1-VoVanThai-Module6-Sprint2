package com.example.weddingplan.services.vest.impl;

import com.example.weddingplan.model.Vest;
import com.example.weddingplan.projection.IVestProjection;
import com.example.weddingplan.repository.vest.IVestRepository;
import com.example.weddingplan.services.vest.IVestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VestService implements IVestService {
    @Autowired
    private IVestRepository vestRepository;

    @Override
    public Vest getVestByFlagDeleteIsFalseAndIdVest(Long id) {
        return vestRepository.getVestByFlagDeleteIsFalseAndIdVest(id);
    }

    @Override
    public Page<Vest> getVestByFlagDeleteIsFalseAndNameVest(Pageable pageable, String nameVest, String nameStatus ) {
        return vestRepository.getVestByFlagDeleteIsFalseAndNameVestContainingAndItemStatus_NameStatusContaining(pageable, nameVest, nameStatus);
    }

    @Override
    public List<Vest> getAllByFlagDeleteIsFalse() {
        return vestRepository.getAllByFlagDeleteIsFalse();
    }

    @Override
    public List<IVestProjection> getVestRented(String date) {
        return vestRepository.getVestRented(date);
    }
}
