const express = require('express');
const app = express()
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postsRoutes');
// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route authentification
app.use('/api/auth/', authRoutes);
// routes post
app.use('/api/posts/', postRoutes);

app.get('/', (req,res,next) => {
    res.send('hello there')
})

app.listen(3000)