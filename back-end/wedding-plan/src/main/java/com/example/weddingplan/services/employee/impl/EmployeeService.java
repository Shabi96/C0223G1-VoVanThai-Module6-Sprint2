package com.example.weddingplan.services.employee.impl;

import com.example.weddingplan.model.Employee;
import com.example.weddingplan.repository.employee.IEmployeeRepository;
import com.example.weddingplan.services.employee.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {
    @Autowired
    private IEmployeeRepository employeeRepository;
    @Override
    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.getEmployeeByFlagDeleteIsFalseAndEmail(email);
    }

    @Override
    public void addNewEmployee(Employee employee) {
        employeeRepository.save(employee);
    }
}
