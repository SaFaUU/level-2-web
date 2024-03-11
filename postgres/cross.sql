CREATE Table employees (
    emp_id INT,
    emp_name VARCHAR(20),
    dept_id INT
);

CREATE Table departments (
    dept_id INT,
    dept_name VARCHAR(20)
);

drop Table employees;
drop Table departments;

INSERT INTO employees VALUES
(1, 'Joe', 101),
(2, 'Henry', 102);

INSERT INTO departments VALUES
(101, 'IT'),
(102, 'Sales');

SELECT * from employees;
SELECT * from departments;


-- cross JOIN

SELECT * FROM employees
CROSS JOIN departments

-- NATURAL JOIN

SELECT * FROM employees
NATURAL JOIN departments