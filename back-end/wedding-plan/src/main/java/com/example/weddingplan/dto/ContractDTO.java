package com.example.weddingplan.dto;

import com.example.weddingplan.model.*;

public class ContractDTO {
    private String startDate;
    private String endDate;

    private Combo combo;

    private Customer customer;

    private Employee employee;
    private Double deposit;
    private Dress dress;
    private Vest vest;
    private Dress dress1;
    private Vest vest1;
    private Double totalPrice;

    public ContractDTO() {
    }

    public ContractDTO(String startDate, String endDate, Combo combo, Customer customer, Employee employee, Double deposit, Dress dress, Vest vest) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.combo = combo;
        this.customer = customer;
        this.employee = employee;
        this.deposit = deposit;
        this.dress = dress;
        this.vest = vest;
    }

    public ContractDTO(String startDate, String endDate, Combo combo, Customer customer, Employee employee, Double deposit, Dress dress, Vest vest, Dress dress1, Vest vest1) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.combo = combo;
        this.customer = customer;
        this.employee = employee;
        this.deposit = deposit;
        this.dress = dress;
        this.vest = vest;
        this.dress1 = dress1;
        this.vest1 = vest1;
    }

    public ContractDTO(String startDate, String endDate, Combo combo, Customer customer, Employee employee, Double deposit, Dress dress, Vest vest, Dress dress1, Vest vest1, Double totalPrice) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.combo = combo;
        this.customer = customer;
        this.employee = employee;
        this.deposit = deposit;
        this.dress = dress;
        this.vest = vest;
        this.dress1 = dress1;
        this.vest1 = vest1;
        this.totalPrice = totalPrice;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Combo getCombo() {
        return combo;
    }

    public void setCombo(Combo combo) {
        this.combo = combo;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Double getDeposit() {
        return deposit;
    }

    public void setDeposit(Double deposit) {
        this.deposit = deposit;
    }

    public Dress getDress() {
        return dress;
    }

    public void setDress(Dress dress) {
        this.dress = dress;
    }

    public Vest getVest() {
        return vest;
    }

    public void setVest(Vest vest) {
        this.vest = vest;
    }

    public Dress getDress1() {
        return dress1;
    }

    public void setDress1(Dress dress1) {
        this.dress1 = dress1;
    }

    public Vest getVest1() {
        return vest1;
    }

    public void setVest1(Vest vest1) {
        this.vest1 = vest1;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
