package com.example.weddingplan.controller;

import com.example.weddingplan.dto.ContractDTO;
import com.example.weddingplan.model.Contract;
import com.example.weddingplan.model.ContractDetail;
import com.example.weddingplan.model.Dress;
import com.example.weddingplan.model.Vest;
import com.example.weddingplan.services.contract.IContractDetailService;
import com.example.weddingplan.services.contract.IContractService;
import com.example.weddingplan.services.dress.IDressService;
import com.example.weddingplan.services.dress.ITypeDressService;
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
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/contracts")
public class ContractController {

    @Autowired
    private IContractService contractService;

    @Autowired
    private IContractDetailService contractDetailService;

    @Autowired
    private IDressService dressService;

    @Autowired
    private IVestService vestService;

    @Autowired
    private IStatusService statusService;

    @Autowired
    private ITypeDressService typeDressService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public ResponseEntity<?> getAllContract(@PageableDefault(size = 5) Pageable pageable,
                                            @RequestParam("page") String page,
                                            @RequestParam("nameCustomer") String nameCustomer,
                                            @RequestParam("phone") String phone,
                                            @RequestParam("status") String status) {
        int pageDefault;
        try {
            pageDefault = Integer.parseInt(page);
            if (pageDefault < 0) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        switch (status) {
            case "1":
                if (contractService.getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndStatusContractOrderByContractDateDesc(pageable, nameCustomer, phone, false).isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity<>(contractService.getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndStatusContractOrderByContractDateDesc(pageable, nameCustomer, phone, false), HttpStatus.OK);
            case "2":
                if (contractService.getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndStatusContractOrderByContractDateDesc(pageable, nameCustomer, phone, true).isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity<>(contractService.getContractByCustomer_NameCustomerContainingAndCustomer_PhoneContainingAndStatusContractOrderByContractDateDesc(pageable, nameCustomer, phone ,true), HttpStatus.OK);
            default:
                if (contractService.getAllByCustomer_NameCustomerContainingAndCustomer_PhoneContainingOrderByContractDateDesc(pageable, nameCustomer, phone).isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                Page<Contract> contractPage = contractService.getAllByCustomer_NameCustomerContainingAndCustomer_PhoneContainingOrderByContractDateDesc(pageable, nameCustomer, phone);
                return new ResponseEntity<>(contractPage, HttpStatus.OK);
        }
    }

    @PatchMapping("/cancel/{id}")
    public ResponseEntity<?> cancelContract(@PathVariable Long id) {
        Contract contract = contractService.getContractsById(id);
        if (contract == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        contract.setCancelContract(true);
        List<ContractDetail> contractDetailList = contractDetailService.getContractDetailByContract_IdContract(contract.getIdContract());
        for (ContractDetail c: contractDetailList) {
            if (contractDetailService.getContractDetailByDress_IdDressAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(c.getDress().getIdDress()).size() == 1) {
                c.getDress().setItemStatus(statusService.getById(1L));
            }
            if (contractDetailService.getContractDetailByVest_IdVestAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(c.getVest().getIdVest()).size() == 1) {
                c.getVest().setItemStatus(statusService.getById(1L));
            }
            contractDetailService.createContractDetail(c);
        }
        contractService.createContract(contract);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list-details/{idDress}")
    public ResponseEntity<?> getContractDetailsByIdDress(@PathVariable Long idDress) {
        List<ContractDetail> contractDetailList = contractDetailService.getContractDetailsByIdDress(idDress);
        if (contractDetailList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contractDetailList, HttpStatus.OK);
    }

    @GetMapping("/list-details-vest/{idVest}")
    public ResponseEntity<?> getContractDetailsByIdVest(@PathVariable Long idVest) {
        List<ContractDetail> contractDetailList = contractDetailService.getContractDetailsByIdVest(idVest);
        if (contractDetailList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contractDetailList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getContractById(@PathVariable Long id) {
        if (contractService.getContractsById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contractService.getContractsById(id), HttpStatus.OK);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<?> getContractDetailByIdContract(@PathVariable Long id) {
        if (contractDetailService.getContractDetailByContract_IdContract(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contractDetailService.getContractDetailByContract_IdContract(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/{money}")
    public ResponseEntity<?> endContract(@PathVariable Long id, @PathVariable String money) {
        if (contractService.getContractsById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try {
            double remainMoney = Double.parseDouble(money);
            Contract contract = contractService.getContractsById(id);
            if (remainMoney == (contract.getTotalPrice() - contract.getDeposit())) {
                for (ContractDetail dt : contractDetailService.getContractDetailByContract_IdContract(id)) {
                    if(contractDetailService.getContractDetailByDress_IdDressAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(dt.getDress().getIdDress()).size() <= 1) {
                        dt.getDress().setItemStatus(statusService.getById(3L));
                    }
                    if (contractDetailService.getContractDetailByVest_IdVestAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(dt.getVest().getIdVest()).size() <= 1) {
                        dt.getVest().setItemStatus(statusService.getById(3L));
                    }
                    dt.getDress().setDateMaintenance(LocalDate.now().toString());
                    Dress dress = dt.getDress();
                    if (dress.getMaintenanceTimes() == 50) {
                        if (dress.getTypeDress().getIdTypeDress() == 2) {
                            dt.getDress().setTypeDress(typeDressService.getById(1L));
                            dt.getDress().setMaintenanceTimes(0);
                        } else if (dress.getTypeDress().getIdTypeDress() == 3) {
                            dt.getDress().setTypeDress(typeDressService.getById(2L));
                            dt.getDress().setMaintenanceTimes(0);
                        } else if (dress.getTypeDress().getIdTypeDress() == 1) {
                            dt.getDress().setItemStatus(statusService.getById(4L));
                            dt.getDress().setDateMaintenance(null);
                        }
                    } else if (dress.getMaintenanceTimes() < 50) {
                        dt.getDress().setMaintenanceTimes(dt.getDress().getMaintenanceTimes() + 1);
                    }
                    Vest vest = dt.getVest();
                    dt.getVest().setDateMaintenance(LocalDate.now().toString());
                    if (vest.getMaintenanceTimes() == 50) {
                        dt.getVest().setItemStatus(statusService.getById(4L));
                        dt.getVest().setDateMaintenance(null);
                    } else if (dress.getMaintenanceTimes() < 50) {
                        dt.getDress().setMaintenanceTimes(dt.getDress().getMaintenanceTimes() + 1);
                    }
                    dt.getVest().setMaintenanceTimes(dt.getVest().getMaintenanceTimes() + 1);
                    dt.getContract().setStatusContract(true);
                    contractDetailService.updateContractDetail(dt);
                }
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addNewContract(@RequestBody ContractDTO contractDTO) {
        if (contractDTO.getVest1() == null) {
            Contract contract = new Contract();
            contract.setCombo(contractDTO.getCombo());
            contract.setCustomer(contractDTO.getCustomer());
            contract.setEmployee(contractDTO.getEmployee());
            contract.setStartDate(contractDTO.getStartDate());
            contract.setEndDate(contractDTO.getEndDate());
            contract.setDeposit(Double.parseDouble(String.valueOf(contractDTO.getDeposit())));
            contract.setTotalPrice(contractDTO.getTotalPrice());
            contract.setContractDate(LocalDateTime.now());
            contract.setStatusContract(false);
            contract.setCancelContract(false);
            contractService.createContract(contract);
            ContractDetail contractDetail = new ContractDetail();
            contractDetail.setContract(contract);
            contractDetail.setDress(contractDTO.getDress());
            contractDetail.setVest(contractDTO.getVest());
            contractDetailService.createContractDetail(contractDetail);
            contractDTO.getDress().getItemStatus().setIdStatus(2L);
            dressService.addNewDress(contractDTO.getDress());
            contractDTO.getVest().getItemStatus().setIdStatus(2L);
            vestService.addNewVest(contractDTO.getVest());
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            Contract contract = new Contract();
            contract.setCombo(contractDTO.getCombo());
            contract.setCustomer(contractDTO.getCustomer());
            contract.setEmployee(contractDTO.getEmployee());
            contract.setStartDate(contractDTO.getStartDate());
            contract.setEndDate(contractDTO.getEndDate());
            contract.setDeposit(Double.parseDouble(String.valueOf(contractDTO.getDeposit())));
            contract.setStatusContract(false);
            contract.setTotalPrice(contractDTO.getTotalPrice());
            contract.setContractDate(LocalDateTime.now());
            contract.setCancelContract(false);
            contractService.createContract(contract);
            ContractDetail contractDetail = new ContractDetail();
            contractDetail.setContract(contract);
            contractDetail.setDress(contractDTO.getDress());
            contractDetail.setVest(contractDTO.getVest());
            contractDetailService.createContractDetail(contractDetail);
            contractDTO.getDress().getItemStatus().setIdStatus(2L);
            dressService.addNewDress(contractDTO.getDress());
            contractDTO.getVest().getItemStatus().setIdStatus(2L);
            vestService.addNewVest(contractDTO.getVest());
            ContractDetail contractDetail2 = new ContractDetail();
            contractDetail2.setContract(contract);
            contractDetail2.setVest(contractDTO.getVest1());
            contractDetail2.setDress(contractDTO.getDress1());
            contractDetailService.createContractDetail(contractDetail2);
            contractDTO.getVest1().getItemStatus().setIdStatus(2L);
            vestService.addNewVest(contractDTO.getVest1());
            contractDTO.getDress1().getItemStatus().setIdStatus(2L);
            dressService.addNewDress(contractDTO.getDress1());
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }
}
