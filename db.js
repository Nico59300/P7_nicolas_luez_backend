const mysql = require('mysql');
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
// initialise connection
const con = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME || process.env.DB_DEMO_NAME,
  user: process.env.DB_USERNAME || process.env.DB_DEMO_USERNAME,
  password: process.env.DB_PASSWORD || process.env.DB_DEMO_PASSWORD
});


// connection a la db
con.connect(function (err) {
  if (err) throw err;
  // appeler fonction pour créer les tables et users
  // on crée les requêtes pour créer les tables si elles n'existent pas
  let createUsers = `create table if not exists users(
        id int primary key auto_increment,
        uuid varchar(50) not null,
        registeredAt varchar(50)  not null,
        pseudo varchar(30) not null,
        email varchar(255)not null,
        password varchar(255) not null,
        role varchar(10) not null,
        avatar varchar(50) not null
      )`;

  let createPosts = `create table if not exists posts(
        id int primary key auto_increment,
        author_id int not null,
        content varchar(255) not null,
        createdAt varchar(50) not null,
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

  
  // on exécute les requêtes pour créer les tables
  con.query(createUsers, function (err, results, fields) {
    if (err) {
      console.log(err.message);
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

  // create admin user in db 
  con.query(`SELECT * FROM users where email="${process.env.ADMIN_EMAIL}"`, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    if(results.length == 0 ) {
      bcrypt.hash(process.env.ADMIN_PASSWORD, 10, function(err, hash) {
        // Store hash in your password DB.
        con.query(`INSERT INTO users (\`email\`,\`password\`,\`uuid\`,\`role\`,\`pseudo\`,\`avatar\`, \`registeredAt\`) 
                  VALUES ('${process.env.ADMIN_EMAIL}','${hash}','${uuidv4()}','admin', 'admin', 'default', '${new Date}' )`, function (err, results,fileds) {
          if (err) {
            console.log(err.message);
          }
        })
    });
    } 
  });

  console.log("Connected to mysql!");
})




module.exports = con;
