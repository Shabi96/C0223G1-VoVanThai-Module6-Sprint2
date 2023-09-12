package com.example.weddingplan.repository.contract;

import com.example.weddingplan.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IContractRepository extends JpaRepository<Contract, Long> {
}
