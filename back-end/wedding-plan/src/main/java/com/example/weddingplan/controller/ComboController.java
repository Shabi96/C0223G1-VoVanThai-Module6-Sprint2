package com.example.weddingplan.controller;

import com.example.weddingplan.services.combo.IComboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/combos")
@CrossOrigin("*")
public class ComboController {
    @Autowired
    private IComboService comboService;

    @GetMapping("")
    public ResponseEntity<?> getAllCombo() {
        if(comboService.getAll().size() > 0) {
            return new ResponseEntity<>(comboService.getAll(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
