-- Active: 1709891501590@@127.0.0.1@5432@ph

SELECT * from employees;

CREATE Function emp_count()
returns INTEGER
LANGUAGE SQL
AS
$$
SELECT COUNT(*) from employees
$$;

SELECT emp_count();


CREATE or replace Function delete_emp()
returns void
LANGUAGE SQL
AS
$$
DELETE from employees where employee_id = 1;
$$;

SELECT delete_emp();



CREATE or replace Function delete_emp_by_id(p_emp_id INTEGER)
returns void
LANGUAGE SQL
AS
$$
DELETE from employees where employee_id = p_emp_id;
$$;

SELECT delete_emp_by_id(2);

select * from employees


CREATE Procedure remove_emp_var()
LANGUAGE plpgsql
as 
$$
DECLARE
test_var INT;
BEGIN
SELECT employee_id INTO test_var from employees WHERE employee_id = 4;
DELETE from employees where employee_id = test_var;
END
$$;

call remove_emp_var();





select * from employees

CREATE Procedure remove_emp_var_id(p_emp_id int)
LANGUAGE plpgsql
as 
$$
DECLARE
test_var INT;
BEGIN
SELECT employee_id INTO test_var from employees WHERE employee_id = p_emp_id;
DELETE from employees where employee_id = test_var;

RAISE NOTICE'Employee Removed Succesfully';
END
$$;

call remove_emp_var_id(5);