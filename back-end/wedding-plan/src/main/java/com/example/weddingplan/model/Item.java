package com.example.weddingplan.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idItem;
    private String nameItem;
    private Boolean flagDelete;

    public Item() {
    }

    public Item(Long idItem, String nameItem, Boolean flagDelete) {
        this.idItem = idItem;
        this.nameItem = nameItem;
        this.flagDelete = flagDelete;
    }

    public void setIdItem(Long id) {
        this.idItem = id;
    }

    public Long getIdItem() {
        return idItem;
    }

    public String getNameItem() {
        return nameItem;
    }

    public void setNameItem(String nameItem) {
        this.nameItem = nameItem;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }
}
