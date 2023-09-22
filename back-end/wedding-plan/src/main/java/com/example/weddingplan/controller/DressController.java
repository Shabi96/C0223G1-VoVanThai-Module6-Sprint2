package com.example.weddingplan.controller;

import com.example.weddingplan.model.ContractDetail;
import com.example.weddingplan.model.Dress;
import com.example.weddingplan.services.contract.IContractDetailService;
import com.example.weddingplan.services.dress.IDressService;
import com.example.weddingplan.services.status.IStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Autowired
    private IStatusService statusService;

    @Autowired
    private IContractDetailService contractDetailService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getDressByNameDress(@PathVariable Long id) {
        if (dressService.getDressByFlagDeleteIsFalseAndIdDress(id) != null) {
            return new ResponseEntity<>(dressService.getDressByFlagDeleteIsFalseAndIdDress(id), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/rented/{name}/{date}")
    public ResponseEntity<?> getListDressRented(@PathVariable String name, @PathVariable String date) {
        List<Dress> dressReadyList = dressService.getDressReady(name, 1L);
        List<Dress> resultDressList = new ArrayList<>(dressReadyList);
        List<Dress> dressRentedList = dressService.getDressReady(name, 2L);
        LocalDate targetDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        for (Dress dress : dressRentedList) {
            boolean flag = true;
            List<ContractDetail> dressList = contractDetailService.getContractDetailByDress_IdDressAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(dress.getIdDress());
            if (!dressList.isEmpty()) {
                for (ContractDetail contractDetail : dressList) {
                    LocalDate startDate = LocalDate.parse(contractDetail.getContract().getStartDate(), DateTimeFormatter.ISO_DATE);
                    LocalDate endDate = LocalDate.parse(contractDetail.getContract().getEndDate(), DateTimeFormatter.ISO_DATE);
                    if (!(targetDate.isBefore(startDate.minusDays(10)) || targetDate.isAfter(endDate.plusDays(7)))) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    resultDressList.add(dress);
                }
            } else {
                resultDressList.add(dress);
            }
        }
//        List<Dress> maintenanceDresses = dressService.getDressByDateMaintenanceIsNotNullAndFlagDeleteIsFalseAndItemStatus_IdStatus(3L);
//        for (Dress d: maintenanceDresses) {
//            LocalDate maintenanceDate = LocalDate.parse(d.getDateMaintenance(), DateTimeFormatter.ISO_DATE);
//            if (targetDate.isAfter(maintenanceDate.plusDays(4))) {
//                resultDressList.add(d);
//            }
//        }
        if (resultDressList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(resultDressList, HttpStatus.OK);
    }
}
