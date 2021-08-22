import Message from "../models/message.js";
import User from "../models/user.js";
import fetch from 'node-fetch'

const sendPushNotification = async (pushToken, body, title) => {
  const params = {
    to: pushToken,
    notification: {
      body: body,
      title: title,
      content_available: true,
      priority: "high",
    },
  };
  var postData = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "key=AAAAmgaDIzA:APA91bH14pOkOgWFtL59z365Al9uL0NFZRdr4_9YycgC_DtCJQS8Hrjqszqh_KoWxdDMC5GWM0LHe_sxRchCT5xFKY8pgH-S1kRlKJ4PDiOXaATV-e46LdFTl_xrY44L2C4UUHv5KLj7",
    },
    body: JSON.stringify(params),
  };
  await fetch("https://fcm.googleapis.com/fcm/send", postData);
};

export const getAllMessages = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id).populate("messages");
  res.status(200).json({ messages: user.messages });
};

export const sendMessage = async (req, res) => {
  const { ids, content } = req.body;
  ids.map(async (id) => {
    const user = await User.findById(id);
    const message = await Message.create({ user, content });
    await User.findByIdAndUpdate(id, { $push: { messages: message } });
    if(user.pushToken) {
      sendPushNotification(user.pushToken,"You've got a new message, please refresh the page to check", "New message")
    }
  });
};
