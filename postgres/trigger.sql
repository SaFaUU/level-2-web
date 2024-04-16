-- Active: 1709891501590@@127.0.0.1@5432@ph
drop table my_users;
drop table delted_users_audit;

create table my_users 
(
    user_name VARCHAR(50),
    email VARCHAR(100)
)

INSERT into my_users VALUES ('John', 'j@j.com'), ('Jane', 'j@j.com'), ('Joe', 'j@j.com');

SELECT * from my_users;

SELECT * from delted_users_audit;

create table delted_users_audit
(
    user_name VARCHAR(50),
    email VARCHAR(100),
    deleted_at TIMESTAMP
)

CREATE or REPLACE Function save_deleted_user2()
RETURNS TRIGGER
LANGUAGE plpgsql
as
$$
BEGIN
    INSERT INTO delted_users_audit VALUES (OLD.user_name, OLD.email, NOW());
    -- RAISE NOTICE 'Deleted User Audit Log Created';
    RETURN OLD;
END
$$;

create or REPLACE trigger save_deleted_user_trigger2
BEFORE DELETE
on my_users
for EACH row
EXECUTE FUNCTION save_deleted_user2();


DELETE from my_users where user_name = 'Joe';