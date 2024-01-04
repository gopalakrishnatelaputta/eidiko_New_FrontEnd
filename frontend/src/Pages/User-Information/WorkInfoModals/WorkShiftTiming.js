
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Box,Card,CardContent,Container,Typography } from '@mui/material';
import {Paper,Grid} from '@mui/material';
import {Checkbox} from '@mui/material';
import {FormControl,FormLabel,FormGroup,FormControlLabel} from '@mui/material';
import {InputLabel} from '@mui/material';
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import userServiceModule from '../../../Services/user-service/UserService';

import { useNavigate } from 'react-router';
import Loading from '../../../Components/LoadingComponent/Loading';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { ShiftTimingModalPagesStyle } from './WorkInfoModalStyle';
import { ShiftHour } from '../../../Components/HelperComponent/HelperText';
import Notification from '../../../Components/HelperComponent/Notification';








export default function WorkShiftTiming(props){
  const minute1=["00",15,30,45,60]

   const[visible,setVisible]=useState(false);
   const[status,setStatus]=useState("click")
 
   const handlelerButton=(e)=>{
 if(status==="click"){
  setVisible(true)
   setStatus("")
 }
 else if(status!==1){
 setVisible(false)
  setStatus("click")
 }
   }
   //------------
//-------------------------------

let checkValueIncomming=props.manager.weekOff
let checkValueIncommingArr=[]
checkValueIncommingArr.push(checkValueIncomming.slice(0,1))
checkValueIncommingArr.push(checkValueIncomming.slice(2,3))
console.log(checkValueIncommingArr);


const[manager1,setManager1]=useState(props.manager)
const[empId,setEmpId]=useState(props.empId)
const[shiftTimingId,setshiftTimingId]=useState(manager1.shiftTimingId)
const navigate=useNavigate()
const[checkValue,setCheckValue]=useState([])
const [isLoading,setIsLoading]=useState(false)
const [startDate,setstartDate]=useState(function stringToDate(){
  let sd=manager1.startDate
  if(sd!==null){
  return new Date(sd).toISOString().slice(0, 10)}
  else{
      return ""
  }
})

const[endDate,setEndDate]=useState(function stringToDate(){
  let ed=manager1.endDate
  if(ed!==null){
      return new Date(ed).toISOString().slice(0,10)
  }
  else{
      return ""
  }
 
})
 const [shiftStartTime,setShiftStartTime]=useState({"startHour":manager1.shiftStartTime.slice(0,2),"startMinute":manager1.shiftStartTime.slice(3,5)})
const[shiftEndTime,setShiftEndTime]=useState({"endHour":manager1.shiftEndTime.slice(0,2),"endMinute":manager1.shiftEndTime.slice(3,5)})


      const handlechange=(e)=>{
        const { value, checked } = e.target;

        let arr1=checkValue
       
        if(checked){
          arr1.push(value)
          setCheckValue(arr1)
        }
        else{
       arr1=arr1.filter((e)=>e!==value)
        setCheckValue(arr1)
        }
      }


const func1=props.onClose1

      const shiftTimingsHandle=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        let startTime3=shiftStartTime.startHour+":"+shiftStartTime.startMinute+":"+"00"
        let endTime3=shiftEndTime.endHour+":"+shiftEndTime.endMinute+":"+"00"

        if(checkValue.length===2){

        userServiceModule.UpdateShiftTimingsService(shiftTimingId,empId,checkValue,startDate,endDate,startTime3,endTime3).then((res)=>{
          if(res.data.status===200 && res.data.statusMessage==='success' ){
            setIsLoading(false)
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_CENTER
            });
            func1()

          }
          else{
            setIsLoading(false)
            toast.error(res.data.message, {
              position: toast.POSITION.TOP_CENTER
          });
          func1()

          }
        }).catch((error)=>{
          setIsLoading(false)
          toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER
        });
        func1()
      

        })

      }
      else if(checkValue.length===0){
        setIsLoading(false)

        toast.error("please select  week off",{position:toast.POSITION.TOP_RIGHT})
      }
      else if(checkValue.length===1){
        setIsLoading(false)
        toast.error("You need to select atleast 2 week off",{position:toast.POSITION.TOP_RIGHT})

      }
      else{
        setIsLoading(false)
        toast.error("you can select maximum 2 week off",{position:toast.POSITION.TOP_RIGHT})
      }

      }
  
       //backbutton
 const backbutton=useNavigate()

 const[toggle,settoggle]=useState(false);
 const[text,settext]=useState( ShiftHour)



return  (
  isLoading?<Loading/>:
        <Card style={ShiftTimingModalPagesStyle.CardStyle}>
        <CardContent>
            <center>

                <Typography style={ShiftTimingModalPagesStyle.TypographyStyle}>
            UPDATE SHIFT TIMING
            </Typography>

               <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
              
               <form onSubmit={shiftTimingsHandle}>
                       

                        <Box style={ShiftTimingModalPagesStyle.thirdBoxStyle}>
                        <Grid container  gap={1.5}  style={ShiftTimingModalPagesStyle.gridContinerStyle}>

                        <Grid item xs={12} style={ShiftTimingModalPagesStyle.gridItemStyle}>
                 <FormControl component="fieldset">

               <FormLabel component="center" style={ShiftTimingModalPagesStyle.gridItemStyle}>
                <Typography variant='h5' color="#2196F3">Week off</Typography>
                </FormLabel>

            <FormGroup id="check-box-data" aria-label="position" row  >
            
                <FormControlLabel
                control={<Checkbox />}
                label="Mon"
                id='Mon'
                name="weekoff"
                value="2"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Tue"
                name="weekoff"
                value="3"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Wed"
                name="weekoff"
                value="4"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Thur"
                name="weekoff"
                value="5"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Fri"
                name="weekoff"
                value="6"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Sat"
                name="weekoff"
                value="7"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Sun"
                name="weekoff"
                value="1"
                onChange={handlechange}
                />
            </FormGroup>
            </FormControl>
        </Grid>
      
        <Grid item xs={12} style={ShiftTimingModalPagesStyle.gridItemStyle}>
                                    <TextField InputLabelProps={{shrink: true,}} className='outlined-basic-text-box' id="outlined-basic" label="Start Date" variant="outlined" style={ShiftTimingModalPagesStyle.textFieldStyle} type='date'
                                                value={startDate}
                                                onChange={(e) =>{setstartDate(e.target.value)}}
                                            />

            </Grid >
            <Grid item xs={12} style={ShiftTimingModalPagesStyle.gridItemStyle}>

                     <Grid className='col-sm-2  mt-2'>
                      
                      {
                        status==="click"?<Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         :
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                      }
                     <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>

                   
                 </Grid>
                  </Grid>
                  
                  { 
                  visible ?
                  
                     <Grid item xs={12} style={ShiftTimingModalPagesStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={ShiftTimingModalPagesStyle.textFieldStyle} type='date'
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }
            <Grid item xs={12} style={ShiftTimingModalPagesStyle.gridItemStyle}>
        <Box style={ShiftTimingModalPagesStyle.shiftStartAndEndBoxStyle}>
       
        <Typography variant='h6'>Shift Start</Typography>
        <Grid container style={ShiftTimingModalPagesStyle.gridContinerStyle}>
  <Grid item xs={6} sx={{display:"flex"}}> 
  <TextField  onClick={(e)=>{settoggle(!toggle)}} name="startHour"  value={shiftStartTime.startHour} onChange={(e)=>{setShiftStartTime({...shiftStartTime,startHour:e.target.value})}} label="Hour" placeholder='Hour Format 24:00' type="number"  InputProps={{ inputProps: { max:23,min:0} }} style={ShiftTimingModalPagesStyle.TextFieldOfShiftStartAndEndBoxStyle}></TextField>  
</Grid>
<Grid item xs={6} sx={{display:"flex"}}> 
<FormControl style={ShiftTimingModalPagesStyle.FormControlOfShiftStartAndEndBoxStyle}>
        <InputLabel id="demo-multiple-name-label">Minute</InputLabel>
                <Select label="Minute" value={shiftStartTime.startMinute}                 
                onChange={(e)=>{setShiftStartTime({...shiftStartTime ,startMinute:e.target.value})}} 
                labelId="demo-multiple-name-label"
                id="demo-multiple-start"
                name="startMinute" >
                {minute1.map((minute1) => (
                    <MenuItem
                    key={minute1}
                    value={minute1}
                    >
                    {minute1}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
         
         </Grid>

</Grid>
       
              
        </Box>
        </Grid>
         {/* this grid for shift end time */}

        <Grid item xs={12} style={ShiftTimingModalPagesStyle.gridItemStyle}>

            <Box style={ShiftTimingModalPagesStyle.shiftStartAndEndBoxStyle}>

            <Typography variant='h6'>Shift End</Typography>

            <Grid container style={ShiftTimingModalPagesStyle.gridContinerStyle}>
  <Grid item xs={6} style={ShiftTimingModalPagesStyle.gridItemStyle}> 
  <TextField  onClick={(e)=>{settoggle(!toggle)}} name="endHour" value={shiftEndTime.endHour} 
  onChange={(e)=>{setShiftEndTime({...shiftEndTime,endHour:e.target.value})}} label="Hour" placeholder='Hour Format 24:00'  type="number"  InputProps={{ inputProps: { max:23,min:0} }} style={ShiftTimingModalPagesStyle.TextFieldOfShiftStartAndEndBoxStyle}></TextField>
</Grid>
<Grid item xs={6} style={ShiftTimingModalPagesStyle.gridItemStyle}> 
<FormControl style={ShiftTimingModalPagesStyle.FormControlOfShiftStartAndEndBoxStyle}>
        <InputLabel id="demo-multiple-name-label">Minute</InputLabel>
                <Select label="Minute"
                name="endMinute"
                value={shiftEndTime.endMinute}
                labelId="demo-multiple-name-label"
                id="demo-multiple-end"
                onChange={(e)=>{setShiftEndTime({...shiftEndTime ,endMinute:e.target.value})}} >
                {minute1.map((minute2) => (
                    <MenuItem
                    key={minute2}
                    value={minute2}
                    >
                    {minute2}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
         
         </Grid>

</Grid>  

        </Box>
            </Grid>
           
<Notification toggle={toggle} text={text}></Notification>

            <Grid item xs={12} style={ShiftTimingModalPagesStyle.gridItemStyle}>
                                 
                <Button  disableElevation sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} >UPDATE</Button>
               <Button  disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
              
             </Grid>
            

      </Grid>

        </Box>

        </form>
      <GlobalButton.GlobalDivider1/>
            </center>
        </CardContent>
        
    </Card>
)


}



































// import { Box, Button, Card, CardContent, Container, Grid, Paper, TextField, Typography } from '@mui/material'
// import React from 'react'
// import Person3Icon from '@mui/icons-material/Person3';
// import { useState } from 'react';
// import userServiceModule from '../../Services/user-service/UserService';
// import Swal from 'sweetalert2';
// import { GlobalButton } from '../stylecomponent/GlobalButton';
// import {Divider} from '@mui/material';
// import Loading from '../../Components/LoadingComponent/Loading';
// import { helpFunction } from '../../Components/HelperComponent/helpFunction';
// import { EmpUpdateService } from '../../Services/Employee-Update-Service/EmpUpdSer';
// import { toast } from "react-toastify";


// export const WorkShiftTiming = (props) => {


//   const[managerId,setManagerId]=useState(props.manager)
//   const [initialStartDate,setInitialStartDate]=useState(function stringToDate(){
//     let sd=props.startdate
    
//     return new Date(sd).toISOString().slice(0, 10)
//   })

//   const[initialEndDate,setInitialEndDate]=useState(function stringToDate(){
//     let ed=props.enddate
    
//     return new Date(ed).toISOString().slice(0,10)
//   })
// //   const [initialStartTime,setInitialStartTime]=useState(function stringToTime(){
// //     let st=props.starttime
    
// //     return new TimeRanges(st).toISOString().slice(0, 5)
// //   })
// //   const [initialEndTime,setInitialEndTime]=useState(function stringToTime(){
// //     let et=props.endtime
    
// //     return new TimeRanges(et).toISOString().slice(0, 5)
// //   })
// const [initialStartTime,setInitialStartTime]=
// useState({"startHour":props.shiftstart.slice(0,2),"startMinute":props.shiftstart.slice(3,5)})
      
// const[initialEndTime,setInitialEndTime]=
// useState({"endHour":props.shiftend.slice(0,2),"endMinute":props.shiftend.slice(3,5)})

// const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
//   const textfield1={width: 400}

    
//  const [state, setState] =useState({
//     open: false,
//     vertical: 'top',
//     horizontal: 'center',
//     });
 
// const { vertical, horizontal, open } = state;
// const[empId,setEmpId]=useState(props.empId)
// const [isLoading,setIsLoading]=useState(false)
// // const[modalClose,setModalClose]=useState(props.onClose1)



// const reportingManagerModalHandle=(e)=>{
//     e.preventDefault()
//     setIsLoading(true)
//     let endDate1=helpFunction.endDateManipulation(initialEndDate)
//     EmpUpdateService.updateReportingManager(empId,managerId,initialStartDate,endDate1).then((res)=>{
//         if(res.status===201 && res.statusMessage==='success'){

//             setIsLoading(false)
//             // setModalClose(true)
//             toast.success(res.message, {
//                 position: toast.POSITION.TOP_CENTER
//               });
//             // Swal.fire({
//             //     position: 'center',
//             //     icon: 'success',
//             //     title: res.message,
//             //     showConfirmButton: false,
//             //     timer: 1500 })
//             }
//         else{

//             setIsLoading(false)
//             toast.error(res.message, {
//                 position: toast.POSITION.TOP_CENTER
//             });
//             }
//              }).catch((error)=>{

//                 setIsLoading(false)
//                 toast.error(error.response.data.message, {
//                     position: toast.POSITION.TOP_CENTER
//                 });
//      })}



//     return (
//         isLoading?<Loading/>:
//         <Card style={{ maxWidth: 670, padding: "13px 5px", margin: "0 auto" ,marginTop:"55px"}}>
//         <CardContent>
//             <center>
//             <Grid>
//                  <Typography style={{fontSize:"25px",marginBottom:"10px"}} color="primary">
//                  Shift Timings
//                  </Typography>     
//             </Grid>
//             </center>
//             <GlobalButton.GlobalDivider/>
//         <Container style={{padding:"20px"}}>
//             <form onSubmit={reportingManagerModalHandle}>
//             <Paper elevation={0} style={{width:"auto"}} >

//               <Box sx={{ flexFlow: 1 }}>
//                 <Grid container spacing={1} gap={1}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
//                  <Grid item xs={12} 
//                  sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                      }}>
//                         <TextField required value={props.empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" 
//                         label="Shift Id" variant="outlined" style={textfield1} disabled type='number' ></TextField>
//                     </Grid>
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//             <TextField required value={initialStartDate} onChange={(e)=>{setInitialStartDate(e.target.value)}} 
//             className='outlined-basic-text-box' id="outlined-basic1" 
//             label="Start Date" variant="outlined" 
//             style={textfield1} type='date' />  
//                     </Grid >
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//                 <TextField className='outlined-basic-text-box' id="outlined-basic1" 
//                 label="End Date" variant="outlined" style={textfield1} type='date'
//                 value={initialEndDate} onChange={(e)=>{setInitialEndDate(e.target.value)}} />  
//                 </Grid >

//                 <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//             <TextField required value={initialStartTime} onChange={(e)=>{setInitialStartTime(e.target.value)}} 
//             className='outlined-basic-text-box' id="outlined-basic1" 
//             label="Shift-Start-Time" variant="outlined" 
//             style={textfield1} type='time' />  
//                     </Grid >
                    

//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//             <TextField required value={initialEndTime} onChange={(e)=>{setInitialEndTime(e.target.value)}} 
//             className='outlined-basic-text-box' id="outlined-basic1" 
//             label="Shift-end-time" variant="outlined" 
//             style={textfield1} type='time' />  
//                     </Grid >
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//             <TextField required  
//             className='outlined-basic-text-box' id="outlined-basic1" 
//             label="week-off" variant="outlined" 
//             style={textfield1} type='week' />  
//                     </Grid >
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//                         <TextField required value={props.managerId} 
//                         onChange={(e)=>{setManagerId(e.target.value)}} 
//                         className='outlined-basic-text-box' id="outlined-basic" 
//                         label="Modified By" variant="outlined" 
//                         style={textfield1} type='number' />
//                     </Grid>

                   
                
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//                         <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={button1}>UPDATE</Button>

//                         <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
//                     </Grid>
//                     {/* <Grid item xs={12} sx={{justifyContent:"right",display:"flex"}}>
//                          <Button onClick={handleRmClose} style={{marginRight:"32px",color:"red",fontWeight:"bold"}}>Cancel</Button>
//                         </Grid> */}
//                 </Grid>
//             </Box>
//             </Paper>
//             </form>
//         </Container>
//         <GlobalButton.GlobalDivider/>
//         </CardContent>
//         </Card>

//     )
// }
