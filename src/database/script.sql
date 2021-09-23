CREATE DATABASE fake_instagram;

CREATE TABLE fake_instagram.users (
	id int(10) PRIMARY KEY auto_increment,
	name varchar(200),
	email varchar(200),
	password varchar(200),
	create_at TIMESTAMP  
);