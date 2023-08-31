package com.example.weddingplan.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TypeDress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idTypeDress;
    private String nameTypeDress;
    private Double price;
    private Double extra;

    public TypeDress() {
    }

    public TypeDress(Long idTypeDress, String nameTypeDress, Double price, Double extra) {
        this.idTypeDress = idTypeDress;
        this.nameTypeDress = nameTypeDress;
        this.price = price;
        this.extra = extra;
    }

    public void setIdTypeDress(Long id) {
        this.idTypeDress = id;
    }

    public Long getIdTypeDress() {
        return idTypeDress;
    }

    public String getNameTypeDress() {
        return nameTypeDress;
    }

    public void setNameTypeDress(String nameTypeDress) {
        this.nameTypeDress = nameTypeDress;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getExtra() {
        return extra;
    }

    public void setExtra(Double extra) {
        this.extra = extra;
    }
}
