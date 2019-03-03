©copyright Author : Pratim Gayen
# employee-db-node-project
this is a node js project for employee table API

Steps:
1. clone project to the local machine
2. open cmd and enter into the directory
3. > npm install
4. mongo db should be installed in the local machine
5. mongo db download --> https://www.mongodb.com/download-center/community
6. create a database name employee without username and password (since the current code config doesnt have one)
7. inside employee create two collections --> addresses and employees
8. start the mongo db server in local which will by default run on localhost:27017
9. if the servers are running in different server you can config that to --> the config folder --> config.js
10. cmd > npm start which will automaticall start the server at 3001


API details:
1. Add an employee
    a) Method : POST
    b) URL : http://localhost:3001/api/employee/insertemployee
    c) body :{
                "empid": "123", //primary key , numeric and mandatory
                "firstname": "Gita", //mandatory
                "lastname": "Gayena", //mandatory
                "dob": "1992-2-5" //yyyy-mm-dd format
             }

2. Add an address for employee
    a) Method : POST
    b) URL : http://localhost:3001/api/address/addaddress
    c) body :{
                "empid": "123", //primary key , numeric and mandatory
                "presentaddress": "ABC", //if not provided by default stores NA
                "permanentaddress": "ABC", //if not provided by default stores NA
                "officeaddress": "ABC" // if not provided by default stores NA
             }
            
3. List all employees
    a) Method : GET
    b) URL : http://localhost:3001/api/employee/getallemployees

4. List all addresses
    a) Method : GET
    b) URL : http://localhost:3001/api/address/getalladdresses

5. List addresses for a particular employee (identified by employee id)
    a) Method : GET
    b) URL : http://localhost:3001/api/address/getempaddress?empid=

6. Get details of an employee (identified by employee id) along with his/her addresses
    a) Method : GET
    b) URL : http://localhost:3001/api/employee/getempdetails?empid=

7. Update employee details (divided in 2 sections)
7.1. Update employee table
    a) Method : PUT
    b) URL : http://localhost:3001/api/combine/update/employeedetails
    c) body :{
                "empid": "123", //primary key , numeric and mandatory
                "firstname": "Gita",
                "lastname": "Gayena", 
                "dob": "1992-2-5" //yyyy-mm-dd format
             }
        
7.2. Update addresses table
    a) Method : PUT
    b) URL : http://localhost:3001/api/combine/update/employeeaddress
    c) body :{
                "empid": "123", //primary key , numeric and mandatory
                "presentaddress": "ABC",
                "permanentaddress": "ABC", 
                "officeaddress": "ABC" 
             }

8. Delete employee
    a) Method : DELETE
    b) URL : http://localhost:3001/api/address/delete?empid=