package com.example.weddingplan.services.combo.impl;

import com.example.weddingplan.model.Combo;
import com.example.weddingplan.repository.combo.IComboRepository;
import com.example.weddingplan.services.combo.IComboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComboService implements IComboService {
    @Autowired
    private IComboRepository comboRepository;

    @Override
    public List<Combo> getAll() {
        return comboRepository.findAll();
    }
}
