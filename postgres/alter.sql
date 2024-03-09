-- Active: 1709891501590@@127.0.0.1@5432@ph
SELECT * from person2;


ALTER TABLE person2 ADD COLUMN email varchar(25) NOT NULL DEFAULT 'unknown';


ALTER TABLE person2 DROP COLUMN email;

INSERT INTO person2 values (7, 'test', 45, 'a@a.com');

ALTER Table person2 RENAME COLUMN age to user_age;

alter TABLE person2 ALTER COLUMN user_name type varchar(25);

alter TABLE person2 ALTER COLUMN user_age set NOT NULL;

alter TABLE person2 ALTER COLUMN user_age DROP NOT NULL;

alter TABLE person2 ADD constraint unique_person2_user_age  UNIQUE(user_age);


alter TABLE person2 drop constraint unique_person2_user_age;

TRUNCATE TABLE person2 ;