-- DROP DATABASE IF EXISTS employee_tracker_db;
-- CREATE DATABASE employee_tracker_db;

-- USE employee_tracker_db;
-- CREATE TABLE department (
-- id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- name VARCHAR(30) NOT NULL
-- );

-- USE employee_tracker_db;
-- CREATE TABLE role (
-- id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- title VARCHAR(30) NOT NULL,
-- salary DECIMAL NOT NULL,
-- department_id INT NOT NULL,
-- FOREIGN KEY(department_id) REFERENCES department(id)
-- );

-- USE employee_tracker_db;
-- CREATE TABLE employee (
-- id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
-- first_name VARCHAR(30) NOT NULL,
-- last_name VARCHAR(30) NOT NULL,
-- role_id INT NOT NULL,
-- manager_id INT,
-- FOREIGN KEY(role_id) REFERENCES role(id),
-- FOREIGN KEY(manager_id) REFERENCES employee(id)
-- );
