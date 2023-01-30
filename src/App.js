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
  return (
  <div>
    <h2>Shitler</h2>

    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
    <Link to="/lobby" state={{lobbyId: "lob1", name: "james", isJoin: true }}>
     <button type="button">
          join room
     </button>
    </Link>
    <Link to="/lobby" state={{name: "james", isJoin: false }}>
     <button type="button">
          create room
     </button>
    </Link>
  </div>
  );
}

function Lobby() {
  let { state } = useLocation()

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


  const [roomData, setRoomData] = useState({foo:123})
  useEffect(() => {
    (async () => {
      setRoomData(!state.isJoin ? await createRoom(state.name) : await joinRoom(state.lobbyId))
    })()
  }, [])
  
  //setRoomData(!state.isJoin ? ))
  //setRoomData({foo: 123})

  return <h2>Lobby {roomData.lobbyId}</h2>
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
