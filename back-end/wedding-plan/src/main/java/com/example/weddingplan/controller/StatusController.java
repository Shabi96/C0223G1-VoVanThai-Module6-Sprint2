package com.example.weddingplan.controller;

import com.example.weddingplan.services.status.IStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status")
@CrossOrigin("*")
public class StatusController {
    @Autowired
    private IStatusService statusService;

    @GetMapping("")
    public ResponseEntity<?> getAllStatus() {
        if (statusService.getAll().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(statusService.getAll(), HttpStatus.OK);
    }
}
