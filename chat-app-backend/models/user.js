const mongoose = require('mongoose');



const chatSchema = new mongoose.Schema({
    chatId: String,
    receiverId: String,
    senderId: String
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    chats: {
        type: [chatSchema],
    }
});


const UserModel = mongoose.model('Users',userSchema);



module.exports = UserModel; 













