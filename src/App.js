import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Component Imports
import GameSettings from './components/GameSettings.js';
import GameDisplay from './components/GameDisplay.js';


function App() {

  // Application State
  const [appPlayerInfo, setAppPlayerInfo] = useState([]);

  // This function is passed down into components so that I can update the playerInfo pieces of state in the App.js component
  // with info that is contained in my other components.
  // When I call this function I'm always going to call it with an array of player objects.
  const updateAppPlayerInfo = function(playerInfoFromComponent) {
    setAppPlayerInfo(playerInfoFromComponent);
  }

  return (
    <div className="App">
      <h1>Wow it's a Game App!</h1>
      
      <Routes>
        <Route path='/' element= {<GameSettings updateAppPlayerInfo={updateAppPlayerInfo}/>} />
        <Route path='/game' element={<GameDisplay appPlayerInfo={appPlayerInfo} updateAppPlayerInfo={updateAppPlayerInfo}/>} />
      </Routes>
    </div>
  );
}

export default App;
