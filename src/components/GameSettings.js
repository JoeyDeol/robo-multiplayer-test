import { useState } from 'react';
import { Link } from 'react-router-dom';

// Component Imports
import PlayerDisplay from './PlayerDisplay.js';

function GameSettings(props) {
  // Application State
  const [playerInfo, setPlayerInfo] = useState([]);
  const [playerNumber, setPlayerNumber] = useState(0);

  // Input/Select State
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [playerNumberSelect, setPlayerNumberSelect] = useState(0);

  // Handler Functions associated with Game Settings
  const handlePlayerNumberSelect = (event) => {
    // We have to use parseInt here because the value coming from the select element is a string and we are converting it to a number.
    const numberOfPlayers = parseInt(event.target.value);
    setPlayerNumberSelect(numberOfPlayers);
  }

  const handleGameSettingsSubmit = (event) => {
    event.preventDefault();
    setPlayerNumber(playerNumberSelect);
  }

  // Handler Functions associated with Player Creation
  const handlePlayerNameInput = (event) => {
    setPlayerNameInput(event.target.value);
  }
 
  const handleCreateNewPlayerSubmit = (event) => {
    event.preventDefault();

    const newPlayerInfo = [
      ...playerInfo,
      {
        name: playerNameInput,
        score: 0,
      }
    ];

    // Checking to see if our amount of total players (known by the length of the newPlayerInfo array) is less than our
    // max number of players before setting things into state.
    if (newPlayerInfo.length <= playerNumber) {
      setPlayerInfo(newPlayerInfo);
      setPlayerNameInput('');
      props.updateAppPlayerInfo(newPlayerInfo);
    } else {
      // I wouldn't usually leave this as a an alert, I would probably write some logic that switches a state variable
      // that I would be using to conditionally render (think back to ternary expressions in JSX) a p tag that would have
      // this message be displayed onto the page for users to see.. 
      alert('Maximum Players Reached!')
    }

  }

  return (
    <div>
      {/* This form is used to collect the maximum number of players in the game */}
      <form onSubmit={handleGameSettingsSubmit}>
        <label htmlFor="playerNumberSelect">Number of Players:</label>
        <select name="playerNumber" id="playerNumberSelect" onChange={handlePlayerNumberSelect}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button type="submit">Set Number of Players</button>
      </form>


      {/* This form is used to collect a player name, and when submitted it creates a new player object to add to my playerInfo state variable */}
      <form onSubmit={handleCreateNewPlayerSubmit}>
        <label htmlFor="playerNameInput">Player Name:</label>
        <input type="text" id="playerNameInput" value={playerNameInput} onChange={handlePlayerNameInput} />
        <button type="submit">Add Player</button>
      </form>

      <PlayerDisplay allPlayers={playerInfo} />

      <Link to='/game'>Start Game!</Link>
    </div>
  )
}

export default GameSettings;
