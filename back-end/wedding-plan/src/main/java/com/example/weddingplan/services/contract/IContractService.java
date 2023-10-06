package com.example.weddingplan.services.contract;

import com.example.weddingplan.model.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IContractService {
    void createContract(Contract contract);
    Page<Contract> getAllContract(Pageable pageable, String nameCustomer, Boolean statusContract);
    Contract getContractsById(Long id);
    Page<Contract> getAll(Pageable pageable, String nameCustomer);
    Page<Contract> getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndStatusContractOrderByContractDateDesc(Pageable pageable, String nameCustomer, String phone,Boolean statusContract);
    Page<Contract> getAllByCustomer_NameCustomerContainingAndCustomer_PhoneContainingOrderByContractDateDesc(Pageable pageable, String nameCustomer, String phone);
    Page<Contract> getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndCancelContractIsTrueOrderByContractDateDesc(Pageable pageable, String nameCustomer, String phone);
}
