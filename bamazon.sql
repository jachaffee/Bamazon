DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Frosty Chocolate Milk Shakes", "Food and Beverage", 5.00, 150);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Googly Eyes", "Arts and Crafts", 1.50, 10000);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Golden Retrievers", "Pets", 800, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Craft IPAs", "Food and Beverage", 4.50, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Water Polo Balls", "Sporting Goods", 39.95, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Kitten Mittons", "Pets", 14.95, 1);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Lightspeed Briefs", "Clothing", 30, 250);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Fizzing Whizzbees", "Food and Beverage", 2.25, 400);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Elephants", "Pets", 5000000, 1);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Lee Carvallo's Putting Challenge", "Entertainment", 59.99, 1000);
