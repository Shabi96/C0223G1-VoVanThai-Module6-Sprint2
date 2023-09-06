package com.example.weddingplan.services;

import java.util.ArrayList;


import com.example.weddingplan.model.Account;
import com.example.weddingplan.repository.account.IAccountRepository;
import com.example.weddingplan.repository.account.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/*
JWTUserDetailsService implements the Spring Security UserDetailsService interface.
It overrides the loadUserByUsername for fetching user details from the database using the username.
The Spring Security Authentication Manager calls this method for getting the user details from the database
when authenticating the user details provided by the user. Here we are getting the user details from a hardcoded
User List. In the next tutorial we will be adding the DAO implementation for fetching User Details from the Database.
Also the password for a user is stored in encrypted format using BCrypt.
Previously we have seen Spring Boot Security - Password Encoding Using Bcrypt.
Here using the Online Bcrypt Generator you can generate the Bcrypt for a password.
 */
@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private IAccountRepository accountRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private IRoleRepository IRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(account.getUsername(), account.getPassword(),
                new ArrayList<>());
    }

    public Account save(Account account) {
        Account newAccount = new Account();
        newAccount.setUsername(account.getUsername());
        newAccount.setPassword(bcryptEncoder.encode(account.getPassword()));
        newAccount.setFlagDelete(false);
        newAccount.setRole(IRoleRepository.findById(1L).orElse(null));
        return accountRepository.save(newAccount);
    }
}
