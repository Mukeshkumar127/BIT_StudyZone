import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import serverUrl from "../../config";
import { Link, useNavigate } from "react-router-dom";

// const socket = io(serverUrl);
const socket = io(serverUrl, {
  withCredentials: true,
  transports: ["websocket"],
});

const Chat = () => {
  const user = JSON.parse(localStorage.getItem("Users"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const theme = localStorage.getItem("theme");

  useEffect(() => {
    if (!token || !user) {
      navigate("/signup");
    } else {
      setCheckingAuth(false);
    }
  }, [token, user, navigate]);

  useEffect(() => {
    if (!token || !user) return;
    fetch(`${serverUrl}/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [token, user]);

  if (checkingAuth) {
    return null; // no flash, no error
  }

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      message: text,
      sender: user._id,
      senderName: user.fullname,
    });

    setText("");
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-100"
      }`}
    >
      <div className="p-4 text-xl font-bold text-center bg-pink-500 text-white">
        💬 Doubt Discussion - BIT StudyZone
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xl ${
              msg.sender === user._id
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white text-black"
            }`}
          >
            <p className="text-sm font-semibold">{msg.senderName}</p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="p-4 flex gap-2 border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask your doubt..."
          className={`flex-1 p-2 border rounded ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        />

        <button
          onClick={sendMessage}
          className="bg-pink-500 text-white px-4 rounded"
        >
          Send
        </button>
        <Link to="/">
          <button className="bottom-6 right-6 z-50 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Chat;