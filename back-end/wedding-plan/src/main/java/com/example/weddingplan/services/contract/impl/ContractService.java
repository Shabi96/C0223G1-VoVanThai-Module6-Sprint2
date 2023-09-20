package com.example.weddingplan.services.contract.impl;

import com.example.weddingplan.model.Contract;
import com.example.weddingplan.repository.contract.IContractRepository;
import com.example.weddingplan.services.contract.IContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ContractService implements IContractService {

    @Autowired
    private IContractRepository contractRepository;
    @Override
    public void createContract(Contract contract) {
        contractRepository.save(contract);
    }

    @Override
    public Page<Contract> getAllContract(Pageable pageable, String nameCustomer, Boolean statusContract) {
        return contractRepository.getContractByCustomer_NameCustomerContainingAndStatusContractOrderByContractDateDesc(pageable, nameCustomer, statusContract);
    }

    @Override
    public Contract getContractsById(Long id) {
        return contractRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Contract> getAll(Pageable pageable, String nameCustomer) {
        return contractRepository.getAllByCustomer_NameCustomerContainingOrderByContractDateDesc(pageable, nameCustomer);
    }

    @Override
    public Page<Contract> getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndStatusContractOrderByContractDateDesc(Pageable pageable, String nameCustomer, String phone, Boolean statusContract) {
        return contractRepository.getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndStatusContractOrderByContractDateDesc(pageable, nameCustomer, phone, statusContract);
    }

    @Override
    public Page<Contract> getAllByCustomer_NameCustomerContainingAndCustomer_PhoneContainingOrderByContractDateDesc(Pageable pageable, String nameCustomer, String phone) {
        return contractRepository.getAllByCustomer_NameCustomerContainingAndCustomer_PhoneContainingOrderByContractDateDesc(pageable, nameCustomer, phone);
    }
}
