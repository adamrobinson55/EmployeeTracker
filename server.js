const mysql = require('mysql2')
const inquirer = require('inquirer')

require('dotenv').config()

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // TODO: Add MySQL password here
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to database.`)
)

displayMenu = () => {
  console.log('><===|| Welcome ||===><')
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
        ]
      }
    ])
    .then(response => {
      handler(response.choice)
    })
}

viewDepartments = () => {
  const query = 'SELECT name, id FROM department'
  db.query(query, (err, result) => {
    if (err) throw err
    console.log('=== Departments ===')
    result.forEach(department => {
      console.log(`Department ID: ${department.id}, Department Name: ${department.name}`)
    })
    console.log('\n')
    displayMenu()
  })
}

viewRoles = () => {
  const query = 'SELECT role.id, title, salary, department.name AS department FROM role ' +
    'JOIN department ON role.department_id = department.id'
  db.query(query, (err, result) => {
    if (err) throw err
    console.log('=== Roles ===')
    result.forEach(role => {
      console.log(`Role ID: ${role.id}, Title: ${role.title}, Department: ${role.department}, Salary: ${role.salary}`)
    })
    console.log('\n')
    displayMenu()
  })

}

viewEmployees = () => {
  const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee ' +
                'JOIN role ON employee.role_id = role.id ' +
                'JOIN department ON role.department_id = department.id ' +
                'JOIN employee AS manager ON employee.manager_id = manager.id;'

  db.query(query, (err, result) => {
    if (err) throw err
    console.log('=== Employees ===')
    result.forEach(employee => {
      console.log(`Employee ID: ${employee.id}, Name: ${employee.first_name} ${employee.last_name}, Role: ${employee.role_title}, Department: ${employee.department}, Salary: ${employee.salary}, Manager: ${employee.manager_first_name} ${employee.manager_last_name}`)
    })
    console.log('\n')
    displayMenu()
  })
}

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:'
      }
    ])
    .then(answer => {
      const query = `INSERT INTO department (name) VALUES ('${answer.departmentName}')`
      db.query(query, (err, result) => {
        if (err) throw err
        console.log('Department added successfully!\n')
        displayMenu()
      })
    })
}

addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of the role:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:'
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:'
      }
    ])
    .then(answers => {
      const { roleName, salary, departmentId } = answers
      const query = `INSERT INTO role (title, salary, department_id) VALUES ('${roleName}', '${salary}', '${departmentId}')`
      db.query(query, (err, result) => {
        if (err) throw err
        console.log('Role added successfully!\n')
        displayMenu()
      })
    })
}

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:"
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:"
      },
      {
        type: 'input',
        name: 'roleId',
        message: "Enter the employee's role ID:"
      },
      {
        type: 'input',
        name: 'managerId',
        message: "Enter the employee's manager ID:"
      }
    ])
    .then(answers => {
      const { firstName, lastName, roleId, managerId } = answers
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleId}', '${managerId}')`
      db.query(query, (err, result) => {
        if (err) throw err
        console.log('Employee added successfully!\n')
        displayMenu()
      })
    })
}

updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: "Enter the employee's ID to update:"
      },
      {
        type: 'input',
        name: 'newRoleId',
        message: "Enter the new role ID for the employee:"
      }
    ])
    .then(answers => {
      const { employeeId, newRoleId } = answers
      const query = `UPDATE employee SET role_id = '${newRoleId}' WHERE id = '${employeeId}'`
      db.query(query, (err, result) => {
        if (err) throw err
        console.log('Employee role updated successfully!\n')
        displayMenu()
      })
    })
}


handler = (option) => {
  switch (option) {
    case 'View all departments':
      viewDepartments()
      break
    case 'View all roles':
      viewRoles()
      break
    case 'View all employees':
      viewEmployees()
      break
    case 'Add a department':
      addDepartment()
      break
    case 'Add a role':
      addRole()
      break
    case 'Add an employee':
      addEmployee()
      break
    case 'Update an employee role':
      updateEmployeeRole()
      break
    case 'Exit':
      db.end()
      process.exit()
      break
    default:
      console.log('Invalid option. Please try again.\n')
      displayMenu()
  }
}

displayMenu()