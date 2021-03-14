/*-Department Seeds-*/
INSERT INTO department (name) values ('Sales');
INSERT INTO department (name) values ('Ingeneering');
INSERT INTO department (name) values ('Finance');
INSERT INTO department (name) values ('Legal');


/*-Employee Role Seeds-*/
INSERT INTO role (title, salary, department_id) values ('Sales Lead', 100000, 1);
INSERT INTO role (title, salary, department_id) values ('Sales person', 80000, 1);
INSERT INTO role (title, salary, department_id) values ('Lead Engineer', 150000, 2);
INSERT INTO role (title, salary, department_id) values ('Software Engineer', 120000, 2);
INSERT INTO role (title, salary, department_id) values ('Accountant', 125000, 3);
INSERT INTO role (title, salary, department_id) values ('Legal Team Lead', 100000, 4);
INSERT INTO role (title, salary, department_id) values ('Lawyer', 190000, 4);


/*-Employee Seeds-*/
INSERT INTO employee (first_name, last_name, manager_id, role_id) values ('Ann', 'Collins', 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) values ('Phil', 'Li', 3, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) values ('Petter', 'Frey', 4, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) values ('Patricia', 'Vidal', 6, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id) values ('Ronald', 'Hazel', null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) values ('Bryan', 'Uriol', null, 6);


