package com.example.weddingplan.controller;


import com.example.weddingplan.config.JwtTokenUtil;
import com.example.weddingplan.dto.EmployeeDTO;
import com.example.weddingplan.model.Employee;
import com.example.weddingplan.model.jwt.JwtRequest;
import com.example.weddingplan.model.jwt.JwtResponse;
import com.example.weddingplan.services.jwt.JwtUserDetailsService;
import com.example.weddingplan.services.employee.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/*
Expose a POST API /authenticate using the JwtAuthenticationController. The POST API gets username and password in the
body- Using Spring Authentication Manager we authenticate the username and password.If the credentials are valid,
a JWT token is created using the JWTTokenUtil and provided to the client.
 */
@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private IEmployeeService employeeService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody EmployeeDTO employeeDTO) throws Exception {
        if (employeeService.getEmployeeByEmail(employeeDTO.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return ResponseEntity.ok(userDetailsService.save(employeeDTO));
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        if (userDetails == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        final String token = jwtTokenUtil.generateToken(userDetails);
        Employee employee = employeeService.getEmployeeByEmail(authenticationRequest.getUsername());
        return ResponseEntity.ok(new JwtResponse(token, employee.getEmail(), employee.getAccount().getRole().getNameRole(), employee.getNameEmployee()));
    }


    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
