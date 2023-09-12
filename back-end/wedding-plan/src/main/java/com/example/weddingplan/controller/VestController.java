package com.example.weddingplan.controller;

import com.example.weddingplan.model.Vest;
import com.example.weddingplan.projection.IVestProjection;
import com.example.weddingplan.services.vest.IVestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/vest")
public class VestController {

    @Autowired
    private IVestService vestService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getVestById(@PathVariable Long id) {
        if(vestService.getVestByFlagDeleteIsFalseAndIdVest(id) != null) {
            return new ResponseEntity<>(vestService.getVestByFlagDeleteIsFalseAndIdVest(id), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllDress(@PageableDefault(size = 5) Pageable pageable,
                                         @RequestParam("page") String page,
                                         @RequestParam("nameVest") String nameVest,
                                         @RequestParam("nameStatus") String nameStatus) {
        int pageDefault;
        try {
            pageDefault = Integer.parseInt(page);
            if (pageDefault < 0) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Page<Vest> vestPage = vestService.getVestByFlagDeleteIsFalseAndNameVest(pageable, nameVest, nameStatus);
        if (!vestPage.isEmpty()) {
            return new ResponseEntity<>(vestPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/rented/{date}")
    public ResponseEntity<?> getListDressRented(@PathVariable String date) {

        if (vestService.getVestRented(date).size() == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<IVestProjection> projectionList = vestService.getVestRented(date);
        return new ResponseEntity<>(projectionList, HttpStatus.OK);
    }
}
