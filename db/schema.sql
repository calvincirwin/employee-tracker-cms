-- Drop the database if it exists
DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

-- Connect to the new database
\c company;

-- Create Department Table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,         -- Automatically increments for each new department
    name VARCHAR(30) UNIQUE NOT NULL  -- Department name must be unique and cannot be null
);

-- Create Role Table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,         -- Automatically increments for each new role
    title VARCHAR(30) UNIQUE NOT NULL,  -- Role title must be unique and cannot be null
    salary DECIMAL NOT NULL,       -- Salary must be provided and cannot be null
    department_id INTEGER REFERENCES department(id) ON DELETE CASCADE  -- Reference to department table with cascade delete
);

-- Create Employee Table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,         -- Automatically increments for each new employee
    first_name VARCHAR(30) NOT NULL,  -- Employee's first name, cannot be null
    last_name VARCHAR(30) NOT NULL,   -- Employee's last name, cannot be null
    role_id INTEGER REFERENCES role(id) ON DELETE SET NULL,  -- Reference to role table
    manager_id INTEGER REFERENCES employee(id) ON DELETE SET NULL  -- Self-referencing manager ID, can be null
);
