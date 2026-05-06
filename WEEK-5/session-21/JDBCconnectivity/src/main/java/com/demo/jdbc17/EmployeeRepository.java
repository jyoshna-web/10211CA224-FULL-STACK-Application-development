package com.demo.jdbc17;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeRepository {

    private final JdbcTemplate jdbcTemplate;

    public EmployeeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // GET all employees
    public List<Employee> getAllEmployees() {
        String sql = "SELECT * FROM employee";

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new Employee(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getDouble("salary")
                )
        );
    }

    // INSERT employee
    public int saveEmployee(Employee employee) {
        String sql = "INSERT INTO employee (id, name, salary) VALUES (?, ?, ?)";
        return jdbcTemplate.update(
                sql,
                employee.getId(),
                employee.getName(),
                employee.getSalary()
        );
    }
}
