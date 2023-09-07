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

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/dress")
public class DressController {
    @Autowired
    private IDressService dressService;

    @GetMapping("/list")
    public ResponseEntity<?> getListDress(@PageableDefault(size = 5) Pageable pageable,
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

    @GetMapping("/{name}")
    public ResponseEntity<?> getDressByNameDress(@PathVariable String name) {
        if (dressService.getDressByName(name) != null) {
            return new ResponseEntity<>(dressService.getDressByName(name), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<?> getDress(@PathVariable String date) {
        LocalDate targetDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        if (dressService.getDressByFlagDeleteIsFalse().size() == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Dress> findListDress = new ArrayList<>();
        for (Dress d : dressService.getDressByFlagDeleteIsFalse()) {
            if (d.getRentedDate() == null || d.getReturnDate() == null) {
                findListDress.add(d);
            } else {
                LocalDate rentedDate = LocalDate.parse(d.getRentedDate(), DateTimeFormatter.ISO_DATE);
                LocalDate returnDate = LocalDate.parse(d.getReturnDate(), DateTimeFormatter.ISO_DATE);
                LocalDate tenDaysAgo = rentedDate.minusDays(10);
                LocalDate sevenDaysLater = returnDate.plusDays(7);
                if (targetDate.isBefore(tenDaysAgo) || targetDate.isAfter(sevenDaysLater)) {
                    findListDress.add(d);
                }
            }
        }
        return new ResponseEntity<>(findListDress, HttpStatus.OK);
    }
}
