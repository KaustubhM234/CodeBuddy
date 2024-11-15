import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose, IoMdSend, IoMdChatbubbles } from "react-icons/io";

import "./ChatBot.css";

const ChatBot = () => {
  useEffect(() => {
    const open = document.getElementById("open-button");
    const window = document.getElementById("chatbot-window");
    const close = document.getElementById("close-button");
    

    open.addEventListener("click", () => {
      window.classList.remove("display-none");
      open.classList.add("display-none");
    });

    close.addEventListener("click", () => {
      window.classList.add("display-none");
      open.classList.remove("display-none");
    });
  }, []);
  const [prompt,setPrompt]=useState('');

  const submitHandle = async (e) => {
    e.preventDefault();

    const sent = document.createElement("div");
    const reply = document.createElement("div");
    const chatWindow = document.getElementById("chat-window");

    const input = document.getElementById("user-input");

    chatWindow.appendChild(sent);
    sent.innerHTML = prompt;
    sent.classList.add("user-message");
    input.value = "";

    try {
      const response = await axios.post("http://localhost:5000/ask", {
      question:prompt
      });
      const answer = (response.data.answer);
      reply.innerHTML = answer;
    } catch (err) {
      console.log(err);
    }
    chatWindow.appendChild(reply);
    reply.classList.add("bot-message");
  };
  
  return (
    <div className="chatbot1">
      <div className="chatbot-window display-none" id="chatbot-window">
        <div className="cb-heading">
          <span>Chatbot</span>
          <IoMdClose
            id="close-button"
            style={{ fontSize: "28px", cursor: "pointer" }}
            onClick={() => {
              const window = document.getElementById("chatbot-window");
              window.classList.add("display-none");
              const open = document.getElementById("open-button");
              open.classList.remove("display-none");
            }}
          />
        </div>
        <div className="chat-window" id="chat-window"></div>
        <div className="chat-input">
          <form autoComplete="false" onSubmit={submitHandle} id="chatbot-form">
            <input placeholder="enter query" id="user-input" type="text" value={prompt} onChange={ (e)=> {setPrompt(e.target.value)}}/>
            <div className="icon-box" onClick={submitHandle}>
              <IoMdSend style={{ fontSize: "20px", color: 'white' }} />
            </div>
          </form>
        </div>
      </div>
      <div className="button-wrapper" id="open-button">
        <div className="open-button">
          <IoMdChatbubbles style={{ fontSize: "30px" }} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;