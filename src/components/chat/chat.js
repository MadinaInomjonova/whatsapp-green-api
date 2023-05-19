import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  Call,
  InsertEmoticon,
  Search,
  Send,
  Videocam,
} from "@mui/icons-material";
import "./chat.css";

const Chat = ({ rooms }) => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  // Get data from localStorage

  const getData = JSON.parse(localStorage.getItem("dataKey"));

  // Random Avatar image

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  // Send message using http request

  const sendMessage = async (e) => {
    e.preventDefault();

    const post = {
      chatId: `${roomId}@c.us`,
      message: input,
    };

    setInput("");

    try {
      const res = await axios.post(
        `https://api.green-api.com/waInstance${getData.id}/SendMessage/${getData.token}`,
        post
      );

      fetch("https://whatsapp-green-api.vercel.app/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: res?.config?.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // Get received messages

  useEffect(() => {
    async function getReceivedMessages() {
      try {
        const res = await axios
          .get(
            `https://api.green-api.com/waInstance${getData.id}/ReceiveNotification/${getData.token}`
          )
          .then((res) => res)
          .catch((err) => console.log(err.message));

        await fetch("https://whatsapp-green-api.vercel.app/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "received",
            idMessage: res?.data?.body?.idMessage,
            message: res?.data?.body?.messageData?.textMessageData?.textMessage,
            chatId: res?.data?.body?.senderData?.chatId,
            sender: res?.data?.body?.senderData?.chatName,
          }),
        }).then((res) => res);
      } catch (err) {
        console.log(err.message);
      }
    }
    getReceivedMessages();
  }, []);

  // Get All Messages from json-server

  useEffect(() => {
    fetch("https://whatsapp-green-api.vercel.app/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.log(err.message));
  });

  // Remove Duplicates from messages array

  const result = messages.reduce((accumulator, current) => {
    let exists = accumulator.find((item) => {
      return item.idMessage === current.idMessage;
    });
    if (!exists) {
      accumulator = accumulator.concat(current);
    }
    return accumulator;
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          {rooms?.map((room) => {
            if (room.id === roomId)
              return (
                <p key={room.id} className="username">
                  {room.name}
                </p>
              );
          })}
          <p>Last seen at ...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <Videocam />
          </IconButton>
          <IconButton>
            <Call />
          </IconButton>
          <IconButton className="search__icon">
            <Search />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {result?.map((message) => {
          if (`${roomId}@c.us` === message?.chatId) {
            return (
              <p
                key={message?.id}
                className={`chat__message ${
                  !message?.type && "chat__reciever"
                }`}
              >
                {message?.message}{" "}
                <span className="chat__timestamp">3:53pm</span>
              </p>
            );
          } else return null;
        })}
      </div>

      <div className="chat__footer">
        <div className="chat__footerIcon">
          <InsertEmoticon />
          <AttachFile />
        </div>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
