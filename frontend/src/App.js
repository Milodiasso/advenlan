import './App.css';
import Start from "./Component/Start"
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Component/Home/Home';
import Quest from './Component/Quest/Quest';
import Profil from './Component/Profil/Profil';
import AWN from "awesome-notifications"
import Login from './Component/Login/Login';
import Registration from './Component/Login/Registration';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import axios from 'axios';


function App() {
  const notif = new AWN();
  const { token, setToken } = useToken()
  window.myApi = "http://localhost:3500"



  return (
    <div className="App">
      <div className="columns ">
        <div className="column has-text-centered">
          <a href="/"><p className="title is-big celt m-5">ADVENLAN</p></a>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Start notif={notif} />} />
          <Route path="/home" exact element={<Home setToken={setToken} token={token} notif={notif} />} />
          <Route path="/profil" exact element={<Profil token={token} notif={notif} />} />
          <Route path="/quest" exact element={<Quest token={token} />} />
          <Route path="/login" exact element={<Login notif={notif} />} />
          <Route path="/registration" exact element={<Registration notif={notif} />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
