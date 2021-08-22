const mongoose = require('mongoose');



const messagesSchema = new mongoose.Schema({
    actionType: {
        type: String,
        enum: ["send","receive"]
    },
    senderId: String,
    receiverId: String,
    message: String
})

const chatSchema = new mongoose.Schema({
    actionType: {
        type: String,
        enum: ['sender','receiver']
    },
    chatId: String,
    messages: {
        type: [messagesSchema]
    }
});


const ChatModel = mongoose.model('Chats',chatSchema);

module.exports = ChatModel;













