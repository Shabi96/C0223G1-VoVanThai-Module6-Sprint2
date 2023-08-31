package com.example.weddingplan.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ItemStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idStatus;
    private String nameStatus;

    public ItemStatus() {
    }

    public ItemStatus(Long idStatus, String nameStatus) {
        this.idStatus = idStatus;
        this.nameStatus = nameStatus;
    }

    public void setIdStatus(Long id) {
        this.idStatus = id;
    }

    public Long getIdStatus() {
        return idStatus;
    }

    public String getNameStatus() {
        return nameStatus;
    }

    public void setNameStatus(String nameStatus) {
        this.nameStatus = nameStatus;
    }
}
