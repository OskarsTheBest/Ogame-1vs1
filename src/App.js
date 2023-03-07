import React, { useEffect, useState} from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import JoinGame from './components/JoinGame';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from "universal-cookie";
import { generateWordSet } from './components/Words';
import WordleLogo from './static/WordleLogo.png';

function App() {

  // Wordle generate word
  const [selectedWord, setSelectedWord] = useState("");
  const [wordSet, setWordSet] = useState(new Set());

  useEffect(() => {
    // Fetch a set of words and select a random one
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setSelectedWord(words.todaysWords);
    });
  }, []);

  const api_key = "s9hp376zjtsg";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    // Remove all user cookies and disconnect user from Stream Chat
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  // Connect the user to Stream Chat if there is a token
  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstname: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    token
    ).then((user) => {
      setIsAuth(true);
    });
  }

  return (
    <div className="App">
      {isAuth ? ( 
        // Show the chat and the join game component if the user is authenticated
        <Chat client={client}>
          <JoinGame wordSet={wordSet} selectedWord={selectedWord} />
          <button className='logout' onClick={logOut}>Log Out</button>
        </Chat>
      ) : (
        // Show the sign up and login components if the user is not authenticated
        <>
          <img className='logo' src={WordleLogo} alt="wordle logo" />
          <h1 className='titel'>𝙱𝚄𝚃 𝙸𝚃𝚂 1 𝚅𝚂 1</h1>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
