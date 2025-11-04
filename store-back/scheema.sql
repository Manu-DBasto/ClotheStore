CREATE TABLE users(
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    role VARCHAR (30) NOT NULL DEFAULT "client"
);

CREATE TABLE products(
    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    price FLOAT,
    image VARCHAR(255)
);

CREATE TABLE tags (
    tag_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag VARCHAR(50) NOT NULL
);

CREATE TABLE tag_products (
    tagProducts_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
); 

CREATE TABLE tag_products (  
    tagProducts_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    product_id INT NOT NULL,  
    tag_id INT NOT NULL,  
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,  
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE  
);  
