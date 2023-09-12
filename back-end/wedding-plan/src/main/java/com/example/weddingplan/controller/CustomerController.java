package com.example.weddingplan.controller;

import com.example.weddingplan.model.Customer;
import com.example.weddingplan.services.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;

    @GetMapping("/{phone}")
    public ResponseEntity<?> getCustomerByPhone(@PathVariable String phone) {
        if (customerService.getCustomerByPhone(phone) != null) {
            return new ResponseEntity<>(customerService.getCustomerByPhone(phone), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
        try {
            if (customerService.getCustomerByPhone(customer.getPhone()) != null) {
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
            customer.setFlagDelete(false);
            customerService.addNewCustomer(customer);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
