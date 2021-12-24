const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/postController');

router.post('/', postCtrl.createPost );
router.put('/:id', postCtrl.modifyPost );
router.delete('/:id', postCtrl.deletePost )
router.post('/:id/like', postCtrl.like)
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePosts);

module.exports = router;