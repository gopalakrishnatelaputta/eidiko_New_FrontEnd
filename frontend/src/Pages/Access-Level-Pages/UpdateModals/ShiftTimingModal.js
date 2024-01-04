import { Box, Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Swal from 'sweetalert2';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import {Divider} from '@mui/material';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import Loading from '../../../Components/LoadingComponent/Loading';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import { toast } from "react-toastify";
import dayjs from 'dayjs';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AccessLevelShiftTimingModalPagesStyle } from './AccessLevelPageWorkInfoModalStyle';
import { ShiftHour } from '../../../Components/HelperComponent/HelperText';
import Notification from '../../../Components/HelperComponent/Notification';




export const ShiftTimingModal = (props) => {


//------EndDate
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



const[shiftTimingTableData,setShiftTimingTableData]=useState(props.manager)
const [initialStartDate,setInitialStartDate]=useState(dayjs(helpFunction.helperFunctionForEndDateInput(shiftTimingTableData.startDate)).format("YYYY-MM-DD"))
const[initialEndDate,setInitialEndDate]=useState(
  function dataFormated(){
    if(shiftTimingTableData.endDate !==null){
      dayjs(helpFunction.helperFunctionForEndDateInput(shiftTimingTableData.endDate)).format("YYYY-MM-DD")
    }
    return ""
}
  )
const [initialShiftStartTime,setInitialShiftStartTime]=useState({"startHour":shiftTimingTableData.shiftStartTime.slice(0,2),"startMinute":shiftTimingTableData.shiftStartTime.slice(3,5)})
const[initialShiftEndTime,setInitialShiftEndTime]=useState({"endHour":shiftTimingTableData.shiftEndTime.slice(0,2),"endMinute":shiftTimingTableData.shiftEndTime.slice(3,5)})

const minute1=["00",15,30,45,60]
const[checkValue,setCheckValue]=useState([])
const[isLoading,setIsLoading]=useState(false)
const [empId,setEmpId]=useState(props.empId)
const[shiftTimingId,setshiftTimingId]=useState(props.manager.shiftTimingId)
let func1=props.onClose1

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



  const shiftTimingsModalHandle=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(initialEndDate)
     let startTime3=initialShiftStartTime.startHour+":"+initialShiftStartTime.startMinute+":"+"00"
       let endTime3=initialShiftEndTime.endHour+":"+initialShiftEndTime.endMinute+":"+"00"

     if(checkValue.length===2){
    EmployeeAccessLevelService.updateShiftTimingsService(empId,checkValue,initialStartDate,endDate1,startTime3,endTime3,shiftTimingId).then((res)=>{
       
      if(res.status===200 && res.data.statusMessage==='success'){
        console.log(res)
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
      console.log(error)
      setIsLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
    });
    func1()
    })
  
  }
    else if(checkValue.length===0){
      setIsLoading(false)
      toast.error("please select  week off", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    else if(checkValue.length===1){
      setIsLoading(false)
      toast.error("You need to select atleast 2 week off", {
        position: toast.POSITION.TOP_CENTER
      });

    }
    else{
      setIsLoading(false)
       toast.error("you can select maximum 2 week off", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  const[toggle,settoggle]=useState(false);
  const[text,settext]=useState( ShiftHour)


    return (
      isLoading?<Loading/>:
        <Card style={AccessLevelShiftTimingModalPagesStyle.CardStyle}>
        <CardContent>
            <center>
                <Grid>
                <Typography style={AccessLevelShiftTimingModalPagesStyle.TypographyStyle}>
            Update Shift Timing
        </Typography>  
                </Grid>

                <GlobalButton.GlobalDivider1/>
        <form onSubmit={shiftTimingsModalHandle}>

                        <Box style={AccessLevelShiftTimingModalPagesStyle.thirdBoxStyle}>
                        <Grid container  gap={1.8} style={AccessLevelShiftTimingModalPagesStyle.gridContinerStyle}>

                        <Grid item xs={12} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>
        <FormControl component="fieldset">

            <FormLabel style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>

                <Typography variant='h5' color="#2196F3">Week off</Typography>
                </FormLabel>

            <FormGroup id="check-box-data" aria-label="position" row  >
            
                <FormControlLabel
                control={<Checkbox />}
                label="Mon"
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
      
        <Grid item xs={12} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>
                                    <TextField InputLabelProps={{shrink: true,}} className='outlined-basic-text-box' id="outlined-basic" label="Start Date" variant="outlined" style={AccessLevelShiftTimingModalPagesStyle.textFieldStyle} type='date'
                                                value={initialStartDate}
                                                onChange={(e) =>{setInitialStartDate(e.target.value)}}
                                            />

            </Grid >
            {
                        status==="click"?
                        <Grid container style={AccessLevelShiftTimingModalPagesStyle.gridContinerStyle}>
                        <Grid item xs={12} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>

                        <Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         
                        <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>
                         </Grid>
                         </Grid>
                         :
                         <Grid container style={AccessLevelShiftTimingModalPagesStyle.gridContinerStyle}>
                         <Grid item xs={12} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>
                         </Grid>
                         </Grid>
                      }
                    
                  
                  { 
                  visible ?
                  
                     <Grid item xs={12} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={AccessLevelShiftTimingModalPagesStyle.textFieldStyle} type='date'
                                      value={initialEndDate}
                          onChange={(e) => {setInitialEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }
            <Grid item xs={12} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>
        <Box style={AccessLevelShiftTimingModalPagesStyle.shiftStartAndEndBoxStyle}>
      
        <Typography variant='h6'>Shift Start</Typography>


        <Grid container style={AccessLevelShiftTimingModalPagesStyle.gridContinerStyle}>
  <Grid item xs={6} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}> 
  <TextField  onClick={(e)=>{settoggle(!toggle)}} name="startHour" 
  value={initialShiftStartTime.startHour} onChange={(e)=>{setInitialShiftStartTime({...initialShiftStartTime,startHour:e.target.value})}} label="Hour" placeholder='Hour Format 24:00' type="number"  InputProps={{ inputProps: { max:23,min:0} }} style={AccessLevelShiftTimingModalPagesStyle.TextFieldOfShiftStartAndEndBoxStyle}></TextField>   
</Grid>
<Grid item xs={6} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}> 
<FormControl style={AccessLevelShiftTimingModalPagesStyle.FormControlOfShiftStartAndEndBoxStyle}>
        <InputLabel id="demo-multiple-name-label">Minute</InputLabel>
                <Select label="Minute" value={initialShiftStartTime.startMinute}                 
                onChange={(e)=>{setInitialShiftStartTime({...initialShiftStartTime ,startMinute:e.target.value})}} 
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

        <Grid item xs={12} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>
            <Box style={AccessLevelShiftTimingModalPagesStyle.shiftStartAndEndBoxStyle}>
   
        <Typography variant='h6'>Shift End</Typography>
        <Grid container style={AccessLevelShiftTimingModalPagesStyle.gridContinerStyle}>
  <Grid item xs={6} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}> 
  <TextField  onClick={(e)=>{settoggle(!toggle)}} name="endHour" value={initialShiftEndTime.endHour} onChange={(e)=>{setInitialShiftEndTime({...initialShiftEndTime,endHour:e.target.value})}} label="Hour" placeholder='Hour Format 24:00'  type="number"  InputProps={{ inputProps: { max:23,min:0} }} style={AccessLevelShiftTimingModalPagesStyle.TextFieldOfShiftStartAndEndBoxStyle}></TextField>  
</Grid>

<Grid item xs={6} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}> 
<FormControl style={AccessLevelShiftTimingModalPagesStyle.FormControlOfShiftStartAndEndBoxStyle}>
        <InputLabel id="demo-multiple-name-label">Minute</InputLabel>
                <Select label="Minute"
                name="endMinute"
                value={initialShiftEndTime.endMinute}
                labelId="demo-multiple-name-label"
                id="demo-multiple-end"
                onChange={(e)=>{setInitialShiftEndTime({...initialShiftEndTime ,endMinute:e.target.value})}} >
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
            <Grid item xs={12} style={AccessLevelShiftTimingModalPagesStyle.gridItemStyle}>
                                 
                <Button  disableElevation sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} >UPDATE</Button>
               <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
              
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
