const express = require('express');
const app = express();
const employeeRoute = express.Router();

let Employees = require('../models/Employee');

/////////////////ADDING EMPLOYEE//////////////////

employeeRoute.route('/Employees/').post(function (req, res) {
    let employee = new Employees(req.body);
    console.log('Data to save is: ', employee)
    employee.save().then(employee => { res.status(200).json({ 'employee': 'Employee added in successfully' }) })
})

/////////////////DELETING EMPLOYEE/////////////////
employeeRoute.route('/Employees/del/').post(function (req, res) {
    console.log('Delete Function Called with id', req.body.id);
    Employees.deleteOne({ _id: req.body.id }, function (err) {
        console.log('Id against which employee is deleted: ', req.body.id);
        if (err) res.json(err);
        else res.json('Successfully removed');
    })
});
/////////////////GETTING A SINGLE EMPLOYEE/////////////////
employeeRoute.route('/Employees/get').post(function (req, res) {
    let employee = '';
    //console.log('Single getEmployee function called');
    Employees.findOne({ _id: req.body.id }, function (err, result) {
        if (err) {
            console.log('Caught an error', err);
            return res.status(404).json({ 'Error': 'Caught an error' });
        }
        else {
            employee = result;
            res.json(employee);
            console.log('Employee sent');
        }
    })
})
/////////////////GETTING THE LIST OF ALL EMPLOYEES/////////////////
employeeRoute.get('/Employees/', function (req, res) {
    let employees = [];
    Employees.find({}, function (err, results) {

        if (err) {
            console.log(err);
        }
        else {
            employees = results;
            res.json(employees);
            //      console.log('Employees Fetched');
        }
    })
})
/////////////////UPDATE EMPLOYEE/////////////////
employeeRoute.route('/Employees/update').post(function (req, res) {
    console.log('Entered in Update function');
    let employee = req.body;
    console.log('Edited Employee before saving to db', employee);
    Employees.updateOne({ _id: employee._id }, {
        first_name: employee.first_name,
        last_name: employee.last_name,
        title: employee.title,
        gender: employee.gender,
        department: employee.department,
        email: employee.email,
        location: employee.location,
        phone: employee.phone,
        branch: employee.branch,
        positionX: employee.positionX,
        positionY: employee.positionY,
    }, function (err) {
        if (err) res.json(err);
        else res.json('Employee Updated');
        console.log('Employee Updated');
    })
})
/////////////////SEARCHING FOR EMPLOYEE/////////////////
employeeRoute.route('/Employees/search').post(function (req, res) {
    //console.log('Why flow is not coming here ?')
    //console.log("You searched for: ", req.body);
    let employees;
    if (req.body.searchUsing == 'First Name') {
        console.log('You searched for ' + req.body.searchFor + ' using ' + req.body.searchUsing);
       
        Employees.find({ first_name: { $regex: req.body.searchFor, $options: "i" } }, (err, result)=>{

        // Employees.find({ first_name: req.body.searchFor }, (err, result) => {
        if (err)
            console.log(err);
        else {
            employees = result;
            if (employees.length == 0)
                console.log('No Employees found agains the given name');
            console.log('Found following: ', employees)
            res.send(employees);
        }
    })
    }
if (req.body.searchUsing == 'Last Name') {
    console.log('You searched for ' + req.body.searchFor + ' using ' + req.body.searchUsing);
    Employees.find({ last_name: req.body.searchFor }, function (err, result) {
        if (err)
            console.log(err);
        else {
            employees = result;
            if (employees.length == 0)
                console.log('No Employees found agains the given name');
            console.log('Found following: ', employees)
            res.send(employees);
        }
    })
}
if (req.body.searchUsing == 'Location') {
    console.log('You searched for ' + req.body.searchFor + ' using ' + req.body.searchUsing);
    Employees.find({ location: req.body.searchFor }, (err, result) => {
        if (err)
            console.log(err);
        else {
            employees = result;
            if (employees.length == 0)
                console.log('No Employees found agains the given name');
            console.log('Found following: ', employees)
            res.send(employees);
        }
    })
}
if (req.body.searchUsing == 'Department') {
    console.log('You searched for ' + req.body.searchFor + ' using ' + req.body.searchUsing);
    Employees.find({ department: req.body.searchFor }, function (err, result) {
        if (err)
            console.log(err);
        else {
            employees = result;
            if (employees.length == 0)
                console.log('No Employees found agains the given name');
            console.log('Found following: ', employees)
            res.send(employees);
        }
    })
}
if (req.body.searchUsing == 'Title') {
    console.log('You searched for ' + req.body.searchFor + ' using ' + req.body.searchUsing);
    Employees.find({ title: req.body.searchFor }, function (err, result) {
        if (err)
            console.log(err);
        else {
            employees = result;
            if (employees.length == 0)
                console.log('No Employees found agains the given name');
            console.log('Found following: ', employees)
            res.send(employees);
        }
    })
}
})
module.exports = employeeRoute
