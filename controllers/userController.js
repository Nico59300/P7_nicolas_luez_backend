const db = require('../db');

exports.getAllUsers = (req,res,next) => {
    db.query(`SELECT * FROM users ORDER BY registeredAt DESC`, (err, result) => {
        if(err) throw err
        if(result.length > 0) {
            res.status(200).send(result)
        }else {
            res.status(404).send({message: "aucun utilisateur"})
        }
    })
}

exports.getUser = (req,res,next) => {
    db.query(`SELECT * FROM users WHERE id = '${req.params.id}'`, (err, result) => {
        if(err) throw err
            //console.log("backend users " + result.data)
        res.status(200).send(result[0])
    })
}

exports.getLastUsers = (req,res,next) => {
    console.log('toto')
    db.query(`SELECT uuid, pseudo, role, avatar FROM users ORDER BY id DESC LIMIT 5`, (err, result) => {
        if(err) throw err
        //console.log("last users " + JSON.stringify(result))
        res.status(200).send(result)
    })   
}