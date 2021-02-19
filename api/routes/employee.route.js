const express = require('express');
const moment = require('moment')
const app = express();
const employeeRoute = express.Router()
const Users = require('../models/User');
let Employees = require('../models/Employee');

employeeRoute.post('/register', (request, response) => {
    let user = new Users(request.body);
    console.log('going to register the follwing user: ', request.body);
    user.save(() => {
        response.status(200).json('Employee saved successfully ')
    })

})


// Checking the login
employeeRoute.route('/login').post((request, response) => {
    console.log('Request body contains: ', request.body)
    let user = request.body
    console.log('User going to logged in: ', user.username)
    Users.findOne({ username: user.username }, (error, result) => {
        if (error) {
            return response.status(401).send('Unauthorized Access')
        } else {
            if (!result)
                return response.status(401).send('Invalid Username')
            else {
                if (user.password !== result.password)
                    return response.status(401).send('Invalid password');
                else {

                    return response.status(200).send(true);

                }
            }
        }

    })
})

// employeeRoute.route('/login').post((req, res) => {
//     let userData = req.body
//     console.log('User going to logged in: ', userData.email)
//     Employees.findOne({ first_name: userData.email }, (error, user) => {
//         if (error) {
//             return res.status(401).send('Unauthorized Accessss')
//         }
//         else {
//             if (!user)
//                 return res.status(401).send('Invalid Email')
//             else {
//                 if (userData.password !== user.gender)
//                     return res.status(401).send('Invalid password');
//                 else {
//                     console.log('User credential matched')
//                     return res.status(200).send(true);

//                 }
//             }
//         }

//     })
// })

/////////////////ADDING EMPLOYEE//////////////////

employeeRoute.route('/Employees/').post(function(req, res) {
    let employee = new Employees(req.body);
    console.log('Data to save is: ', employee)
    employee.save().then(employee => { res.status(200).json({ 'employee': 'Employee added in successfully' }) })
})

/////////////////DELETING EMPLOYEE/////////////////
employeeRoute.route('/Employees/del/').post(function(req, res) {
    console.log('Delete Function Called with id', req.body.id);
    Employees.deleteOne({ _id: req.body.id }, function(err) {
        console.log('Id against which employee is deleted: ', req.body.id);
        if (err) res.json(err);
        else res.json('Successfully removed');
    })
});
/////////////////GETTING A SINGLE EMPLOYEE/////////////////
employeeRoute.route('/Employees/get').post(function(req, res) {
        let employee = '';
        //console.log('Single getEmployee function called');
        Employees.findOne({ _id: req.body.id }, function(err, result) {
            if (err) {
                console.log('Caught an error Custom: ', err);
                return res.status(404).json({ 'Error': 'Caught an error' });
            } else {
                employee = result;
                res.json(employee);
                console.log('Employee sent');
            }
        })
    })
    /////////////////GETTING THE LIST OF ALL EMPLOYEES/////////////////
employeeRoute.get('/Employees/', function(req, res) {
    let employees = [];
    // res.writeHead(200, {
    //     'Pagination': 'someInformation'
    // })
    // console.log('response going to front-end: ', res);
    Employees.find({}, function(err, results) {

        if (err) {
            console.log(err);
        } else {

            employees = results;
            // res.set({
            //         'paginationInfo': 'someInformation'
            //     })
            // res.setHeader('Access-Control-Allow-Origin', '*');
            // res.setHeader('Access-Control-Allow-Headers', 'setHeader');

            // res.header('Access-Control-Allow-Origin', '*');
            // res.setHeader('Access-Control-Allow-Origin', '*');
            let paginatio = 'blablabla'
            const currentCity = 'Qatar';

            // res.header('Access-Control-Allow-Headers', 'pagination');
            // res.header('branch', 'doha');
            // res.header('Access-Control-Expose-Headers', 'branch');
            // res.header('Access-Control-Expose-Headers', 'pagination,CurrentCity');
            // res.header('pagination', paginatio);
            // pagination = {
            //     'pageSize': 25,
            //     'someInformation': 'blablabla...'
            // }
            // res.header('Access-Control-Expose-Headers', 'X-Pagination');
            // res.setHeader('X-Pagination', JSON.stringify(pagination));

            // res.header('Access-Control-Expose-Headers', 'CurrentCity');
            // res.header('X-Pagination', pagination);

            // console.log('response going to front-end: ', res);
            res.json(employees)
            date = new Date()
            console.log('Employees Fetched: ', moment().format('LTS'));
            console.log('User credential matched')

        }
    })
})



/////////////////////////// Get the Ids of employees for iteration /////////////

employeeRoute.route('/Employees/ids').get(function(request, response) {
    console.log('function called')
        //db.Employees.find({},{_id:1})
    Employees.find({}, { _id: 1 }, function(error, result) {
        if (error)
            console.log('Error getting the ids of employees: ', error)
        else {
            //console.log('Ids of employees: ', result)
            response.send(result)
        }
    })
})

/////////////////UPDATE EMPLOYEE/////////////////
employeeRoute.route('/Employees/update').post(function(req, res) {
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
    }, function(err) {
        if (err) res.json(err);
        else res.json('Employee Updated');
        console.log('Employee Updated');
    })
})

/////////////////SEARCHING FOR EMPLOYEE/////////////////
employeeRoute.route('/Employees/search').post(function(req, res) {
    //console.log('Why flow is not coming here ?')
    //console.log("You searched for: ", req.body);
    let employees;
    if (req.body.searchUsing == 'First Name') {
        console.log('You searched for ' + req.body.searchFor + ' using ' + req.body.searchUsing);

        Employees.find({ first_name: { $regex: req.body.searchFor, $options: "i" } }, (err, result) => {

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
        Employees.find({ last_name: req.body.searchFor }, function(err, result) {
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
        Employees.find({ department: req.body.searchFor }, function(err, result) {
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
        Employees.find({ title: req.body.searchFor }, function(err, result) {
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