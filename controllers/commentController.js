const db = require('../db')

exports.getComments = (req, res, next) => {
    console.log("getComments" + req.params.id)
    db.query(`SELECT * FROM comments WHERE post_id = ${req.params.id} ORDER BY id DESC`, (err, comments) => {
        console.log("get comment back "+ JSON.stringify(comments))
        if(comments ) {
            res.status(200).send(comments)
        }else {
            res.status(404).send({message: 'aucun commentaire'})
        }
    })
}

exports.createComment = (req, res, next) => {
    console.log("create comment")
    console.log(req.body)
    db.query(`INSERT INTO comments (\`textcontent\`,\`author_id\`,\`post_id\`) VALUES ('${req.body.com}','${req.body.authorId}' ,'${req.body.postId}')`, (err, post) => {
        console.log(JSON.stringify(post))
        if(err) throw err;
        res.status(201).send({message: "post créé"})
    })
}

exports.deleteComment = (req, res, next) => {
    console.log("delete comment")
    //console.log("body"+JSON.stringify(req.body))
    console.log('auth '+ req.params.id)
    db.query(`SELECT uuid FROM users WHERE id = ${req.body.authorId}`, (err , result) => {
        if(err) throw err;
        console.log('result '+JSON.stringify(result[0].uuid))
        if(result[0].uuid == req.auth.userId) {
            db.query(`DELETE from comments WHERE id = ${req.params.id}`, (err, result) => {
                console.log("result delete "+ JSON.stringify(result))
                res.status(200).send({message: "commentaire supprimé"})
            })
        }else {
            console.log("not match")
            console.log()
        }
    })
    //console.log(JSON.stringify(req.auth))
    /*db.query(`SELECT uuid FROM users WHERE uuid = ${req.auth.userId}`, (err, result)=> {
        console.log(JSON.stringify(result))
    })*/
    
}
