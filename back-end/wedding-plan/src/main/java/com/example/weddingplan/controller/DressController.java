package com.example.weddingplan.controller;

import com.example.weddingplan.model.Dress;
import com.example.weddingplan.services.dress.IDressService;
import jdk.nashorn.internal.runtime.regexp.joni.ast.StringNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/dress")
public class DressController {
    @Autowired
    private IDressService dressService;

    @GetMapping("/list")
    public ResponseEntity<?> getListDress(@PageableDefault(size = 5)Pageable pageable,
                                          @RequestParam("page") String page,
                                          @RequestParam("nameDress") String nameDress,
                                          @RequestParam("nameTypeDress") String nameTypeDress,
                                          @RequestParam("nameStatus") String nameStatus) {
        int pageDefault;
        try {
            pageDefault = Integer.parseInt(page);
            if(pageDefault < 0) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Page<Dress> dressPage = dressService.getAllByFlagDeleteIsFalseAndNameDressAndTypeDress_NameTypeDressAndItemStatus_NameStatus(pageable, nameDress, nameTypeDress, nameStatus);
        if (dressPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dressPage, HttpStatus.OK);
    }
}
