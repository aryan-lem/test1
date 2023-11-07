import { useState,useRef } from 'react';
import WhiteBoard from "../../components/Whiteboard/index.jsx";
import './index.css'

const RoomPage = ({user,socket,users}) => {
    const canvasRef=useRef(null);
    const ctxRef=useRef(null);
    const [tool,setTool]=useState('pencil');
    const [color,setColor]=useState('black');
    const [elements,setElements]=useState([]);
    const [history,setHistory]=useState([]);

    const hanldeClearCanvas=()=>{
        const canvas = canvasRef.current;
        const ctx= canvas.getContext("2d");
        ctx.fillRect = "white";
        ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
        setElements([])
        // setHistory([])
    }
    const undo = () =>{
        
        if(elements.length>1){
            setHistory((prevHistory)=>[...prevHistory,elements[elements.length-1]]);
            setElements((prevElements)=>prevElements.slice(0,prevElements.length-1));
        }
        else if(elements.length==1){
            setHistory((prevHistory)=>[...prevHistory,elements[0]]);
            let emptyArray=[];
            setElements(emptyArray);
            hanldeClearCanvas();
        }
    }
    const redo =()=>{
        if(history.length>1){
            setElements((prevElements)=>[...prevElements,history[history.length-1]]);
            setHistory((prevHistory)=>prevHistory.slice(0,prevHistory.length-1));
        }if(history.length==1){
            setElements((prevElements)=>[...prevElements,history[history.length-1]]);
            setHistory([]);
        }
    }
    return ( 
        <div className="row">
            <h1 className='text-center py-4 pt-4'>White Board Sharing App <span className='text-primary'>[Users Online : {users.length}]</span></h1>
            {
                user && user.presenter&&(
                    <div className="col-md-12 gap-3 px-5 mb-2 d-flex aling-items-center justify-content-center">
                            <div className="d-flex col-md-2 justify-content-center gap-1">
                                <div className="d-flex gap-1 align-items-center">
                                    <label htmlFor="pencil" >Pencil</label>
                                    <input className="mt-1" type="radio" name="tool" id='pencil' value="pencil" checked={tool==="pencil"} onChange={(e)=>setTool(e.target.value)} />
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <label htmlFor="line" >Line</label>
                                    <input className="mt-1" type="radio" name="tool" id='line' value="line" checked={tool==="line"} onChange={(e)=>setTool(e.target.value)} />
                                </div>
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <label htmlFor="rect" >Rectangle</label>
                                    <input className="mt-1" type="radio" name="tool" id='rect' value="rect" checked={tool==="rect"} onChange={(e)=>setTool(e.target.value)} />
                                </div>

                            </div>
                            <div className="col-md-2 mt-1 mx-auto">
                                <div className="d-flex align-items-center">
                                    <label htmlFor="color">Select Color : </label>
                                    <input type="color" id='color' className='mt-1 ms-3' value={color} onChange={(e)=>setColor(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex gap-2">
                                <button className="btn btn-primary mt-1" disabled={elements.length===0} onClick={undo}>Undo</button>
                                <button className="btn btn-outline-primary mt-1" disabled={history.length===0} onClick={redo}>Redo</button>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-danger" onClick={hanldeClearCanvas}>Clear Canvas</button>
                            </div>
                            
                    </div>
                )
            }
            
            <div className="col-md-10 mx-auto mt-4 canvas-box ">
                <WhiteBoard socket={socket} user={user} canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements} tool={tool} color={color}/>
            </div>
        </div>
     );
}
 
export default RoomPage;