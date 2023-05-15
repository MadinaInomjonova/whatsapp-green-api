import { Routes, Route } from "react-router-dom";

import { Chat, Login, Sidebar, Signup } from "../";

import "./app.css";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

const App = () => {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth.uid,
        email: userAuth.email,
      };
      if (userAuth) {
        console.log(user);
        setUser(user);
      } else setUser(null);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="app">
      {!user ? (
        <div className="login">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      ) : (
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chat />} />

            <Route path="/rooms/:roomId" element={<Chat user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
