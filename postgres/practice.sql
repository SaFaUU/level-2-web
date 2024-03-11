-- Active: 1709891501590@@127.0.0.1@5432@ph

CREATE table departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(50)
);

CREATE table employees (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(50),
    department_id INT REFERENCES departments(department_id),
    salary DECIMAL(10, 2),
    hire_date DATE
)

insert into departments (department_name) values 
('Accounting'),
('Marketing'),
('Engineering'),
('Human Resources'),
('Sales'),
('IT'),
('Finance'),
('Legal');
;


INSERT INTO employees (employee_name, department_id, salary, hire_date) VALUES
('John', 1, 50000.00, '2022-01-01'),
('Jane', 2, 60000.00, '2022-02-01'),
('Bob', 3, 70000.00, '2022-03-01'),
('Alice', 4, 80000.00, '2022-04-01'),
('Tom', 5, 90000.00, '2022-05-01'),
('Sarah', 6, 100000.00, '2022-06-01'),
('Mike', 7, 110000.00, '2022-07-01'),
('Emily', 8, 120000.00, '2022-08-01');


select * from employees join departments on employees.department_id = departments.department_id;

select * from employees join departments USING (department_id);

SELECT department_name, avg(salary) from employees join departments using(department_id) group by department_name;

SELECT department_name, count(*) from employees join departments using(department_id) group by department_name;

SELECT department_name, round(avg(salary)) as avg_salary from employees join departments using(department_id) group by department_name ORDER BY avg_salary desc limit 1;


SELECT extract(year from hire_date), count(*) from employees join departments using(department_id) group by extract(year from hire_date);