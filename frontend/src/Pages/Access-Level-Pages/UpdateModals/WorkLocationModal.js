import { Box, Button, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import React from 'react'
import WorkIcon from '@mui/icons-material/Work';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import {Typography} from '@mui/material';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import Loading from "../../../Components/LoadingComponent/Loading";
import Swal from 'sweetalert2';
import { helpFunction } from "../../../Components/HelperComponent/helpFunction";
import { toast } from "react-toastify";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect } from 'react';
import { DropDownServices } from "../../../Services/DropDownServices/DropDownServices";
import { AccessLevelWorkInfoModalStyle } from './AccessLevelPageWorkInfoModalStyle';

export const WorkLocationModal = (props) =>{

    const [locationdrop,setlocationdrop]=useState([])
    function fetchLocation(){
    DropDownServices.getClientLocation().then((res)=>{
        setlocationdrop(res.result)
       
    }).catch((err)=>{
    
    })
    }
    
    useEffect(()=>{
        fetchLocation()
    },[])
    
    
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




  const[working,setWorking]=useState(props.working)  
const [initialStartDate,setInitialStartDate]=useState(dayjs(helpFunction.helperFunctionForEndDateInput(working.startDate)).format("YYYY-MM-DD"))
const[initialEndDate,setInitialEndDate]=useState(function dataFormated(){
    if(working.endDate !==null){
    return dayjs(helpFunction.helperFunctionForEndDateInput(working.endDate)).format("YYYY-MM-DD")
    }
    return ""
}
    )


const[location,setLocation]=useState(working.workingFrom)
const[wloc,setWloc]=useState(working.location)
const [other,setOther]=useState("")
    const [other1,setother1]=useState("")
    const handleOther=(e)=>{
        setOther(e.target.value)
    }
    useEffect(()=>{
       setWloc(other)
    },[other])

const loc=()=>{

    if(location==="CLIENT_LOCATION"){
       return  setWloc(working.location)
    }
    else if(location==="WFH" || location==="WFO"){
        return setWloc("")

    }
   
    else{
        return setWloc("")
    }
}

useEffect(()=>{loc()},[location])

const[empId,setEmpId]=useState(props.empId)
const[empWorkLocationId,setempWorkLocationId]=useState(props.working.empWorkLocationId)

const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
const textfield1={width: 400}
const[isLoading,setIsLoading]=useState(false)
let func1=props.onClose1

const updateEmployeeWorkInfo=(e)=>{
e.preventDefault()
setIsLoading(true)
EmployeeAccessLevelService.updateWorkingLocation(empWorkLocationId,empId,initialStartDate,initialEndDate,location,wloc).then((res)=>{

    if(res.status===200 && res.statusMessage==='success' ){
        setIsLoading(false)
        toast.success(res.message, {
            position: toast.POSITION.TOP_CENTER
          });
   func1()
      }
      else{
        setIsLoading(false)
        toast.error(res.message, {
            position: toast.POSITION.TOP_CENTER
        });
        func1()

      }
}).catch((error)=>{
    setIsLoading(false)
    toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
    });
    func1()
})

}



    return (
        isLoading ? <Loading/> :
        <Card style={AccessLevelWorkInfoModalStyle.CardStyle}>
        <CardContent>
            <center><Typography  style={AccessLevelWorkInfoModalStyle.TypographyStyle}>
           Update Working Location</Typography>
            </center>
           
            <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>


          <form onSubmit={updateEmployeeWorkInfo}> 
        <Box style={AccessLevelWorkInfoModalStyle.thirdBoxStyle}>
        <Grid container  gap={1.8}  style={AccessLevelWorkInfoModalStyle.gridContinerStyle}>
        <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
                    <TextField value={props.empId} className='outlined-basic-text-box' id="outlined-basic" label="Employee Id" variant="outlined" disabled style={AccessLevelWorkInfoModalStyle.textFieldStyle}/>
                </Grid>

                <Grid  item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>                                 
                  
              <TextField InputLabelProps={{shrink: true,}} required value={initialStartDate} onChange={(e)=>{setInitialStartDate(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic1" label="Start Date" variant="outlined" style={AccessLevelWorkInfoModalStyle.textFieldStyle} type='date' />  


                </Grid>
                {
                        status==="click"?
                        <Grid container style={AccessLevelWorkInfoModalStyle.gridContinerStyle}>
                        <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>

                        <Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         
                        <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>
                         </Grid>
                         </Grid>
                         :
                         <Grid container style={AccessLevelWorkInfoModalStyle.gridContinerStyle}>
                         <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
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
                  
                     <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={AccessLevelWorkInfoModalStyle.textFieldStyle} type='date'
                                      value={initialEndDate}
                          onChange={(e) => {setInitialEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }
     
              
               
              




                <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
                        <FormControl style={AccessLevelWorkInfoModalStyle.formcontrolStyle}>
                            <InputLabel id="demo-simple-select-label">Work Location</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e)=>{setLocation(e.target.value)}}
                                label="WorkLocation" 
                                value={location}>

                                <MenuItem value="CLIENT_LOCATION">CLIENT_LOCATION</MenuItem>
                                <MenuItem value="WFO">WFO</MenuItem>
                                <MenuItem value="WFH">WFH</MenuItem>
                            </Select>
                        </FormControl>
                </Grid>

                {location==="CLIENT_LOCATION" ?
                <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>

<FormControl style={AccessLevelWorkInfoModalStyle.formcontrolStyle}>
                                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Location"
                                        name="Location"
                                      onChange={(e)=>{setother1(e.target.value);setWloc(e.target.value)}}
                                      defaultValue={wloc}
                                      value={wloc}
                                    >
                                        {
                                            locationdrop.map(({clientLocationId,location})=>{
                                                return(
                                                <MenuItem  key={clientLocationId}  value={location}>{location}</MenuItem>)
                                            })
                                        }
                                        <MenuItem  key="Others"  value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>

                </Grid> :null}

                {
                            location==="Others"  || other1==="Others"?

                            <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
                            <TextField value={other} 
                            onChange={handleOther}
                            label="Other Location" required  placeholder="Enter Location" variant='outlined' sx={{width:400}}
                            fullWidth style={AccessLevelWorkInfoModalStyle.textFieldStyle}/>
                            </Grid>:null
                        }


                <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
            
            <Button  disableElevation sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} >UPDATE</Button>
               <Button  disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                </Grid>
               
                    
            </Grid>
            </Box>

            </form> 
<GlobalButton.GlobalDivider1/>  
</CardContent>

    </Card>

    )
}
