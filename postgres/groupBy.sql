-- Active: 1709891501590@@127.0.0.1@5432@ph
SELECT * from students;

SELECT country, count(*), avg(age) from students GROUP BY country;

SELECT country, count(*), avg(age) from students GROUP BY country HAVING avg(age) >= 18;

SELECT extract(year from dob) as birthYear, count(*) from students GROUP BY birthYear;

 