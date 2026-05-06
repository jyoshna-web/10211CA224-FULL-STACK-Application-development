package com.example.notificationapp.controller;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.notificationapp.service.NotificationService;

@RestController
public class NotificationController {

    private final NotificationService notificationService;

    // Resolving ambiguity using @Qualifier
    
    public NotificationController(
            @Qualifier("smsService") NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/notify/{message}")
    public String notify(@PathVariable String message) {
        return notificationService.sendNotification(message);
    }
}
