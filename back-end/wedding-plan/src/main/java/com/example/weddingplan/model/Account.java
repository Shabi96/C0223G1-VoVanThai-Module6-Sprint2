package com.example.weddingplan.model;

import javax.persistence.*;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idAccount;
    private String username;
    private String password;
    private Boolean flagDelete;
    @OneToOne
    @JoinColumn(name = "id_role")
    private Role role;

    public Account() {
    }

    public Account(Long id, String username, String password, Boolean flagDelete, Role role) {
        this.idAccount = id;
        this.username = username;
        this.password = password;
        this.flagDelete = flagDelete;
        this.role = role;
    }

    public void setIdAccount(Long idAccount) {
        this.idAccount = idAccount;
    }

    public Long getIdAccount() {
        return idAccount;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
