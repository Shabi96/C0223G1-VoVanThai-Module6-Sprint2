package com.example.weddingplan.services.status.impl;

import com.example.weddingplan.model.ItemStatus;
import com.example.weddingplan.repository.status.IStatusRepository;
import com.example.weddingplan.services.status.IStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService implements IStatusService {
    @Autowired
    private IStatusRepository statusRepository;

    @Override
    public List<ItemStatus> getAll() {
        return statusRepository.findAll();
    }

    @Override
    public ItemStatus getById(Long id) {
        return statusRepository.findById(id).orElse(null);
    }
}
