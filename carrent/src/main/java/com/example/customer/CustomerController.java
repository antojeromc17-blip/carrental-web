package com.example.customer;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    private Map<String, Object> customerResponse(Customer customer) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", customer.getId());
        response.put("name", customer.getName());
        response.put("email", customer.getEmail());
        return response;
    }

    @PostMapping("/register")
    public Map<String, Object> registerCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = customerService.registerCustomer(customer);
        return customerResponse(savedCustomer);
    }

    @PostMapping("/login")
    public Map<String, Object> loginCustomer(@RequestBody Customer customer) {
        Customer loggedInCustomer = customerService.loginCustomer(
                customer.getEmail(),
                customer.getPassword()
        );
        return customerResponse(loggedInCustomer);
    }
}