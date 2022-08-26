// import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { io } from "socket.io-client";
import decode from "../utils/decodeToken"

const axios = require("axios")
const socket = io("http://127.0.0.1:5000")



const Chat = (props) => {
  const utilisateur = useSelector((state) => state)
  const [connected, setConnected] = useState(false)
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const channel = reactLocalStorage.getObject("localisation")?.name
  const [user, setUser] = useState("guest")
  const token = reactLocalStorage.get("token")

  useEffect(() => {
    if (token) {
      setUser(decode.parseJwt(token))
      setConnected(true)
    } else {
      setUser("guest")
      setConnected(false)

    }
  }, [connected])


  function onChat() {
    if (user.pseudo) {

      socket.emit("join", channel, (user.pseudo != "" ? user.pseudo : "guest"))
      socket.on("joined", (canal, client) => {
        props.notif.info(`${client} has joined on channel ${canal}`)
        // setMessages((messages) => [...messages, { pseudo: `SERVER : ${canal}`, text: `${client} has joined on channel ${canal}` }])
      })
    } else {
      props.notif.alert("Connexion néccéssaire avec un pseudo")
    }

  }

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message])
      let scroll = document.querySelector('.messages');
      scroll.scrollTop = scroll.scrollHeight;
    })
    socket.on("canaux", (canaux) => {
      setChannels(canaux)
    })

    socket.on("messages", (msgs) => {
      setMessages(msgs)
      let scroll = document.querySelector('.messages');
      scroll.scrollTop = scroll.scrollHeight;
    })
  }, [socket])


  var send = (e) => {
    e.preventDefault()
    if (messages.length == 0) {
      onChat()
    }
    if (msg) {
      socket.emit("send", msg, socket.id)
      setMsg("")
      console.log(utilisateur)

      document.getElementById('msg').value = ""

    }
  }

  return (
    <div className="chat boxed  is-centered " >
      <div className="columns">
        <div className="column has-text-centered">
          <p className="title has-text-weight-bold has-text-white anirm">Discussion à {channel}</p>
        </div>
      </div>
      <div className="messages  box ">
        {messages.map((item, key) => (
          <div key={key} className="columns ">
            <div className="column">
              <div className="message">
                <article className="message is-dark">
                  <div className="message-header">
                    <p key={key}>{item.pseudo + ' de ' + channel} </p>
                    {/* <p key={key + 10} className='date'>{item.text}</p> */}
                  </div>
                  <div className="message-body box ">
                    {item.text}
                  </div>
                </article>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="column">
        <input id="msg" className="input is-info" type="text" onChange={(e) => (setMsg(e.target.value))} onKeyPress={(e) => { if (e.key == "Enter") { send(e) } }} />
        <button className="button is-info is-outlined" onClick={e => send(e)}> {messages.length == 0 ? "Ouvrir le chat" : "Envoyer"} </button>
      </div>
    </div>
  )
}



export default Chat;