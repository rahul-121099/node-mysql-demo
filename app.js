const express = require('express');
const mysql = require('mysql');
// const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());


const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connected to database.');
    }
    else {
        console.log('Unable to connect to database.');
    }
});

//define routes for operations 

//get all employees from the MySql database
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee' , (err, rows, fields) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
});


//get individual user from database using id
app.get('/employee/:id', (req, res) => {
    const empID = req.params.id;
    mysqlConnection.query(`SELECT * FROM employee WHERE EmpID = ${empID}` , (err, rows, fields) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
});

//delete the employee from the database
app.get('/employeedelete/:id', (req, res) => {
    const empID = req.params.id;
    mysqlConnection.query(`DELETE FROM employee WHERE EmpID = ${empID}` , (err, rows, fields) => {
        if(err) {
            console.log(err);
        }
        else {
            // res.send(rows);
            res.send('Employee deleted successfully');
        }
    })
});

app.listen(process.env.PORT, (err) => {
    if(!err) {
        console.log('Listening on port 3000.');
    }
});

// INSERT INTO `employee` (`EmpID`, `Emp_Name`, `Emp_Post`, `Emp_Salary`) VALUES ('121102', 'Harsh', 'HR', '6000');