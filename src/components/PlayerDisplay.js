function PlayerDisplay(props) {
  return (
    <div>
      <h2>Players</h2>
      <p>Number of Players: {props.allPlayers.length}</p>
      <div className="player-container">
        {props.allPlayers.map((player) => {
          return(
            <div key={player.name}>
              <h3>{player.name}</h3>
              <p>Score: {player.score}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerDisplay;
