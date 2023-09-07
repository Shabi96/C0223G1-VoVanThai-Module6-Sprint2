package com.example.weddingplan.model.jwt;

import java.io.Serializable;

/*
This is class is required for creating a response containing the JWT to be returned to the user.
 */
public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private String jwtToken;
    private String username;
    private String nameRole;
    private String nameEmployee;

    public JwtResponse() {
    }

    public JwtResponse(String jwtToken, String username, String nameRole) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.nameRole = nameRole;
    }

    public JwtResponse(String jwtToken, String username, String nameRole, String nameEmployee) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.nameRole = nameRole;
        this.nameEmployee = nameEmployee;
    }

    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNameRole() {
        return nameRole;
    }

    public void setNameRole(String nameRole) {
        this.nameRole = nameRole;
    }

    public String getNameEmployee() {
        return nameEmployee;
    }

    public void setNameEmployee(String nameEmployee) {
        this.nameEmployee = nameEmployee;
    }
}
