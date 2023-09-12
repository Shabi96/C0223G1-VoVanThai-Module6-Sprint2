package com.example.weddingplan.repository.status;

import com.example.weddingplan.model.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IStatusRepository extends JpaRepository<ItemStatus, Long> {
}
