package com.example.weddingplan.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCustomer;
    private String nameCustomer;
    private String phone;
    private String email;
    private Boolean flagDelete;
    private String address;

    public Customer() {
    }

    public Customer(Long idCustomer, String nameCustomer, String phone, String email, Boolean flagDelete, String address) {
        this.idCustomer = idCustomer;
        this.nameCustomer = nameCustomer;
        this.phone = phone;
        this.email = email;
        this.flagDelete = flagDelete;
        this.address = address;
    }

    public void setIdCustomer(Long id) {
        this.idCustomer = id;
    }

    public Long getIdCustomer() {
        return idCustomer;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
