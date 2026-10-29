package com.example.customer;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer registerCustomer(Customer customer) {

        if (customer.getEmail() == null || customer.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (customer.getPassword() == null || customer.getPassword().isBlank()) {
            throw new RuntimeException("Password is required");
        }

        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        customer.setPassword(
                passwordEncoder.encode(customer.getPassword())
        );

        return customerRepository.save(customer);
    }

    public Customer loginCustomer(String email, String password) {

        if (email == null || email.isBlank()
                || password == null || password.isBlank()) {
            throw new RuntimeException("Email and password are required");
        }

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, customer.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return customer;
    }
}