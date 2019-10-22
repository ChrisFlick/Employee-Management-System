USE employeeTraker_db;

INSERT INTO department (name) VALUES ('Hax');
INSERT INTO department (name) VALUES ('CompSci');
INSERT INTO role (title, salary, department_id) VALUES ('hacker', 100000, 0);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 100000, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Bill', 'Compton', 1);

