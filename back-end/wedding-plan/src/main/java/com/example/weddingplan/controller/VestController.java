package com.example.weddingplan.controller;

import com.example.weddingplan.model.ContractDetail;
import com.example.weddingplan.model.Vest;
import com.example.weddingplan.projection.IVestProjection;
import com.example.weddingplan.services.contract.IContractDetailService;
import com.example.weddingplan.services.status.IStatusService;
import com.example.weddingplan.services.vest.IVestService;
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

    @Autowired
    private IStatusService statusService;

    @Autowired
    private IContractDetailService contractDetailService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getVestById(@PathVariable Long id) {
        if (vestService.getVestByFlagDeleteIsFalseAndIdVest(id) != null) {
            return new ResponseEntity<>(vestService.getVestByFlagDeleteIsFalseAndIdVest(id), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/list")
    public ResponseEntity<?> getAllVest(@PageableDefault(size = 5) Pageable pageable,
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
        List<Vest> vestList = vestService.getVestByDateMaintenanceIsNotNullAndFlagDeleteIsFalseAndItemStatus_IdStatus(3L);
        LocalDate localDate = LocalDate.now();
        for (Vest v : vestList) {
            if (v.getDateMaintenance() != null) {
                LocalDate dateMaintenance = LocalDate.parse(v.getDateMaintenance());
                if (dateMaintenance.plusDays(4).isEqual(localDate)) {
                    v.setItemStatus(statusService.getById(1L));
                    v.setDateMaintenance(null);
                    vestService.addNewVest(v);
                }
            }
        }
        Page<Vest> vestPage = vestService.getVestByFlagDeleteIsFalseAndNameVest(pageable, nameVest, nameStatus);
        if (!vestPage.isEmpty()) {
            return new ResponseEntity<>(vestPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/rented/{date}")
    public ResponseEntity<?> getListDressRented(@PathVariable String date) {
        List<Vest> readyListVest = vestService.getAllByItemStatus_IdStatus(1L);
        List<Vest> resultVestList = new ArrayList<>(readyListVest);
        List<Vest> rentedListVest = vestService.getAllByItemStatus_IdStatus(2L);
        LocalDate targetDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        for (Vest v : rentedListVest) {
            boolean flag = true;
            List<ContractDetail> checkList = contractDetailService.getContractDetailByVest_IdVestAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(v.getIdVest());
            if (!checkList.isEmpty()) {
                for (ContractDetail c : checkList) {
                    LocalDate startDate = LocalDate.parse(c.getContract().getStartDate(), DateTimeFormatter.ISO_DATE);
                    LocalDate endDate = LocalDate.parse(c.getContract().getEndDate(), DateTimeFormatter.ISO_DATE);
                    if (!(targetDate.isBefore(startDate.minusDays(10)) || targetDate.isAfter(endDate.plusDays(7)))) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    resultVestList.add(v);
                }
            } else {
                resultVestList.add(v);
            }
        }
        return new ResponseEntity<>(resultVestList, HttpStatus.OK);
    }
}
