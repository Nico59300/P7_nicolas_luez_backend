const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/commentController');

router.post('/', commentCtrl.createComment );
//router.put('/:id', commentCtrl.modifyComment );
router.delete('/:id', commentCtrl.deleteComment )
router.get('/:id', commentCtrl.getComments);

module.exports = router;