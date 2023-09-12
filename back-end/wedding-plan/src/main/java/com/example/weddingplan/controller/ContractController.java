package com.example.weddingplan.controller;

import com.example.weddingplan.dto.ContractDTO;
import com.example.weddingplan.model.Contract;
import com.example.weddingplan.model.ContractDetail;
import com.example.weddingplan.services.contract.IContractDetailService;
import com.example.weddingplan.services.contract.IContractService;
import com.example.weddingplan.services.dress.IDressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    public ResponseEntity<?> addNewContract(@RequestBody ContractDTO contractDTO){
        Contract contract = new Contract();
        contract.setCombo(contractDTO.getCombo());
        contract.setCustomer(contractDTO.getCustomer());
        contract.setEmployee(contractDTO.getEmployee());
        contract.setStartDate(contractDTO.getStartDate());
        contract.setEndDate(contractDTO.getEndDate());
        contractService.createContract(contract);
        ContractDetail contractDetail = new ContractDetail();
        contractDetail.setContract(contract);
        contractDetail.setDress(contractDTO.getDress());
        contractDetail.setVest(contractDTO.getVest());
        contractDetail.setDeposit(2000.0);
        contractDetailService.createContractDetail(contractDetail);
        contractDTO.getDress().getItemStatus().setIdStatus(2L);
        dressService.addNewDress(contractDTO.getDress());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
