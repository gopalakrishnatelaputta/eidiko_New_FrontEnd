import { Box, Button, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Person3Icon from '@mui/icons-material/Person3';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import {Divider} from '@mui/material';
import Loading from '../../../Components/LoadingComponent/Loading';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import userServiceModule from '../../../Services/user-service/UserService';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { DropDownServices } from '../../../Services/DropDownServices/DropDownServices';
import { WorkInfoModalStyle } from './WorkInfoModalStyle';




export const WorkLocationNew = (props) => {


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
    
    






 const[managerId,setManagerId]=useState(props.manager)
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

  //---------------------------------------



  const[workingFrom,setWorkingFrom]=useState(managerId.workingFrom)
  const[location,setLocation]=useState(managerId.location)
  const [other,setOther]=useState("")
  const [other1,setother1]=useState("")
  const handleOther=(e)=>{
      setOther(e.target.value)
  }
  useEffect(()=>{
      setLocation(other)
  },[other])


  
  const loc=()=>{

    if(workingFrom==="CLIENT_LOCATION"){
       return  setLocation(managerId.location)
    }
    else if(workingFrom==="WFH" || workingFrom==="WFO"){
        return setLocation("")

    }
   
    else{
        return setLocation("")
    }
}

useEffect(()=>{loc()},[workingFrom])



  const workinFromHandle=(e)=>{
    setWorkingFrom(e.target.value)
}
  const [startDate,setStartDate]=useState(function stringToDate(){
    let sd=managerId.startDate
    if(sd!==null){
    return new Date(sd).toISOString().slice(0, 10)}
    else{
        return ""
    }


  })

  const[endDate,setEndDate]=useState(function stringToDate(){
    let ed=managerId.endDate
    if(ed!==null){
        return new Date(ed).toISOString().slice(0,10)
    }
    else{
        return ""
    }
   
  })
 
const[empId,setEmpId]=useState(props.empId)
const[empWorkLocationId,setEmpWorkLocationId]=useState(managerId.empWorkLocationId)
const [isLoading,setIsLoading]=useState(false)
const func1=props.onClose1


 const workLocationModalHandle=(e)=>{
    e.preventDefault()
   



    setIsLoading(true)


    userServiceModule.UpdateWorkingLocation(empWorkLocationId,empId,startDate,endDate,workingFrom,location).then((res)=>{
        if(res.status===200 && res.statusMessage==='success'){

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
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                func1()
     })

    }

    

    return(
        isLoading?<Loading/>:
        <Card style={WorkInfoModalStyle.CardStyle}>
        <CardContent>
            <center>
            <Grid>
                 <Typography style={WorkInfoModalStyle.TypographyStyle} >
                WORK LOCATION
                 </Typography>     
            </Grid>
            </center>
            <GlobalButton.GlobalDivider1/>
            <form onSubmit={workLocationModalHandle}>
        
              <Box style={WorkInfoModalStyle.thirdBoxStyle}>
                <Grid container  gap={1.8}  style={WorkInfoModalStyle.gridContinerStyle} >
               
                <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
                        <TextField required value={empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" 
                        label="Employee Id" variant="outlined" style={WorkInfoModalStyle.textFieldStyle} disabled type='number'
                        onChange={(e)=>{setEmpId(e.target.value)}}
                         >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
            <TextField required value={startDate} 
            onChange={(e)=>{setStartDate(e.target.value)}} 
            className='outlined-basic-text-box' id="outlined-basic1" 
            label="Start Date" variant="outlined" 
            style={WorkInfoModalStyle.textFieldStyle} type='date' />  
                    </Grid >
                   
                    {
                        status==="click"?
                        <Grid container>
                        <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>

                        <Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         
                        <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>
                         </Grid>
                         </Grid>
                         :
                         <Grid container>
                         <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
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
                  
                     <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={WorkInfoModalStyle.textFieldStyle} type='date'
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }

                <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
                                <FormControl style={WorkInfoModalStyle.formcontrolStyle}>
                                    <InputLabel id="demo-simple-select-label">Work Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="WorkLocation"
                                        name="workingfrom"
                                      onChange={workinFromHandle}
                                      value={workingFrom}

                                    >
                                        <MenuItem value="CLIENT_LOCATION" >CLIENT_LOCATION</MenuItem>
                                        <MenuItem   value="WFO">WFO</MenuItem>
                                        <MenuItem   value="WFH">WFH</MenuItem>
                                    </Select>
                                </FormControl>
                        </Grid>

                         {workingFrom==="CLIENT_LOCATION" ? 
                        <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
                           <FormControl style={WorkInfoModalStyle.formcontrolStyle}>
                                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Location"
                                        name="loccation"
                                      onChange={(e)=>{setother1(e.target.value);setLocation(e.target.value)}}
                                      value={location}
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



                        </Grid>

                        :null
 
                        }
                             
                             {
                            location==="Others"  || other1==="Others"?

                            <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
                            <TextField value={other} 
                            onChange={handleOther}
                            label="Other Location" required  placeholder="Enter Location" variant='outlined' sx={{width:400}}
                            fullWidth style={WorkInfoModalStyle.textFieldStyle}/>
                            </Grid>:null

                        }




                
                    <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>UPDATE</Button>

                        <Button  disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                    </Grid>
                   
                </Grid>
            </Box>
            </form>
        <GlobalButton.GlobalDivider/>
        </CardContent>
        </Card>

    )
}
