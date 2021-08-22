const UserModel = require('../models/user');



exports.getUsers = async (req,res) => {
    const users = await UserModel.find();
    res.json(users);
}

exports.createrChatPartner = async (req,res) => {
    const isExistUser = await UserModel.findOne({...req.body});

    if(isExistUser)
        return res.status(400).json('chat partner already exist');

    const chats = await ChatModel.find();
    const newChat = await ChatModel.create();

    const user = await UserModel.create({...req.body,chats: [...newChat]});
    // const addedReceiverId = await UserModel.updateOne(...user,{$set: })
    res.json(user);
}










































