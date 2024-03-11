-- Active: 1709891501590@@127.0.0.1@5432@ph
CREATE table students(
    student_id SERIAL PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) not NULL,
    age INT,
    grade CHAR(2),
    course VARCHAR(50),
    email VARCHAR(100),
    dob DATE,
    blood_group VARCHAR(5),
    country VARCHAR(50)
)

INSERT INTO students (first_name, last_name, age, grade, course, email, dob, blood_group, country) VALUES
('John', 'Doe', 18, 'A+', 'Math', 'john.doe@example.com', '2003-01-15', 'O+', 'USA'),
('Jane', 'Smith', 17, 'B-', 'English', 'jane.smith@example.com', '2004-05-20', 'A-', 'Canada'),
('Michael', 'Johnson', 16, 'A', 'Science', 'michael.johnson@example.com', '2005-08-10', 'B+', 'UK'),
('Emily', 'Williams', 18, 'A', 'History', 'emily.williams@example.com', '2003-03-25', 'AB-', 'Australia'),
('Daniel', 'Brown', 17, 'B', 'Art', 'daniel.brown@example.com', '2004-06-30', 'O-', 'Germany'),
('Olivia', 'Davis', 16, 'A-', 'Music', 'olivia.davis@example.com', '2005-11-05', 'B-', 'France'),
('William', 'Miller', 18, 'A+', 'Math', 'william.miller@example.com', '2003-04-15', 'A+', 'India'),
('Sophia', 'Wilson', 17, 'B', 'English', 'sophia.wilson@example.com', '2004-07-20', 'O+', 'Japan'),
('Alexander', 'Martinez', 16, 'A-', 'Science', 'alexander.martinez@example.com', '2005-09-10', 'AB-', 'Brazil'),
('Isabella', 'Anderson', 18, 'A', 'History', 'isabella.anderson@example.com', '2003-05-25', 'B+', 'China'),
('Ethan', 'Taylor', 17, 'B+', 'Art', 'ethan.taylor@example.com', '2004-08-30', 'O-', 'Russia'),
('Mia', 'Thomas', 16, 'A', 'Music', 'mia.thomas@example.com', '2005-12-05', 'A-', 'South Africa'),
('James', 'Hernandez', 18, 'A-', 'Math', 'james.hernandez@example.com', '2003-06-15', 'B-', 'Mexico'),
('Amelia', 'Moore', 17, 'B-', 'English', 'amelia.moore@example.com', '2004-09-20', 'O+', 'Argentina'),
('Benjamin', 'Garcia', 16, 'A+', 'Science', 'benjamin.garcia@example.com', '2005-10-10', 'AB-', 'Italy'),
('Charlotte', 'Lopez', 18, 'A', 'History', 'charlotte.lopez@example.com', '2003-07-25', 'B+', 'Spain'),
('Sebastian', 'Clark', 17, 'B', 'Art', 'sebastian.clark@example.com', '2004-10-30', 'O-', 'Netherlands'),
('Grace', 'Lewis', 16, 'A-', 'Music', 'grace.lewis@example.com', '2006-01-05', 'A-', 'Sweden'),
('Lucas', 'Young', 18, 'A', 'Math', 'lucas.young@example.com', '2003-08-15', 'O+', 'Norway'),
('Avery', 'Hall', 17, 'B+', 'English', 'avery.hall@example.com', '2004-11-20', 'AB-', 'Denmark'),
('Lily', 'Scott', 16, 'A', 'Science', 'lily.scott@example.com', '2006-02-05', 'B-', 'Switzerland'),
('Jackson', 'Green', 18, 'A-', 'History', 'jackson.green@example.com', '2003-09-25', 'O-', 'Ireland'),
('Evelyn', 'Adams', 17, 'B-', 'Art', 'evelyn.adams@example.com', '2004-12-30', 'A+', 'Finland'),
('Logan', 'Baker', 16, 'A', 'Music', 'logan.baker@example.com', '2006-03-05', 'B+', 'Belgium'),
('Aria', 'Wright', 18, 'A+', 'Math', 'aria.wright@example.com', '2003-10-15', 'O-', 'Portugal')



SELECT * FROM students;

SELECT * FROM students ORDER BY first_name ASC

SELECT DISTINCT blood_group from students ORDER BY blood_group ASC;


SELECT * from students WHERE country = 'USA';

SELECT * FROM students WHERE grade = 'A' AND course='Math';

SELECT * FROM students WHERE country = 'USA' OR country='Australia';

SELECT * FROM students WHERE(country = 'USA' OR country='Australia') and age = 20;

SELECT * FROM students WHERE age != 16 AND course='Math';

SELECT upper(first_name), * FROM students;

SELECT concat(first_name, ' ', last_name) as "fullName", * FROM students;

SELECT avg(age) FROM students;

SELECT max(age) FROM students;

select count(*) from students;

select max(length(first_name)) from students;

SELECT * FROM students WHERE NOT country = 'USA';


SELECT * from students WHERE email IS NULL;

select COALESCE(email, 'N/A') AS "Email" FROM students;

SELECT * from students WHERE country='USA' or country='Australia';

SELECT * from students WHERE country IN ('USA', 'Australia');

SELECT * from students where age BETWEEN 16 and 22;

SELECT * from students WHERE first_name LIKE 'J%';

SELECT * from students WHERE first_name LIKE '_o%';

SELECT * from students WHERE first_name ILIKE 'j%';

SELECT * from students LIMIT 5 OFFSET 5;


SELECT * from students;

DELETE FROM students WHERE first_name = 'John';

update  students set country='Canada', last_name='Ulluk'  where first_name='Jane';