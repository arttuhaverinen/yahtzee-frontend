import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io, { Socket } from "socket.io-client";

const OnlineMenu = ({ roomName, setRoomName, username, setUsername, socket, setSocket }) => {
  const [showOnlineMenuTips, setShowOnlineMenuTips] = useState(true);

  let baseurl = "";
  console.log(process.env.REACT_APP_ENV);

  if (process.env.REACT_APP_ENV === "production") {
    baseurl = process.env.REACT_APP_BASE_URL_PRODUCTION;
  } else {
    baseurl = process.env.REACT_APP_BASE_URL_DEVELOPMENT;
  }

  console.log(baseurl);

  const [gameReady, setGameReady] = useState(false);

  fetch(`${baseurl}/test`) //"https://arttuhaverinen.dev/yahtzee/test"
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  useEffect(() => {
    if (socket !== null) {
      socket.on("readyToStartGame", () => {
        setGameReady(true);
      });
    }
  }, [socket]);

  const handleRoomName = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleJoinOnline = (e, roomName, username, socket) => {
    e.preventDefault();

    if (socket == null) {
      const getSocket = io.connect(baseurl);
      setSocket(getSocket);
      getSocket.emit("join", "im joining room", roomName, username);
    }
  };

  const greetings = () => {
    const getSocket = io.connect(baseurl);
    setSocket(getSocket);
    getSocket.emit("join", "im joining room", roomName);
  };

  const handleGameReadyButton = () => {
    if (gameReady && socket) return <Link to="/mp-game">Start game</Link>;
    else if (socket) return <h1>Waiting for opponent...</h1>;
    else return <h1 className="h1-hidden">Waiting for opponent</h1>;
  };

  return (
    <div className="container div-main-menu">
      <div className="div-join-online-form">
        <div className="div-labels">
          <div>
            <label htmlFor="">
              <h3>Username:</h3>
            </label>
            <input className="input-join-online" onChange={(e) => handleUsername(e)} type="text" />
          </div>
          <div>
            <h3>Room name:</h3>
            <input className="input-join-online" onChange={(e) => handleRoomName(e)} type="text" />
          </div>
        </div>
        <Link onClick={(e) => handleJoinOnline(e, roomName, username, socket)} to="/searching-menu">
          Join room
        </Link>
        <Link className="" to="/">
          Return to main menu
        </Link>
        {handleGameReadyButton()}
      </div>
      {showOnlineMenuTips && (
        <div className="div-online-menu-advice">
          <div>
            <h4>Tips:</h4>
            <button onClick={() => setShowOnlineMenuTips(!showOnlineMenuTips)}>X</button>
          </div>
          <br />
          <li>To join a game you need to give yourself a username.</li>
          <br />
          <li>If you give a room name you will be matched against the opponent who gave the same room name</li>
          <li>If you leave the room field empty you will be matched against a random opponent if possible</li>
          <br />
          <li>If you just want to test the multiplayer mode, you can open two browser windows and play against yourself.</li>
        </div>
      )}
    </div>
  );
};

export default OnlineMenu;
