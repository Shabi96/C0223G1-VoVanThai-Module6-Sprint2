package com.example.weddingplan.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Combo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCombo;
    private String nameCombo;
    private Double priceCombo;

    public Combo() {
    }


    public Combo(Long idCombo, String nameCombo, Double priceCombo) {
        this.idCombo = idCombo;
        this.nameCombo = nameCombo;
        this.priceCombo = priceCombo;
    }

    public void setIdCombo(Long idCombo) {
        this.idCombo = idCombo;
    }

    public Long getIdCombo() {
        return idCombo;
    }

    public String getNameCombo() {
        return nameCombo;
    }

    public void setNameCombo(String nameCombo) {
        this.nameCombo = nameCombo;
    }

    public Double getPriceCombo() {
        return priceCombo;
    }

    public void setPriceCombo(Double priceCombo) {
        this.priceCombo = priceCombo;
    }
}
