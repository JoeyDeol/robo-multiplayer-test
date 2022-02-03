import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom'; 

// Component Imports
import PlayerDisplay from './PlayerDisplay.js';

function GameDisplay(props) {
  // I am using a turnPlayer state variable to track the current player turn. 
  // The reason it has a default of zero is because I know that array's start at 0,
  // So I am aligning this state variable's value to with indices of my appPlayerInfo array.
  const [turnPlayer, setTurnPlayer] = useState(0);

  const checkSelection = (event) => {
    // Logic to check the user selection. This is super basic for the current example,
    // but this can be expanded upon with more state variables that depend on more
    // complex data.
    if (event.target.value === 'polar bear') {
      // Here I am creating local variables that will pull out the appPlayerInfo
      // from props and allow me to make updates and changes in steps before I
      // pass the updated into to my updateAppPlayerInfo function.

      // allPlayerInfo is meant to be a local copy of props.appPlayerInfo, which I
      // am going to use locally to make updates/changes to my playerInfo.
      const allPlayerInfo = props.appPlayerInfo;
      
      // The currentPlayerInfo variable is going to have one of my player objects
      // from the appPLayerInfo array. 
      // Example props.appPlayerInfo[0] will be the first player object from the array.
      // When the turnPlayer state variable changes, the currentPlayerInfo will change
      // to the player object at each particular index.
      const currentPlayerInfo = allPlayerInfo[turnPlayer];
      
      // Updating the score on the currentPlayerInfo because they got the answer correct!
      currentPlayerInfo.score = currentPlayerInfo.score + 1;

      // Updating in the allPlayerInfo array with the next currentPlayer score.
      // Again using the turnPlayer state variable to access the allPlayerInfo array
      // so I can assign the currentPlayerInfo object into the same index I was getting
      // original player object from, effectively updating the correct player info with a new score.
      allPlayerInfo[turnPlayer] = currentPlayerInfo;

      // Calling the updateAppPlayerInfo function here with our recently updated
      // allPlayerInfo variable so that the state variables I have in App.js can be updated
      // and all the parts of my app that use that info will have the latest playerInfo.
      // We make this move that we can share the data with future components if I need to.
      props.updateAppPlayerInfo(allPlayerInfo);
    }


    // Logic to change the turnPlayer state variable. 
    // The if statement is checking to see when I've reached the end of appPlayerInfo
    // array and if I have then I set the turnPlayer state variable back to 0.
    // Remember the length property of an array gives us the total number of elements
    // in an array, so the reason why I add + 1 to turnPlayer in the conditional check is
    // because turnPlayer is starting at 0, so I need to add 1 to be able to compare an accurate
    // value to the end of my array.
    if (props.appPlayerInfo.length === (turnPlayer + 1)) {
      setTurnPlayer(0);
    } else {
      setTurnPlayer(turnPlayer + 1);
    }
  }

  return (
    <div>
      {
        props.appPlayerInfo.length ?
          <Fragment>
            <PlayerDisplay allPlayers={props.appPlayerInfo} />
            <h2>What's the Best Animal Ever?</h2>
            <h3>It's {props.appPlayerInfo[turnPlayer].name}'s turn!</h3>
            <ul>
              <li><button onClick={checkSelection} value="polar bear">Polar Bear</button></li>
              <li><button onClick={checkSelection} value="whale">Whale</button></li>
              <li><button onClick={checkSelection} value="elephant">Elephant</button></li>
              <li><button onClick={checkSelection} value="racoon">Racoon</button></li>
            </ul>
          </Fragment>
        :
         <p>No Players in game! <Link to="/">Return to starting page and add players!</Link></p>
      }
    </div>
  )
}

export default GameDisplay;
