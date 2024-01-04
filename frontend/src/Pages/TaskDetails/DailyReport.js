import React,{useEffect, useMemo, useRef, useState} from 'react';
import {Autocomplete, Box, Container, Divider, Grid, Paper, TextField, Typography} from '@mui/material';
import {CardContent ,Card} from '@mui/material';
import { Button } from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import CommentIcon from '@mui/icons-material/Comment';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';

import Person3Icon from '@mui/icons-material/Person3';
import Loading from '../../Components/LoadingComponent/Loading';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import Swal from 'sweetalert2';
import axios from 'axios';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';
import ReactQuill, { Quill } from 'react-quill';
import  "react-quill/dist/quill.snow.css";
import { ClipboardEvent } from 'react';
import { toast } from 'react-toastify';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';


export const  DAILY_TASK_CREATION_TITLE= " TASK_CREATION"

export default function DailyReporttt(props){

  const[visible,setVisible]=useState(false);
 
  const[TaskDetails,setTaskDetails]=useState("")
  const[desc,setDesc]=useState("")
  const[status,setStatus]=useState("")
  const[reason,setReason]=useState("")
  const[team,setTeam]=useState("")
  const[assignedDate,setAssignedDate]=useState(dayjs().format("YYYY-MM-DD"))
  const[taskAssignedBy,setTaskAssignedBy]=useState()
  const[taskVerifiedBy,setTaskVerifiedBy]=useState("null")
  const [isLoading,setIsLoading]=useState(false)


  function handlePaste(event) {
    event.preventDefault();
    toast("Copying and pasting is not allowed!")
   
  }
  const handleCopy = (event)=>{
    toast("Copying and pasting is not allowed!")
    event.preventDefault();
 
  };
	
  const  modules  = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
  ],
  };   






const handleTaskSubmit=(e)=>{
 e.preventDefault()
 setIsLoading(true) 
 if(desc.length<150){
  setIsLoading(false)
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: "Description must be more than 150 letters",
    showConfirmButton: false,
    timer: 1500
})
return
 }
 else{


 taskService.createTask(TaskDetails,desc,status,reason,team,assignedDate,taskAssignedBy,taskVerifiedBy).then((res)=>{
  if(res.data.status===201 && res.data.statusMessage==='Success' ){
    setIsLoading(false)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500
  })

  }
  else if(res.data.status===208){
    
    setIsLoading(false)
  Swal.fire(
      {
          position: 'center',
          icon: 'info',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
      }

  )

  }
  else{
    setIsLoading(false)
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: res.data.message,
      showConfirmButton: false,
      timer: 1500})
  }
 }).catch((error)=>{
  setIsLoading(false)
  Swal.fire(

      {
          position: 'center',
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 1500
      }

  )
})
 }
setStatus("")
}

//backbutton
const backbutton=useNavigate()

const [data, setData]=useState([]);
const[records,setRecords]=useState();
const[managerId,setManagerId]=useState("")

const history=useNavigate()
   const handleGoBack = () =>{
    history(-1);
  };


useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })
    },[records])


    return hasAuthority(DAILY_TASK_CREATION_TITLE)?(
      isLoading?<Loading/>:
      <Box style={{backgroundColor:"#FFFFFF",height:"92vh"}}>



        <Box sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center'
        }}>
        <Box sx={{
                
                width:'100vw',
         
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
              
            }}>
             <Typography color="secondary"   style={{marginLeft:"10px",fontSize:"21px",marginTop:"20px",fontFamily:"Times New Roman Times"}}>CREATE TASK</Typography>

             <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginRight:"10px",
                marginTop:"15px"}} 
                 onClick={handleGoBack}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
            
        </Box>
         
            <Box  style={{marginLeft:"10px",width:"98.7%"}}>
            <GlobalButton.GlobalDivider1/>
              </Box>    
            {/* -----------------------------------------     */}
        <Container style={{padding:"0px"}}>
       
            <form onSubmit={handleTaskSubmit} >
            <Paper elevation={0} style={{width:"auto"}} >

            <Box sx={{ flexFlow: 1 }} >
            <Grid container spacing={0} gap={1}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>

               <Grid item xs={12} sx={{justifyContent:"center",display:"flex"}}>
                 <TextField  value={TaskDetails} onChange={(e)=>{setTaskDetails(e.target.value)}} onPaste={handlePaste} onCopy={handleCopy}
                  type="number" label="Task Details" required multiline rows={1} placeholder="Task Deatils" variant='outlined' fullWidth style={{width:"935px",marginTop:"15px"}}></TextField>
                 </Grid>
              
                 <Grid item xs={12} sx={{justifyContent:"center",display:"flex"}}>
                  <ReactQuill  modules={modules} variant='outlined' fullWidth style={{width:"935px",marginTop:"30px"}} 
           
            
                  onChange={setDesc} placeholder="Task Description" /> 
                  </Grid>
   
               
                 <Grid item xs={12} sx={{justifyContent:"center",display:"flex",marginTop:"20px"}}>
                 <Autocomplete
                  Value={taskAssignedBy}
                  onChange={(e,value)=>{
                    if(value==null){

                      return setTaskAssignedBy("")
                    }
                    let data=value.match("[0-9]*")
                   return  setTaskAssignedBy(data[0])

                  }}
                fullWidth style={{width:"935px",marginTop:"75px"}}
            sx={{display:"flex"}}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                required
                                
                                 {...params} 
                                label='Task Assigned By'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />}
            />
                
                 
                 </Grid>
                 
                 <Grid item xs={12} sx={{justifyContent:"center",display:"flex"}} style={{width:"550px",marginTop:"15px"}}>

                <TextField  style={{width:"450px",marginTop:"15px"}} type='date' value={assignedDate} onChange={(e)=>{setAssignedDate(e.target.value)}} label="Task Assign Date"></TextField>

                <TextField  value={team} onChange={(e)=>{setTeam(e.target.value)}} label="Team Name" required  placeholder="Enter Your Team" variant='outlined' fullWidth style={{width:"450px",marginTop:"15px",marginLeft:"35px"}}></TextField>
                 

                 </Grid>

                 </Grid>





               <Grid  item xs={12}className='form-group row' sx={{display:"flex",justifyContent:"center",marginBottom:"12px",marginTop:"12px"}}>
                 <label className='col-sm-4 col-form-label'>Status: </label>
                 <Grid className='col-sm-2  mt-2' style={{marginLeft:"15px", color:"green"}}>
                    Completed<input type="radio" className='mx-2' name="isyes" value="Yes" onClick={(e)=>{setVisible(false) ;setStatus(e.target.value)}} style={{accentColor:"green",marginLeft:"9px",marginRight:"25px"}}/>
                 </Grid>
                 <Grid className='col-sm-2  mt-2' style={{color:"red"}}>
                    Not Completed<input type="radio" className='mx-2' name="isyes" value="No" onClick={(e)=>{setVisible(true);setStatus(e.target.value)}}  style={{accentColor:"red",marginLeft:"9px"}}/>
                 </Grid>
               </Grid>
               {/* </Grid> */}
                
               {
                 visible &&
                 
               <Grid item xs={12} sx={{justifyContent:"center",display:"flex"}}>
               <TextField value={reason} onChange={(e)=>{setReason(e.target.value)}} label="Reason"multiline rows={2} required  placeholder="Enter The Reason" variant='outlined' fullWidth style={{width:"935px",marginTop:"15px"}}/>
               </Grid>
                 
               }
               <Grid item xs={12} sx={{justifyContent:"center",display:"flex",marginTop:"12px"}}>
                 <Button disableElevation style={GlobalButton.OperationButton} type="submit" variant="contained" color="primary" >Submit</Button>
               </Grid>
               
               
             </Box>
        </Paper>
            </form>
           
        </Container>
    </Box>
    
    ):<NoAuth></NoAuth>
}

