package com.example.optionaldiapp.service;

import org.springframework.stereotype.Component;

@Component
public class AuditService {

    public String audit() {
        return "Audit service executed successfully";
    }
}
