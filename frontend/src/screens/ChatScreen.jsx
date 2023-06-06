import io from 'socket.io-client';
import { useContext } from 'react';
import { useState } from 'react';
import { Store } from '../Store.jsx';
import Chat from '../components/Chat.jsx';
// const socket = io.connect('http://localhost:5000');

function ChatScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  // User and Room Chat State
  const [userName, setUserName] = useState(userInfo.name);
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const setUser = (event) => {
    setUserName(event.target.value);
    console.log(`${userName} is updating tne nickname...`);
  };

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      console.log(`room currently: ${room}`);
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className="joinChat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="User Nickname"
            className=""
            onChange={(event) => {
              setUser(event);
            }}
          ></input>
          <input
            type="text"
            placeholder="Select a chat room"
            className=""
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              joinRoom();
            }}
          >
            Join a Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default ChatScreen;
