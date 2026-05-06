package com.example.optionaldiapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.optionaldiapp.service.AuditService;

@RestController
public class OptionalController {

    // OPTIONAL DEPENDENCY INJECTION
    @Autowired(required = false)
    private AuditService auditService;

    @GetMapping("/optional")
    public String checkOptionalDependency() {

        if (auditService != null) {
            return auditService.audit();
        } else {
            return "AuditService not available. Application continues normally.";
        }
    }
}
