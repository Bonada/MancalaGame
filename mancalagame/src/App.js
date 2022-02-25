import React, { useState } from 'react';
import './App.css';
import {io} from 'socket.io-client'
import URLView from "./components/URLView";


const socket = io('https://serene-sierra-90602.herokuapp.com/')

let gameactive = false;
let query = window.location.search.substring(1);
let id = query.split("=")[1];

if (typeof id !== 'undefined'){
  gameactive = true;
  socket.emit('reqgame', id);
}

socket.on('recvgame', message => {
  gameactive = true;
  console.log(message);
})

function App() {
  const [gameid, setGameId] = useState(0);
  socket.on('connect', () => {setGameId(socket.id)});

  return (
    <div className="App">
      <header className="App-header">
      {gameactive ? (null) : <p>Your game URL is: https://mancala.quest?id={gameid}</p>}
         
      </header>
    </div>
  );
}

export default App;
