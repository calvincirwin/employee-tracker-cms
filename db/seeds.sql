CREATE DATABASE company;

\c company
-- Insert some sample data into department
INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Finance');

-- Insert some sample data into role
INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 80000, 1), ('Sales Manager', 70000, 2), ('Accountant', 60000, 3);

-- Insert some sample data into employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Joe', 'Bloggs', 3, NULL);
