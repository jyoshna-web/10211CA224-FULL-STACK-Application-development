package com.example.paymentapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.paymentapp.service.PaymentService;

@RestController
public class PaymentController {
    private final PaymentService paymentService;
    
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/pay/{amount}")
    public String pay(@PathVariable double amount) {
        return paymentService.processPayment(amount);
    }
}
