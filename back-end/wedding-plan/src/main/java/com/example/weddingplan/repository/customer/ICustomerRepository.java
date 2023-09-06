package com.example.weddingplan.repository.customer;

import com.example.weddingplan.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerRepository extends JpaRepository<Customer, Long> {
    Customer getCustomerByPhoneAndFlagDeleteIsFalse(String phone);
}
