package com.example.weddingplan.repository.contract;

import com.example.weddingplan.model.ContractDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IContractDetailRepository extends JpaRepository<ContractDetail, Long> {
    List<ContractDetail> getContractDetailByContract_IdContract(Long id);
    List<ContractDetail> getContractDetailByDress_IdDressOrderByContract_StartDateDesc(Long id);
    List<ContractDetail> getContractDetailByVest_IdVestOrderByContract_StartDateDesc(Long id);
    List<ContractDetail> getContractDetailByDress_IdDressAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(Long id);
    List<ContractDetail> getContractDetailByVest_IdVestAndContract_CancelContractIsFalseAndContract_StatusContractIsFalse(Long id);

}
