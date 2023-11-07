const users = [];

const addUser = ({name , userId,roomId,host,presenter})=>{
    const user={name,userId,roomId,host,presenter};
    users.push(user);
    return users;
}
const removeUser =(id)=>{
    const index=users.findIndex(user=>user.userId==id);
    if(index!==-1){
        return users.splice(index,1)[0];
    }
    return users;
}
const getUser =(id)=>{
    return users.filter((user)=>user.userId===roomId);
}
const getUserInRoom =(roomId)=>{
    return users.filter((user)=>user.roomId===roomId);
}

module.exports={
    addUser,removeUser,getUser,getUserInRoom
};