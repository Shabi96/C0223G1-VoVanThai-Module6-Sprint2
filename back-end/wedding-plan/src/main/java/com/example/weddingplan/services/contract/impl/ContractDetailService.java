package com.example.weddingplan.services.contract.impl;

import com.example.weddingplan.model.ContractDetail;
import com.example.weddingplan.repository.contract.IContractDetailRepository;
import com.example.weddingplan.services.contract.IContractDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractDetailService implements IContractDetailService {
    @Autowired
    private IContractDetailRepository contractDetailRepository;
    @Override
    public void createContractDetail(ContractDetail contractDetail) {
        contractDetailRepository.save(contractDetail);
    }
}
