CREATE TABLE users(
id SERIAL PRIMARY KEY, 
firstname VARCHAR(50) NOT NULL,
surname VARCHAR(50) NOT NULL,
email text NOT NULL,
password text NOT NULL,
mobile VARCHAR NULL NULL,
is_admin BOOLEAN NOT NULL
)

