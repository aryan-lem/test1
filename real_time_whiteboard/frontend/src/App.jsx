import Forms from './components/Forms';
import RoomPage from './pages/RoomPage'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import './App.css'
import io from "socket.io-client"
import { useState,useEffect } from 'react';

const server="http://localhost:5000";

const connectionOptions ={
  "force new connection":true,
  reconnectionAttempts:"Infinity",
  timeout: 10000,
  transports:["websocket"],
}

const socket=io(server , connectionOptions);

const App=()=> {

  const [user,setUser]=useState(null); 
  const [users,setUsers]=useState([]);
  

  useEffect(()=>{
    socket.on("userIsJoined",(data)=>{
      if(data.success){
        console.log("userJoined");
        setUsers(data.users);
      }else{
        console.log("userJoined");
      }
    })
    socket.on("allUsers",(data)=>{
      setUsers(data);
    })
  },[]);
  const uuid=()=>{
    var s4=()=>{
      return (((1+Math.random()) * 10000)|0).toString(16).substring(1);
    };
    return (
      s4() + s4() + "-" + s4() + "-" + s4() + "-" +s4() + "-" + s4() +s4() +s4()
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser}/>}></Route>
        <Route path="/:roomId" element={<RoomPage users = { users } user={user} socket={socket}/>}></Route>
      </Routes>
    </BrowserRouter>
    
    
  )
}

export default App;
