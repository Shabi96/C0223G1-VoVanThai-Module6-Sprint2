package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class ContractDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idContractDetail;
    private Double deposit;
    @OneToOne
    private Dress dress;
    @OneToOne
    @JoinColumn(name = "id_contract")
    private Contract contract;

    public ContractDetail() {
    }

    public ContractDetail(Long id, Double deposit, Dress dress, Contract contract) {
        this.idContractDetail = id;
        this.deposit = deposit;
        this.dress = dress;
        this.contract = contract;
    }

    public void setIdContractDetail(Long id) {
        this.idContractDetail = id;
    }

    public Long getIdContractDetail() {
        return idContractDetail;
    }

    public Double getDeposit() {
        return deposit;
    }

    public void setDeposit(Double deposit) {
        this.deposit = deposit;
    }

    public Dress getDress() {
        return dress;
    }

    public void setDress(Dress dress) {
        this.dress = dress;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }
}
