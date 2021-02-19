const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    DB = 'mongodb://localhost:27017/OfficeSpace'
    //DB = 'mongodb+srv://omersjd:omersjdp@officespace-szwno.mongodb.net/OfficeSpace?retryWrites=true&w=majority'



const employeeRoute = require('./routes/employee.route');
//mongoose.Promise = global.Promise;
mongoose.connect(DB, { useNewUrlParser: true }, (err, response) => {
    if (err) {
        console.log('Error connecting to Database: ', err)
    } else {
        console.log('Connected to ' + DB);
    }
});
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', employeeRoute);
let port = process.env.PORT || 4000;

app.get('/checkOfficeSpace', (request, response) => {
        return response.json({ status: 'Office server running' });
    })
    //console.log(employeeRoute);

const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
})
