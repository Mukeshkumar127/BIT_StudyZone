import Chat from "../model/chat.model.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
