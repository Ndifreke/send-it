CREATE TABLE users(
id SERIAL PRIMARY KEY, 
first_name VARCHAR(50) NOT NULL,
email text NOT NULL,
password text NOT NULL,
mobile_number VARCHAR NULL NULL,
is_admin BOOLEAN NOT NULL
)

