CREATE TABLE blogs (
    id serial PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title)
    VALUES ('Dan Abramov', 'www.danabramov.com', 'On let vs const');

INSERT INTO blogs (author, url, title)
    VALUES ('Laurenz Albe', 'www.laurenzalbe.com', 'Gaps in sequences in PostgreSQL');

SELECT * FROM blogs;