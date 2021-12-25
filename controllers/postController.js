const db = require('../db')

exports.getAllPosts = (req, res, next) => {
    db.query('SELECT * FROM posts', (err, posts) => {
        console.log(posts)
        if (posts.length > 0) {
            console.log(posts)
            res.status(200).send(posts)
        } else {
            res.status(404).send("aucuns posts")
        }
    })
}

exports.getOnePosts = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE id=${req.params.id}`, (err, post) => {
        
        if (post[0]) {
            let post2send = {
                postId: post[0].id,
                author_id: post[0].author_id,
                title: post[0].title,
                content: post[0].content
            }
            console.log(post2send)
            res.status(200).send(post2send)
        } else {
            res.status(404).send("LE posts que vous demandez n'existe pas")
        }

    })
}

exports.createPost = (req, res, next) => {
    console.log(req.body)
    db.query(`INSERT INTO posts (\`title\`,\`content\`,\`author_id\`) VALUES ('${req.body.title}','${req.body.content}','${req.body.author_id}' )`, (err, post) => {
        if(err) throw err;
        console.log(post)
        res.status(201).send("post créé")
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
  
}

exports.like = (req, res, next) => {
   
}