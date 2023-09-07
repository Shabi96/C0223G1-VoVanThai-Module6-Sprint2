package com.example.weddingplan.repository.employee;

import com.example.weddingplan.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEmployeeRepository extends JpaRepository<Employee, Long> {
    Employee getEmployeeByFlagDeleteIsFalseAndEmail(String email);
}
