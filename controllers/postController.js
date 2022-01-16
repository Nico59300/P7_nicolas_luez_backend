const db = require('../db')

exports.getAllPosts = (req, res, next) => {
    db.query('SELECT * FROM posts ORDER BY createdAt DESC', (err, posts) => {
     
        if (posts.length > 0) {
            res.status(200).send(posts)
        } else {
            res.status(404).send({message: "aucuns posts"})
        }
    })
}

exports.getOnePosts = (req, res, next) => {
    
    db.query(`SELECT p.*, u.pseudo  
    FROM posts AS p
    JOIN users AS u ON u.id = p.author_id 
    WHERE p.id = ${req.params.id}`, (err, post) => {
        if(err) throw err;
        console.log("result one post " + JSON.stringify(post))
        if (post) {
            res.status(200).send(post)
        }else {
            res.status(404).send("LE posts que vous demandez n'existe pas")
        }
    })
    
}

exports.createPost = (req, res, next) => {
    console.log("id" + req.params.id)
    let post = req.body
    console.log("post " + JSON.stringify(post))
    db.query(`INSERT INTO posts (\`content\`,\`author_id\`,\`createdAt\`) VALUES ('${post.content}','${post.author_id}' ,'${new Date}')`, (err, post) => {
        console.log(post)
        if(err) throw err;
        res.status(201).send({message: "post créé"})
    })
}

exports.modifyPost = (req, res, next) => {
    console.log(req.body.id)
    let dbpost;
    let post2update;
    db.query(`SELECT * FROM posts WHERE id=${req.body.id}`, async (err, post) => {
        if(err) throw err;
        if (post.length > 0) {
            dbpost = {
                title: post.title,
                content: post.content
            }

        } else {
            res.status(404).send("LE posts que vous demandez n'existe pas")
        }
    })

    console.log(dbpost)
}

exports.deletePost = (req, res, next) => {
  console.log("get1post " + req.params.id)
  db.query(`DELETE FROM posts WHERE id=${req.params.id}`, (err, post) => {
    if(err) throw err;
    res.status(200).send('post supprimé')
})
}

exports.like = (req, res, next) => {
   
}