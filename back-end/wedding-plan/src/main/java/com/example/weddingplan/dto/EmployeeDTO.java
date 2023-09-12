package com.example.weddingplan.dto;

public class EmployeeDTO {
    private String nameEmployee;
    private String phone;
    private String email;
    private Boolean flagDelete;
    private String address;
    private String password;

    public EmployeeDTO() {
    }

    public EmployeeDTO(String nameEmployee, String phone, String email, Boolean flagDelete, String address, String password) {
        this.nameEmployee = nameEmployee;
        this.phone = phone;
        this.email = email;
        this.flagDelete = flagDelete;
        this.address = address;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
