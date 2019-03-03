const express = require('express');
const app = express();

const employeeRoutes = require('./api/routes/employee');
const addressRoutes = require('./api/routes/address');
const combineRoutes = require('./api/routes/empaddcombine');

app.use('/api/employee', employeeRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/combine', combineRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('server running at port ' + port);
})