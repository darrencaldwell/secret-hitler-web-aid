import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://127.0.0.1:8000';

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const createRoom = async (name) => {return {lobbyId: "some_lobby"}}
const joinRoom = async (lobbyId) => {return {lobbyId: lobbyId}}

function Home() {

  const [name, setName] = useState('');

  return (
  <div>
    <h2>shitler</h2>
    <p>hello {name}</p>
    <label>
      name:
      <input type="text"  onChange={e => setName(e.target.value)}/>
    </label>

    <Link to="/lobby" state={{lobbyId: "lob1", name: name, isJoin: true }}>
     <button type="button">
      join room
     </button>
    </Link>
    <Link to="/lobby" state={{name: name, isJoin: false }}>
     <button type="button">
        create room
     </button>
    </Link>
  </div>
  );
}

function Lobby() {
  let { state } = useLocation()

  const [players, setPlayers] = useState(["player1", "player2"]);
  const [roomData, setRoomData] = useState({foo:123})

  // const {
  //   sendMessage,
  //   sendJsonMessage,
  //   lastMessage,
  //   lastJsonMessage,
  //   readyState,
  //   getWebSocket,
  // } = useWebSocket(WS_URL, {
  //   onOpen: () => console.log('opened'),
  //   //Will attempt to reconnect on all close events, such as server shutting down
  //   shouldReconnect: (closeEvent) => true,
  // });
  console.log('opened websocket connection!!!')

  useEffect(() => {
    (async () => {
      setRoomData(!state.isJoin ? await createRoom(state.name) : await joinRoom(state.lobbyId))
      players.push(state.name)
    })()
  }, [])



  console.log(players)

  return (
  <div>
    <h2>Lobby {roomData.lobbyId}</h2>
    <button onClick={() => setPlayers( players.concat(["a player"]) )}>add a player</button>
    <h3>Players:</h3>
    {players.join()}
    <br/>
    <label>ready?
    <input
        type="checkbox"
        name="ready?"
        // checked={isSelected}
        // onChange={onCheckboxChange}
        className="form-check-input"
      />
      </label>
  </div>
  )
}

function Users() {
  return <h2>Users</h2>;
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
