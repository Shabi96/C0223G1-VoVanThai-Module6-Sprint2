package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idContract;
    private String startDate;
    private String endDate;
    @OneToOne
    @JoinColumn(name = "id_customer")
    private Customer customer;
    @OneToOne
    @JoinColumn(name = "id_employee")
    private Employee employee;

    public Contract() {
    }

    public Contract(Long idContract, String startDate, String endDate, Customer customer, Employee employee) {
        this.idContract = idContract;
        this.startDate = startDate;
        this.endDate = endDate;
        this.customer = customer;
        this.employee = employee;
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
}
