const mysql = require('mysql');
require('dotenv').config()

// initialise connection
const con = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME || "groupomania",
  user: process.env.DB_USERNAME || "adminMania",
  password: process.env.DB_PASSWORD || "adminMania59"
});


// connection a la db
con.connect(function (err) {
  if (err) throw err;
  // on crée les requêtes pour créer les tables si elles n'existent pas
  let createUsers = `create table if not exists users(
        id int primary key auto_increment,
        uuid varchar(255) not null,
        email varchar(255)not null,
        password varchar(255) not null
      )`;

  let createPosts = `create table if not exists posts(
        id int primary key auto_increment,
        author_id int not null,
        title varchar(255)not null,
        content varchar(255)not null,
        FOREIGN KEY (author_id) REFERENCES users (id)
      )`;

  let createComments = `create table if not exists comments(
        id int primary key auto_increment,
        author_id int not null,
        post_id int not null,
        textcontent varchar(255)not null,
        FOREIGN KEY (author_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
      )`;
  // on exécute les requêtes
  con.query(createUsers, function (err, results, fields) {
    if (err) {
      console.log(err.message);
      console.log(results)
    }
  });

  con.query(createPosts, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  con.query(createComments, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  
  console.log("Connected to mysql!");
});




module.exports = con;
