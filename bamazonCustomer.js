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
			purchaseInquiry();
		}
	});
}

function purchaseInquiry() {
	inquirer.prompt([
		{
			name: "Item_Number",
			type: "input",
			message: "Please enter the Item ID of the product you would like to purchase"
		},
		{
			name: "Amount",
			type: "input",
			message: "How many would you like to buy?"
		}
	]).then(function(response) {
		var productSelected = response.Item_Number;
		var amountSelected = response.Amount;
		purchaseTransaction(productSelected, amountSelected);
	});
}

function purchaseTransaction(productSelected, amountSelected) {
	connection.query("SELECT * FROM products WHERE item_id = " + productSelected, function(error, response) {
		if (error) {
			console.log(error);
		}

		else if (amountSelected <= response[0].stock_quantity) {
			var transactionCost = response[0].price * amountSelected;

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amountSelected + " WHERE item_id = " + productSelected);

			console.log("Thanks for shopping with us! Your total is $" + transactionCost.toFixed(2));
			keepShopping();
		}
		else {
			console.log("Don't be so greedy! We don't even have that many " + response[0].product_name + "! Please select a different amount.");
			keepShopping();
		};
		
	});

};

function keepShopping() {

	inquirer.prompt([
			{
				name: "keepShopping",
				type: "list",
				message: "Would you like to make another transaction?",
				choices: ["Yes", "No"]
			}
	]).then(function(response) {
		switch (response.keepShopping) {
			case "Yes":
				generateTable();
				break;
			case "No":
				console.log("Thanks for stopping by! Please shop with us again!");
				break;
		}		
	});
};

generateTable();