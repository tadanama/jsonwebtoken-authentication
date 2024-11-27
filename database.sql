-- Create database
CREATE DATABASE jsonwebtoken;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255)
);

-- Refresh token is generated and stored in database after authentication process
-- A user can only have one refresh token at a time
CREATE TABLE refresh_token(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id) UNIQUE,
    refresh_token VARCHAR(255)
);