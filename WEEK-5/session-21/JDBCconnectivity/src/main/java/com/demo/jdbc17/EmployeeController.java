package com.demo.jdbc17;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // GET
    @GetMapping
    public List<Employee> getEmployees() {
        return employeeRepository.getAllEmployees();
    }

    // POST
    @PostMapping
    public String addEmployee(@RequestBody Employee employee) {
        employeeRepository.saveEmployee(employee);
        return "Employee inserted successfully";
    }
}
