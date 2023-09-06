package com.example.weddingplan.services.customer;

import com.example.weddingplan.model.Customer;

public interface ICustomerService {
    Customer getCustomerByPhone(String phone);
    void addNewCustomer(Customer customer);
}
