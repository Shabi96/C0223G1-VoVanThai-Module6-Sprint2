package com.example.weddingplan.repository.contract;

import com.example.weddingplan.model.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IContractRepository extends JpaRepository<Contract, Long> {
    Page<Contract> getContractByCustomer_NameCustomerContainingAndStatusContractOrderByContractDateDesc(Pageable pageable, String nameCustomer, Boolean statusContract);
    Page<Contract> getAllByCustomer_NameCustomerContainingOrderByContractDateDesc(Pageable pageable, String nameCustomer);
    Page<Contract> getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndStatusContractAndCancelContractIsFalseOrderByContractDateDesc(Pageable pageable, String nameCustomer, String phone,Boolean statusContract);
    Page<Contract> getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndCancelContractIsTrueOrderByContractDateDesc(Pageable pageable, String nameCustomer, String phone);
    Page<Contract> getAllByCustomer_NameCustomerContainingAndCustomer_PhoneContainingOrderByContractDateDesc (Pageable pageable, String nameCustomer, String phone);
}
