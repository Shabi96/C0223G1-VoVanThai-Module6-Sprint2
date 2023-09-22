package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class ContractDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idContractDetail;
    @OneToOne
    @JoinColumn(name = "id_dress")
    private Dress dress;

    @OneToOne
    @JoinColumn(name = "id_vest")
    private Vest vest;

    @OneToOne
    @JoinColumn(name = "id_contract")
    private Contract contract;
    private String weddingDate;


    public ContractDetail() {
    }

    public ContractDetail(Long idContractDetail, Dress dress, Vest vest, Contract contract) {
        this.idContractDetail = idContractDetail;
        this.dress = dress;
        this.vest = vest;
        this.contract = contract;
    }

    public ContractDetail(Long idContractDetail, Dress dress, Vest vest, Contract contract, String weddingDate) {
        this.idContractDetail = idContractDetail;
        this.dress = dress;
        this.vest = vest;
        this.contract = contract;
        this.weddingDate = weddingDate;
    }

    public void setIdContractDetail(Long id) {
        this.idContractDetail = id;
    }

    public Long getIdContractDetail() {
        return idContractDetail;
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

    public String getWeddingDate() {
        return weddingDate;
    }

    public void setWeddingDate(String weddingDate) {
        this.weddingDate = weddingDate;
    }
}
