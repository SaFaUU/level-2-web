-- Active: 1709891501590@@127.0.0.1@5432@ph
CREATE Table "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL
)

CREATE Table "post" (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    user_id INTEGER REFERENCES "user" (id) ON DELETE set DEFAULT DEFAULT 2 
)

drop table "post";
drop table "user";



ALTER table post alter COLUMN user_id set not null;

INSERT INTO "user" (username) VALUES
('Akash'),
('Batash'),
('Sagor'),
('Nodi');

INSERT INTO post (title, user_id) VALUES 
('Post 1', 1),
('Post 2', 2),
('Post 3', 1),
('Post 4', 4);

SELECT * from "user";

SELECT * from "post";


delete from "user" where id=4;

SELECT title, username from post JOIN "user" ON post.user_id = "user".id;

SELECT title, username from post p JOIN "user" u ON p.user_id = u.id;

INSERT INTO post (title, user_id) VALUES 
('Test Post', NULL)


SELECT title, username from post left JOIN "user" ON post.user_id = "user".id;

SELECT title, username from post RIGHT JOIN "user" ON post.user_id = "user".id;

SELECT title, username from post FULL JOIN "user" ON post.user_id = "user".id;