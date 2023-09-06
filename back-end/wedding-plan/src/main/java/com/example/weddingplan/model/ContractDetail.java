package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class ContractDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idContractDetail;
    private Double deposit;
    @OneToOne
    @JoinColumn(name = "id_dress")
    private Dress dress;

    @OneToOne
    @JoinColumn(name = "id_vest")
    private Vest vest;

    @OneToOne
    @JoinColumn(name = "id_contract")
    private Contract contract;

    public ContractDetail() {
    }

    public ContractDetail(Long idContractDetail, Double deposit, Dress dress, Vest vest, Contract contract) {
        this.idContractDetail = idContractDetail;
        this.deposit = deposit;
        this.dress = dress;
        this.vest = vest;
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

    public Vest getVest() {
        return vest;
    }

    public void setVest(Vest vest) {
        this.vest = vest;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }
}
