-- Active: 1709891501590@@127.0.0.1@5432@ph

show timezone;

SELECT now();

create Table timeZ (ts TIMESTAMP without time zone, tsz TIMESTAMP with TIME zone);

insert into timeZ VALUES('2021-01-01 00:00:00.000', '2021-01-01 00:00:00.000+00:00');

SELECT * from timeZ;

SELECT now();

SELECT current_date;

SELECT now()::date;

SELECT now()::time;


SELECT to_char(now(), 'YYYY-MM-DD HH:MI:SS');


SELECT CURRENT_DATE - INTERVAL '1 year';

SELECT age(CURRENT_DATE, '1997-08-25');

select *, age(CURRENT_DATE, dob) as ageNow from students;

SELECT extract(year from age(CURRENT_DATE, dob)) as ageNow from students;

GROUP BY