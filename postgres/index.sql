-- Active: 1709891501590@@127.0.0.1@5432@ph

SELECT * from employees;

EXPLAIN ANALYSE
select * from employees where employee_name = 'Alex';


CREATE index idx_employees_last_name on employees(employee_name)