package com.example.autowiretest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.autowiretest.service.HelloService;

@RestController
public class HelloController {

    // FIELD LEVEL AUTOWIRING
    @Autowired
    private HelloService helloService;

    @GetMapping("/hello")
    public String hello() {
        return helloService.getMessage();
    }
}
