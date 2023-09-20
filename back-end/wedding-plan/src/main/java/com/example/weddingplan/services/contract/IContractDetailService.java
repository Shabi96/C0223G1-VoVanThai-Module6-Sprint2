package com.example.weddingplan.services.contract;

import com.example.weddingplan.model.ContractDetail;

import java.util.List;


public interface IContractDetailService {
    void createContractDetail(ContractDetail contractDetail);
    List<ContractDetail> getContractDetailByContract_IdContract(Long id);
    void updateContractDetail(ContractDetail contractDetail);
    List<ContractDetail> getContractDetailsByIdDress(Long id);
    List<ContractDetail> getContractDetailsByIdVest(Long id);
    List<ContractDetail> getContractDetailByDress_IdDressAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(Long id);
    List<ContractDetail> getContractDetailByVest_IdVestAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(Long id);

}

