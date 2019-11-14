var cTable = require("console.table");
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
    password: "DukeGio0817!",
    database: "bamazon"
});

//Connecting to MySQL server and database
connection.connect(function (err) {
    if (err) throw err;
    //Run the start function after connection is made
    managerChoice();
});

function managerChoice() {
    inquirer.prompt({
        name: "managerAnswer",
        type: "list",
        message: "Do you want to [View Products] for Sale, View [Low Inventory], [Add to Inventory], [Add New Product] ",
        choices: ["View Products", "Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        switch (answer.managerAnswer) {
            case "View Products":
                displayInv();
                break;

            case "Low Inventory":
                lowInv();
                break;

            case "Add to Inventory":
                addInv();
                break;

            case "Add new Product":
                addProduct();
                break;
        };

    })
}

function displayInv() {
    var query = `SELECT * FROM products`;
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.table(response);
        managerChoice();
    });
};

function lowInv() {
    var query = `SELECT * FROM products WHERE stock_quantity <=10`;
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.table(response);
        managerChoice();
    });
};

function addInv() {
    var query = `SELECT * FROM products`;
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.table(response);

        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "What is the item_id of the item you would like to update stock on?"
            }, {
                name: "quantity",
                type: "input",
                message: "How many would you like to add?"
            }
        ]).then(function (answer) {
            var productUpdate = answer.item;
            var quantityUpdate = answer.quantity;
            var itemInventory;

            connection.query(`SELECT * FROM products WHERE ?`), { item_id: productUpdate }, function (err, response) {
                if (err) throw err;
                itemInventory = (response[0].stock_quantity + parseInt(quantityUpdate));
            }
        });
    });  

};    
