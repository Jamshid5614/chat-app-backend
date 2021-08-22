const ChatModel = require('../models/chat');
const UserModel = require('../models/user');

exports.createChat = async (req,res) => {
    const chats = await ChatModel.find();
    const chat = await ChatModel.create({
        ...req.body,
    });
    res.json(chat);
}

exports.getChat = async (req,res) => {
    const {senderId} = req.query;
    const userChat = await ChatModel.findOne({$set: {chats: {senderId}}});

    // const myChat = chats.map(item => {
    //     item.messages.map(item => {
    //         if(item.senderId == senderId) {
    //             myMessages.push(item);
    //         } else {

    //         }
    //     })
    // });

    // const myChat2 = chats.map(item => {
    //     item.messages.map(item => {
    //         if(item.receiverId == senderId) {
    //             myMessages.push(item);
    //         } else {

    //         }
    //     })
    // });

    if(!userChat) 
        return res.json([]);

    res.json(userChat);

}

exports.updateChat = async (req,res) => {
    const {myId,chatId,message,receiverId} = req.body;

    const chat = await ChatModel.updateOne({ _id: chatId }, { $set: {messages: {senderId: myId,message,actionType: 'send',receiverId}}}/* messages: [{},{},{}]*/);
    res.json(chat);
}

exports.getChats = async (req,res) => {
    const chats = await ChatModel.find();
    res.json(chats);
}





























