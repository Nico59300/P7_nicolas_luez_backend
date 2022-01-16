const express = require('express');
const app = express()
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const userRoutes = require('./routes/userRoutes');
const verifToken = require('./middlewares/verif-auth')
// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(__dirname + '/images'));

// route authentification
app.use('/api/auth/', authRoutes);
// routes post
app.use('/api/posts/', verifToken, postRoutes);
// routes comment
app.use('/api/comments/', verifToken, commentsRoutes);
// routes user
app.use('/api/users/', verifToken, userRoutes);

app.listen(3000)