package com.example.weddingplan.controller;

import com.example.weddingplan.model.Dress;
import com.example.weddingplan.services.dress.IDressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/dress")
public class DressController {
    @Autowired
    private IDressService dressService;

    @GetMapping("/list")
    public ResponseEntity<Page<Dress>> getListDress(@PageableDefault(size = 5) Pageable pageable,
                                          @RequestParam("page") String page,
                                          @RequestParam("nameDress") String nameDress,
                                          @RequestParam("nameTypeDress") String nameTypeDress,
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
        Page<Dress> dressPage = dressService.getAllByFlagDeleteIsFalseAndNameDressAndTypeDress_NameTypeDressAndItemStatus_NameStatus(pageable, nameDress, nameTypeDress, nameStatus);
        if (dressPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dressPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDressByNameDress(@PathVariable Long id) {
        if (dressService.getDressByFlagDeleteIsFalseAndIdDress(id) != null) {
            return new ResponseEntity<>(dressService.getDressByFlagDeleteIsFalseAndIdDress(id), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/date/{date}/{typeDress}")
    public ResponseEntity<?> getDress(@PathVariable String date, @PathVariable String typeDress) {
        LocalDate targetDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        if (dressService.getAllByNameTypeDress(typeDress).size() == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Dress> findListDress = new ArrayList<>();
        return new ResponseEntity<>(findListDress, HttpStatus.OK);
    }

    @GetMapping("/rented/{name}/{date}")
    public ResponseEntity<?> getListDressRented(@PathVariable String name, @PathVariable String date) {
        if (dressService.getDressRented(name, date).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dressService.getDressRented(name, date), HttpStatus.OK);
    }
}
