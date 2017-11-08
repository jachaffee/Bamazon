var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
 
  password: "",
  database: "bamazon_db"
});

function checkForUpdates() {
	inquirer.prompt([
		{
			name: "task",
			type: "list",
			message: "What task would you like to complete?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
	]).then(function(response) {
		switch (response.task) {
			case "View Products for Sale":
				generateTable();
				break;

			case "View Low Inventory":
				checkLowInventory();
				break;

			case "Add to Inventory":
				inventoryInquiry();
				break;

			case "Add New Product":
				productInquiry();
				break;
		}
	});
}

function generateTable() {
	connection.query("SELECT * FROM products", function(error, response) {
		if (error) {
			console.log(error);
		}
		else {
			var table = new Table ({head: ["Item ID", "Product", "Department", "Price", "Quantity in Stock"]});

			for (var i  = 0; i < response.length; i++) {
				table.push([response[i].item_id, response[i].product_name, response[i].department_name, "$" + response[i].price, response[i].stock_quantity]);

			}
			console.log(table.toString());
			checkForUpdates();
		}
	});
}

function checkLowInventory() {
	connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(error, response) {
		if (error) {
			console.log(error);
		}
		else {
			var table = new Table ({head: ["Item ID", "Product", "Department", "Price", "Quantity in Stock"]});

			for (var i  = 0; i < response.length; i++) {
				table.push([response[i].item_id, response[i].product_name, response[i].department_name, "$" + response[i].price, response[i].stock_quantity]);

			}
			console.log(table.toString());
			checkForUpdates();
		}
	});
}

function inventoryInquiry() {
	inquirer.prompt([
		{
			name: "Item_Number",
			type: "input",
			message: "Please enter the Item ID of the product you would like to add to"
		},
		{
			name: "Amount",
			type: "input",
			message: "How many would you like to add?"
		}
	]).then(function(response) {
		var productSelected = response.Item_Number;
		var amountSelected = response.Amount;
		restockTransaction(productSelected, amountSelected);
	});
}

function restockTransaction(productSelected, amountSelected) {
	connection.query("SELECT * FROM products WHERE item_id = " + productSelected, function(error, response) {
		if (error) {
			console.log(error);
		}
		else {
			connection.query("UPDATE products SET stock_quantity = stock_quantity + " + amountSelected + " WHERE item_id = " + productSelected);
			checkForUpdates();
		}
	});
}

function productInquiry() {
	inquirer.prompt([
		{
			name: "Name",
            type: "input",
            message: "What is the name of the product you would like to add?"
        },
        {
            name: 'Category',
            type: 'input',
            message: "What category is this product?"
        },
        {
            name: 'Price',
            type: 'input',
            message: "How much does the product cost?"
        },
        {
            name: 'Amount',
            type: 'input',
            message: "How many do you want to add?"
        },
	]).then(function(response) {
		var newName = response.Name;
		var newCategory = response.Category;
		var newPrice = response.Price;
		var newAmount = response.Amount;
		createNewProduct(newName, newCategory, newPrice, newAmount);
	});
}

function createNewProduct(newName, newCategory, newPrice, newAmount) {
	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('" + newName + "', '" + newCategory + "', " + newPrice + ", " + newAmount + ")");
	checkForUpdates();
}

checkForUpdates();
