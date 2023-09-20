package com.example.weddingplan.services.contract.impl;

import com.example.weddingplan.model.ContractDetail;
import com.example.weddingplan.repository.contract.IContractDetailRepository;
import com.example.weddingplan.services.contract.IContractDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractDetailService implements IContractDetailService {
    @Autowired
    private IContractDetailRepository contractDetailRepository;
    @Override
    public void createContractDetail(ContractDetail contractDetail) {
        contractDetailRepository.save(contractDetail);
    }

    @Override
    public List<ContractDetail> getContractDetailByContract_IdContract(Long id) {
        return contractDetailRepository.getContractDetailByContract_IdContract(id);
    }

    @Override
    public void updateContractDetail(ContractDetail contractDetail) {
        contractDetailRepository.save(contractDetail);
    }

    @Override
    public List<ContractDetail> getContractDetailsByIdDress(Long id) {
        return contractDetailRepository.getContractDetailByDress_IdDressOrderByContract_StartDateDesc(id);
    }

    @Override
    public List<ContractDetail> getContractDetailsByIdVest(Long id) {
        return contractDetailRepository.getContractDetailByVest_IdVestOrderByContract_StartDateDesc(id);
    }

    @Override
    public List<ContractDetail> getContractDetailByDress_IdDressAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(Long id) {
        return contractDetailRepository.getContractDetailByDress_IdDressAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(id);
    }

    @Override
    public List<ContractDetail> getContractDetailByVest_IdVestAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(Long id) {
        return contractDetailRepository.getContractDetailByVest_IdVestAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(id);
    }
}
