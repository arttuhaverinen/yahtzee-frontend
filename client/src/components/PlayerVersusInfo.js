const PlayerVersusInfo = ({ username, opponentUsername, multiplayerPlayer1, multiplayerPlayer2, turn }) => {
  const checkWhoseTurn = () => {
    if (multiplayerPlayer1 && turn === 1) {
      return username;
    }
    if (multiplayerPlayer1 && turn === 2) {
      return opponentUsername;
    }
    if (multiplayerPlayer2 && turn === 1) {
      return opponentUsername;
    }
    if (multiplayerPlayer2 && turn === 2) {
      return username;
    }
  };

  return (
    <div className="div-playerinfo">
      {username && opponentUsername ? (
        <>
          <h1>{multiplayerPlayer1 ? username : opponentUsername}</h1>
          <h1>Vs</h1>
          <h1>{multiplayerPlayer2 ? username : opponentUsername}</h1>
          <h1 className="h1-left">{checkWhoseTurn() + "'s turn"}</h1>
        </>
      ) : (
        <>
          {console.log("turn", turn)}
          {turn === 1 ? (
            <>
              <h1>
                <u>Player 1</u>
              </h1>
              <h1>Vs</h1>
              <h1>Player2</h1>
            </>
          ) : (
            <>
              <h1>Player 1</h1>
              <h1>Vs</h1>
              <h1>
                {" "}
                <u>Player2</u>
              </h1>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PlayerVersusInfo;
