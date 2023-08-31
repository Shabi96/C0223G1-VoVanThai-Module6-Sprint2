package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idEmployee;
    private String nameEmployee;
    private String phone;
    private String email;
    private Boolean flagDelete;
    private String address;
    @OneToOne
    @JoinColumn(name = "id_account")
    private Account account;

    public Employee() {
    }

    public Employee(Long idEmployee, String nameEmployee, String phone, String email, Boolean flagDelete, String address, Account account) {
        this.idEmployee = idEmployee;
        this.nameEmployee = nameEmployee;
        this.phone = phone;
        this.email = email;
        this.flagDelete = flagDelete;
        this.address = address;
        this.account = account;
    }

    public void setIdEmployee(Long id) {
        this.idEmployee = id;
    }

    public Long getIdEmployee() {
        return idEmployee;
    }

    public String getNameEmployee() {
        return nameEmployee;
    }

    public void setNameEmployee(String nameEmployee) {
        this.nameEmployee = nameEmployee;
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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
