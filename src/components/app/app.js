import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import { Chat, CreateChat, Login, Sidebar } from "../";

import "./app.css";

const App = () => {
  const [state, setState] = useState({ id: "", token: "" });
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // User Login Function

  const signIn = async (e) => {
    e.preventDefault();

    try {
      await axios.get(
        `https://api.green-api.com/waInstance${state.id}/SetSettings/${state.token}`
      );
      let getData = {
        id: state.id,
        token: state.token,
      };
      localStorage.setItem("dataKey", JSON.stringify(getData));
    } catch (err) {
      console.log(err.message);
    }

    setState({ id: "", token: "" });
  };

  // Getting data from db

  useEffect(() => {
    fetch("https://whatsapp-clone-green-api.vercel.app/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.log(err.message));
  }, []);

  // Adding new Chat

  const addNewChat = (name, id) => {
    fetch("https://whatsapp-clone-green-api.vercel.app/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        id,
      }),
    })
      .then(() => navigate("/"))
      .catch((err) => console.log(err.message));
  };

  // Getting token
  const token = JSON.parse(localStorage.getItem("dataKey"));

  return (
    <div className="app">
      {!token?.token ? (
        <div className="login">
          <Login state={state} setState={setState} signIn={signIn} />
        </div>
      ) : (
        <div className="app__body">
          <Sidebar rooms={rooms} />
          <Routes>
            <Route path="/" element={<Chat rooms={rooms} />} />

            <Route path="/rooms/:roomId" element={<Chat rooms={rooms} />} />

            <Route
              path="/create"
              element={<CreateChat addNewChat={addNewChat} />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
