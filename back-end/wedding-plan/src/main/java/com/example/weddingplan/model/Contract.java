package com.example.weddingplan.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idContract;
    private String startDate;
    private String endDate;
    @OneToOne
    @JoinColumn(name = "id_combo")
    private Combo combo;
    @OneToOne
    @JoinColumn(name = "id_customer")
    private Customer customer;
    @OneToOne
    @JoinColumn(name = "id_employee")
    private Employee employee;
    private Boolean statusContract;
    private Double deposit;
    private Double totalPrice;
    private LocalDateTime contractDate;
    private Boolean cancelContract;

    public Contract() {
    }

    public Contract(Long idContract, String startDate, String endDate, Combo combo, Customer customer, Employee employee) {
        this.idContract = idContract;
        this.startDate = startDate;
        this.endDate = endDate;
        this.combo = combo;
        this.customer = customer;
        this.employee = employee;
    }

    public Contract(Long idContract, String startDate, String endDate, Combo combo, Customer customer, Employee employee, Boolean statusContract, Double deposit, Double totalPrice, LocalDateTime contractDate) {
        this.idContract = idContract;
        this.startDate = startDate;
        this.endDate = endDate;
        this.combo = combo;
        this.customer = customer;
        this.employee = employee;
        this.statusContract = statusContract;
        this.deposit = deposit;
        this.totalPrice = totalPrice;
        this.contractDate = contractDate;
    }

    public Contract(Long idContract, String startDate, String endDate, Combo combo, Customer customer, Employee employee, Boolean statusContract, Double deposit, Double totalPrice, LocalDateTime contractDate, Boolean cancelContract) {
        this.idContract = idContract;
        this.startDate = startDate;
        this.endDate = endDate;
        this.combo = combo;
        this.customer = customer;
        this.employee = employee;
        this.statusContract = statusContract;
        this.deposit = deposit;
        this.totalPrice = totalPrice;
        this.contractDate = contractDate;
        this.cancelContract = cancelContract;
    }

    public void setIdContract(Long id) {
        this.idContract = id;
    }

    public Long getIdContract() {
        return idContract;
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

    public Boolean getStatusContract() {
        return statusContract;
    }

    public void setStatusContract(Boolean statusContract) {
        this.statusContract = statusContract;
    }

    public Double getDeposit() {
        return deposit;
    }

    public void setDeposit(Double deposit) {
        this.deposit = deposit;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getContractDate() {
        return contractDate;
    }

    public void setContractDate(LocalDateTime contractDate) {
        this.contractDate = contractDate;
    }

    public Boolean getCancelContract() {
        return cancelContract;
    }

    public void setCancelContract(Boolean cancelContract) {
        this.cancelContract = cancelContract;
    }
}
