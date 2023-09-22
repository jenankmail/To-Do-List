//import { List } from '@mui/material';
import React, { useState ,useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ToDoList() {
    const [listInputValue,SetlistInputValue]=useState("");
    const [open ,Setopen]=useState(false);
    const [selectListid,SetselectListid]=useState(null);
    const [updateListname,SetupdateListname]=useState("");
    const[valueCheck,setvalueCheck]=useState(false);
    const [listTask , SetlistTask]=useState([
        {id: uuidv4(), listcon:"Learn useEffect Hook" ,check:false},
        {id:uuidv4(), listcon:"nooo oo o " ,check:false},
    ]);
    const updateCheck=(event)=>{
      SetlistTask({...listTask,checked:event.target.checked})
     // localStorage.setItem("lists",JSON.stringify(listTask));
    };
    function changecheck(id){
        const updatechecklist=listTask.map((e)=>{

          if(e.id===id){
            return {...e,check:valueCheck}
          }
          return e;
          }
          
          )
          SetlistTask(updatechecklist);
          localStorage.setItem("lists",JSON.stringify(updatechecklist))
          handleClose();
    };
    const username=listTask.map((list)=>{
      return (
        <div className="todo">
          <div className="todo-text">
            <input className="checkbox" type="checkbox" id="isCompleted" checked={list.check} onChange={(event)=>{
            setvalueCheck(event.target.checked);
           // console.log(event.target.checked)
            changecheck(list.id);}
            }/>
          </div>
          
         <div> {list.listcon}</div>
          <div className="todo-actions">
            <button className="submit-edits" onClick={()=>{
                 handleOpenDialog(list.id);
            }}>Edit</button>
            <button className="submit-edits" onClick={()=>{
              DeleteClick(list.id);
            }}>Delete</button>
          </div>
        </div>
       )
    });
const  handleClose=()=>{
  Setopen(false);
  SetupdateListname("");
};
const handleOpenDialog = (id) => {
  SetselectListid(id);
  const listToUpdate = listTask.find((e) => {
    return e.id === id});
  if (listToUpdate) {
    SetupdateListname(listToUpdate.listcon);
  }
  Setopen(true);
};  


function AddClick(){
const updateList=[...listTask,{id:uuidv4(),listcon:listInputValue},];
SetlistTask(updateList);
localStorage.setItem("lists",JSON.stringify(updateList));
};
function DeleteClick(id){
  const newlistTask = listTask.filter((list) => {
    if (list.id === id) return false;
    return true;
  });
  SetlistTask(newlistTask);
localStorage.setItem("lists",JSON.stringify(newlistTask));
};
const handleUpdateClick=()=>{
const updatetaskList=listTask.map((e)=>{

if(e.id===selectListid){
  return {...e,listcon:updateListname}
}
return e;
}

)
SetlistTask(updatetaskList);
localStorage.setItem("lists",JSON.stringify(updatetaskList))
handleClose();
};

 //const newlists=JSON.parse(localStorage.getItem("lists"));
 //SetlistTask(newlists);

 useEffect(()=>{
const newlists=JSON.parse(localStorage.getItem("lists"));
 SetlistTask(newlists);
 },[]);
  return (
    <div className="todo-container">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the task, please enter the new task below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label="New task"
            type="text"
            fullWidth
            value={updateListname}
            onChange={(event) => SetupdateListname(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateClick}>Update</Button>
        </DialogActions>
      </Dialog>
    <h1>
      <span className="second-title">Todo List App</span>
    </h1>
    <form>
      <input
        className="add-task"
        value={listInputValue}
        onChange={(event)=>{
          SetlistInputValue(event.target.value);
        }}
        type="text"
        placeholder="Add new task ..."
      />
      <button type="submit" className="add-button" onClick={AddClick} >
        Add
      </button>
    </form>
     <div>{username}</div>
     

  </div>
  
  )
}

export default ToDoList