import { useState } from "react";

import "./create-chat.css";

const CreateChat = (props) => {
  const [state, setState] = useState({
    name: "",
    id: "",
  });

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const addNewChat = (e) => {
    e.preventDefault();
    props.addNewChat(state.name, state.id);
    setState({ name: "", id: "" });
  };

  return (
    <div className="create__chatWrapper">
      <form className="create__chat">
        <p>Create new chat</p>
        <input
          type="text"
          name="name"
          value={state.name}
          placeholder="Name"
          onChange={inputHandler}
        />
        <input
          type="text"
          name="id"
          value={state.id}
          placeholder="Phone number"
          onChange={inputHandler}
        />
        <button type="submit" onClick={addNewChat}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateChat;
