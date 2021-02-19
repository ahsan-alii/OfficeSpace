const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    DB = 'mongodb://localhost:27017/OfficeSpace'
    //DB = 'mongodb+srv://omersjd:omersjdp@officespace-szwno.mongodb.net/OfficeSpace?retryWrites=true&w=majority'



const employeeRoute = require('./routes/employee.route');
//mongoose.Promise = global.Promise;

// mongoose.connect(DB, { useNewUrlParser: true }, (err, response) => {
//     if (err) {
//         console.log('Error connecting to Database: ', err)
//     } else {
//         console.log('Connected to ' + DB);
//     }
// });
mongoose.connect(DB, { useNewUrlParser: true }).then(response => {
    console.log('Connected to database successfuly')
}).catch(error => {
    console.log('Error while connecting to database', error);
})

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', employeeRoute);
let port = process.env.PORT || 4000;
//console.log(employeeRoute);

const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
})
