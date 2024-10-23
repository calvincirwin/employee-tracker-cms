import inquirer from 'inquirer';   // For user interaction
import pool from './connection';   // Your database connection pool

// Function to view all departments
async function viewDepartments() {
  try {
    const result = await pool.query('SELECT * FROM department');
    console.table(result.rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
}

// Function to view all roles
async function viewRoles() {
  try {
    const result = await pool.query(`
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      LEFT JOIN department ON role.department_id = department.id
    `);
    console.table(result.rows);
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
}

// Function to view all employees
async function viewEmployees() {
  try {
    const result = await pool.query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    console.table(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
}

// Function to add a department
async function addDepartment() {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter department name:'
  });

  try {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Department '${name}' added successfully.`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

// Function to add a role
async function addRole() {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter department ID for this role:'
    }
  ]);

  try {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Role '${title}' added successfully.`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

// Function to add an employee
async function addEmployee() {
 // const { first_name, last_name, role_id, manager_id } = await 
  inquirer.prompt(
    [{
      type: 'input',
      name: 'first_name',
      message: 'Enter employee first name:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter employee last name:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter role ID for this employee:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter manager ID for this employee (or leave blank for no manager):',
      //default: () => null // Use a function to return null as the default,
    },
  ]).then((employee)=>{console.log(employee)});

  // try {
  //   await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
  //     [first_name, last_name, role_id, manager_id || null]);
  //   console.log(`Employee '${first_name} ${last_name}' added successfully.`);
  // } catch (err) {
  //   console.error('Error adding employee:', err);
  // }
}


// Function to update an employee's role
async function updateEmployeeRole() {
  const { employee_id, new_role_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter employee ID to update:'
    },
    {
      type: 'input',
      name: 'new_role_id',
      message: 'Enter new role ID for this employee:'
    }
  ]);

  try {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
    console.log(`Employee with ID '${employee_id}' updated successfully.`);
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}

// Main function that handles the user's choices
async function mainMenu() {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Exit'
    ]
  });

  switch (action) {
    case 'View All Departments':
      await viewDepartments();
      break;
    case 'View All Roles':
      await viewRoles();
      break;
    case 'View All Employees':
      await viewEmployees();
      break;
    case 'Add Department':
      await addDepartment();
      break;
    case 'Add Role':
      await addRole();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Update Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      await pool.end();  // Close the database connection when exiting
      console.log('Goodbye!');
      process.exit(0);
  }

  // Return to the main menu after completing an action
  await mainMenu();
}

// Start the application
mainMenu();
