const db = require('../db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

exports.signup = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let pseudo = req.body.pseudo;

    db.query(`SELECT email FROM users WHERE email = '${email}'`, (err, result) => {

        if (err) throw err;

        if (result.length > 0) {
            res.status(400).send({message: "email déjà enregistré"})
        } else {
            // hashage mot de passe
            bcrypt.hash(password, 10, function(err, hash) {
                // save user in db.
                db.query(`INSERT INTO users (\`email\`,\`password\`,\`uuid\`,\`role\`,\`pseudo\`,\`avatar\`,\`registeredAt\`) 
                          VALUES ('${email}','${hash}','${uuidv4()}','${"member"}','${pseudo}','default', '${new Date}' )`, (err, result) => {
                    if (err) throw err;
                })
            });
            // enregistrement db
            
            res.status(201).send({message: "compte utilisateur créé"})
        }
    })
}




exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    
    // cherche user en db
    db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
        if (err) throw err;

        if(result.length == 0) {
            res.status(404).send({message: 'email inconnu'})
        }else {
            // check password
            bcrypt.compare(password, result[0].password).then((valid) => {
                if(!valid) {
                    res.status(400).send({message: 'informations éronnées'})
                }else {
                    // prepare token for send
                    res.status(200).send({
                        user: result[0],
                        message: "connecté",
                        token: jwt.sign(
                            { userId: result[0].uuid },
                            process.env.JWT_SECRET || 'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    })
                }
            })
        }

    })
}