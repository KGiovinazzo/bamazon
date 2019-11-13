var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

//Creating connection to MySQL database
var connection = mysql.createConnection({
    host: "localhost",

    //Port
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "DukeGio0817!",
    database: "bamazon"
});

//Connecting to MySQL server and database
connection.connect(function (err) {
    if (err) throw err;
    //Run the start function after connection is made
    displayInv();
});

//Function that will prompt the action the user should take
// * The first should ask them the ID of the product they would like to buy.
// * The second message should ask how many units of the product they would like to buy.

function start() {
    inquirer
        .prompt([
        {
            name: "productChoice",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            name: "productAmount",
            type: "input",
            message: "How many units would you like to buy"
        }
        ]).then(function (answer) {
            var productChoice = answer.productChoice;
            var productAmount = answer.productAmount;
            var totalCost;
            var totalQuantity;

            connection.query("SELECT * FROM products WHERE ?", { item_id: productChoice }, function (err, response) {
                if (err) throw err;
                if(productAmount > response[0].stock_quantity){
                    console.log("Insufficient Quantity!");
                }else{
                    totalCost = productAmount * response[0].price;
                    console.log(totalCost);
                };
                // console.log(response);

                connection.end();
            });
        });
};

function displayInv(){
    var query = `SELECT * FROM products`;
    connection.query(query, function(err, response){
        if (err) throw err;
        console.table(response);
        start();
    });
};

// if (userQuantity > databaseAmount){
// console.log("not enough");
// } else {

// }