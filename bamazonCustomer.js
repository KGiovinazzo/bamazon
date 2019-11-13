var mysql = require("mysql");
var inquirer = require("inquirer");

//Creating connection to MySQL database
var connection = mysql.createConnection({
    host: "localhost",

    //Port
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "",
    database: "bamazon",
});

//Connecting to MySQL server and database
connection.connect(function (err) {
    if (err) throw err;
    //Run the start function after connection is made
    start();
});