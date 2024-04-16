-- Active: 1709891501590@@127.0.0.1@5432@ph

drop table employees;

CREATE TABLE employees (
employee_id SERIAL PRIMARY KEY,
employee_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50),
salary DECIMAL (10, 2),
hire_date DATE
)

INSERT INTO employees (employee_name, department_name, salary, hire_date)
VALUES ('John', 'IT', 50000.00, '2022-01-01'),
('Jane', 'HR', 60000.00, '2022-02-01'),
('Bob', 'Sales', 70000.00, '2022-03-01'),
('Alice', 'Marketing', 80000.00, '2022-04-01'),
('Mike', 'IT', 55000.00, '2022-05-01'),
('Emily', 'HR', 65000.00, '2022-06-01'),
('David', 'Sales', 75000.00, '2022-07-01'),
('Sarah', 'Marketing', 85000.00, '2022-08-01'),
('Tom', 'IT', 60000.00, '2022-09-01'),
('Olivia', 'HR', 70000.00, '2022-10-01'),
('Charlie', 'Sales', 80000.00, '2022-11-01'),
('Lily', 'Marketing', 90000.00, '2022-12-01'),
('Alex', 'IT', 55000.00, '2023-01-01'),
('Sophia', 'HR', 65000.00, '2023-02-01'),
('Jacob', 'Sales', 75000.00, '2023-03-01'),
('Mia', 'Marketing', 85000.00, '2023-04-01'),
('Ethan', 'IT', 60000.00, '2023-05-01'),
('Ava', 'HR', 70000.00, '2023-06-01'),
('Michael', 'Sales', 80000.00, '2023-07-01'),
('Emily', 'Marketing', 90000.00, '2023-08-01');

SELECT * FROM employees;

SELECT max(salary) from employees where department_name = 'HR'


SELECT * from employees WHERE salary > (SELECT max(salary) from employees where department_name = 'HR');

SELECT *, (SELECT sum(salary) from employees) from employees;


;

SELECT * from (SELECT department_name, sum(salary) from employees GROUP BY department_name) as sum_dept_salary;

SELECT employee_name, salary, department_name from employees where department_name in (SELECT department_name from employees WHERE department_name LIKE '_T');