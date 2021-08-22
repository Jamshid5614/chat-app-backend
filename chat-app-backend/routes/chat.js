const express = require('express');
const router = express.Router();
const {createChat,getChat,getChats,updateChat} = require('../controllers/chat');

router.post('/chat/new', createChat);
router.get('/chat', getChat); // query: senderId 
router.patch('/chat', updateChat); // body: myId,chat._id,message,receiverId
router.get('/chats', getChats); 

module.exports = router;