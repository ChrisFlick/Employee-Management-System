-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS employeeTraker_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE employeeTraker_db;

USE employeeTraker_db;

-- Create the table tasks.
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    -- FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
    -- FOREIGN KEY (role_id) REFERENCES role (id),
--     FOREIGN KEY (manager_id) REFERENCES  employee(id)
);


