package com.example.weddingplan.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idRole;
    private String nameRole;

    public Role() {
    }

    public Role(Long id, String nameRole) {
        this.idRole = id;
        this.nameRole = nameRole;
    }

    public void setIdRole(Long id) {
        this.idRole = id;
    }

    public Long getIdRole() {
        return idRole;
    }

    public String getNameRole() {
        return nameRole;
    }

    public void setNameRole(String nameRole) {
        this.nameRole = nameRole;
    }
}
