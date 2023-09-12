package com.example.weddingplan.services.contract.impl;

import com.example.weddingplan.model.Contract;
import com.example.weddingplan.repository.contract.IContractRepository;
import com.example.weddingplan.services.contract.IContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService implements IContractService {

    @Autowired
    private IContractRepository contractRepository;
    @Override
    public void createContract(Contract contract) {
        contractRepository.save(contract);
    }
}
