-- View All Departments
SELECT id AS department_id, name AS department_name
FROM department
ORDER BY id;

-- Add a New Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ($1, $2, $3, $4);

-- Update an Employee's Role
UPDATE employee
SET role_id = $1
WHERE id = $2;
