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

//Function that will prompt the action the user should take
// * The first should ask them the ID of the product they would like to buy.
// * The second message should ask how many units of the product they would like to buy.

function start() {
    inquirer
        .prompt({
            name: "productChoice",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        }, {
            name: "productAmount",
            type: "input",
            message: "How many units would you like to buy"
        })
        .then(function (answer) {
            //Based off what the user chooses, then we ask how many units they want to buy
            var productChoice = answer.productChoice;
            var productAmount = answer.productAmount;
            var department = answer.department;
            var stock_quantity = answer.stockQuantity;

            connection.query(
                "INSERT INTO products SET ?"
                {
                    product_name: answer.productChoice,
                    department_name: answer.department,
                    price: answer.productAmount || 0,
                    stock_quantity = answer.stockQuantity || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("Insufficient Quantity!");
                    //Re-prompt user to restart purchase
                    start();
                }
            );
        });
}