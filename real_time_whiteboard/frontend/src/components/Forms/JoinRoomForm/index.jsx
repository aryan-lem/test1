import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({socket,setUser,uuid})=>{
    const navigate=useNavigate();
    const [roomId,setRoomId]=useState("");
    const [name,setName]=useState("");
    const handleRoomJoin=(e)=>{
        e.preventDefault();

        const roomData={name,roomId,userId:uuid(),host:false,presenter:false,}
        setUser(roomData);
        socket.emit("userJoined",roomData);
        navigate(`/${roomId}`);
    }
    return(
        <form className="form col-md-12 mt-5">
            <div className="form-group">
                {/* <input type="text" className="from-control my-2" placeholder="Enter Your Name"  onClick={(e)=>setName(e.target.value)}/> */}
                <input type="text" className="from-control my-2" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)} />
                {/* <input type="text" className="form-control my-2" placeholder="Enter Room Code"  onClick={(e)=>setRoomId(e.target.value)}/> */}
                <input type="text" className="form-control my-2" placeholder="Enter Room Code" value={roomId} onChange={(e)=>setRoomId(e.target.value)}/>
            </div>

                
            <button type="submit" className="mt-4 btn btn-primary btn-block form-control" onClick={handleRoomJoin}>Join Room</button>

        </form>
    )
    
}
export default JoinRoomForm;