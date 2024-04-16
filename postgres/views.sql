-- Active: 1709891501590@@127.0.0.1@5432@ph
create view dept_avg_salary as SELECT department_name, avg(salary) from employees GROUP BY department_name;


SELECT * from dept_avg_salary;


create view it_avg_salary as 
SELECT employee_name, salary, department_name from employees where department_name in (SELECT department_name from employees WHERE department_name LIKE '_T');

select * from it_avg_salary;