package com.example.weddingplan.services.customer.impl;

import com.example.weddingplan.model.Customer;
import com.example.weddingplan.repository.customer.ICustomerRepository;
import com.example.weddingplan.services.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {

    @Autowired
    private ICustomerRepository customerRepository;
    @Override
    public Customer getCustomerByPhone(String phone) {
        return customerRepository.getCustomerByPhoneAndFlagDeleteIsFalse(phone);
    }

    @Override
    public void addNewCustomer(Customer customer) {
        customerRepository.save(customer);
    }
}
