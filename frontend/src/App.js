import { Route, Routes } from "react-router-dom";
import ChatPage from "./Components/ChatPage";
import HomePage from "./Components/HomePage";
import "./App.css"


function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/chats" element={<ChatPage/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
