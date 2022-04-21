import React, { useState, useEffect} from 'react';
import './App.css';
import {io} from 'socket.io-client'
import GameComponent from "./components/GameComponent";


const socket = io('https://serene-sierra-90602.herokuapp.com/')

let gameactive = false;
let query = window.location.search.substring(1);
let id = query.split("=")[1];
let player = 0;

if (typeof id !== 'undefined'){
  gameactive = true;
  player = 2;
  socket.emit('reqgame', id);
}
else {
  player = 1;
}

function App() {
  const [gameid, setGameId] = useState();
  const [startgame, setStartGame] = useState(gameactive);
  console.log(gameactive);

  useEffect(() => {
    socket.on('recvgame', message => {
      setStartGame(true);
    })

    socket.on('connect', () => {
      if (typeof id !== 'undefined'){
        setGameId(id);
        return;
      }
      setGameId(socket.id);
      })

  }, [socket])
  
  

  return (
    <div className="App">
      <header className="App-header">
      {startgame ? (<GameComponent socket={socket} player={player}/>) : (<p>Your game URL is: https://mancala.quest/?id={gameid}</p>)}
      </header>
    </div>
  );
}

export default App;
