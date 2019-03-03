let mongoose = require('mongoose')
, Admin = mongoose.mongo.Admin;

const checkdatabase = () => {
    /// create a connection to the DB    
    let connection = mongoose.createConnection(
        'mongodb://localhost:27017');
    connection.on('open', function () {
        // connection established
        new Admin(connection.db).listDatabases(function (err, result) {
            let allDatabases = result.databases;
            for (let i = 0; i < allDatabases.length; i++) {
                if ('employee' == allDatabases[i].name) {
                    break;
                }
            }

        });
    });
}

module.exports = checkdatabase;