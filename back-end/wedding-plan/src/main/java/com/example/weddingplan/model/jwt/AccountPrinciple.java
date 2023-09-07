package com.example.weddingplan.model.jwt;

import com.example.weddingplan.model.Employee;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AccountPrinciple implements UserDetails {
    private Long idEmployee;
    private String nameEmployee;
    private String phone;
    private String email;
    private Boolean flagDelete;
    private String address;
    private Collection<? extends GrantedAuthority> role;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    public AccountPrinciple() {
    }

    public AccountPrinciple(Long idEmployee, String nameEmployee, String phone, String email, Boolean flagDelete, String address, Collection<? extends GrantedAuthority> role) {
        this.idEmployee = idEmployee;
        this.nameEmployee = nameEmployee;
        this.phone = phone;
        this.email = email;
        this.flagDelete = flagDelete;
        this.address = address;
        this.role = role;
    }
//    public static AccountPrinciple build(Employee employee) {
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority(employee.getAccount().getRole().getNameRole()));
//
//    }
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
