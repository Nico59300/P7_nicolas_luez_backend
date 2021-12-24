const db = require('../db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

exports.signup = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    db.query(`SELECT email FROM users WHERE email = '${email}'`, (err, result) => {

        if (err) throw err;

        if (result.length > 0) {
            res.status(400).send("email déjà enregistré")
        } else {
            // hashage mot de passe
            bcrypt.hash(password, 10, function(err, hash) {
                // Store hash in your password DB.
                db.query(`INSERT INTO users (\`email\`,\`password\`,\`uuid\`) VALUES ('${email}','${hash}','${uuidv4()}' )`, (err, result) => {
                    if (err) throw err;
                })
            });
            // enregistrement db
            
            res.send("utilisateur enregistré")
        }
    })
}




exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    
    // cherche user en db
    db.query(`SELECT uuid, password FROM users WHERE email = '${email}'`, (err, result) => {
        if (err) throw err;
        console.log(result.length)
        if(result.length == 0) {
            res.status(404).send('utilisateur inconnu')
        }else {
            console.log("result : " + result[0].uuid)
            console.log("result : " + result[0].password)
            // check password
            bcrypt.compare(password, result[0].password).then((valid) => {
                if(!valid) {
                    res.status(400).send('informations éronnées')
                }else {
                    // prepare token for send

                    res.status(200).send({
                        userId: result[0].uuid,
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