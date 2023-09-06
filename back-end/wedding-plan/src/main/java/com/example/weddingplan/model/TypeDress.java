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

    public TypeDress() {
    }

    public TypeDress(Long idTypeDress, String nameTypeDress) {
        this.idTypeDress = idTypeDress;
        this.nameTypeDress = nameTypeDress;
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

}
