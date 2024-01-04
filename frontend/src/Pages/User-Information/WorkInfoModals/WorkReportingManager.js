import { Autocomplete, Box, Button, Card, CardContent, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Person3Icon from '@mui/icons-material/Person3';
import { useState } from 'react';
import userServiceModule from '../../../Services/user-service/UserService';
import Swal from 'sweetalert2';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import {Divider} from '@mui/material';
import Loading from '../../../Components/LoadingComponent/Loading';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import { toast } from "react-toastify";
import AutoEmpSearch from '../../../Services/AutoEmpSearch/AutoEmpSearch';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { WorkInfoModalStyle } from './WorkInfoModalStyle';



export const WorkReportingManager = (props) => {

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


//----------------------

const[manager1,setManager1]=useState(props.manager1)
const[empId,setEmpId]=useState(manager1.empId)
const[id,setId]=useState(manager1.id)
const[managerId,setManagerId]=useState(manager1.reportingManagerId)
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


//AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();

useEffect(()=>{
 AutoEmpSearch(records).then((res)=>{
   setData(res.data.result)
 })

   },[records])
   //-------------
  
const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
  const textfield1={width: 400}
    
const [isLoading,setIsLoading]=useState(false)
 const func1=props.onClose1



const reportingManagerModalHandle=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    userServiceModule.UpdateReportingManager(id,empId,managerId,startDate,endDate).then((res)=>{
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
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
              func1()

     })
    
    
    }


    return (
        isLoading?<Loading/>:
        <Card style={WorkInfoModalStyle.CardStyle}>
        <CardContent>
            <center>
            <Grid>
            
                 <Typography style={WorkInfoModalStyle.TypographyStyle}>
                 UPDATE REPORTING MANAGER
                 </Typography>     
            </Grid>
            </center>
            <GlobalButton.GlobalDivider1/>
       
            <form onSubmit={reportingManagerModalHandle}>

              <Box  style={WorkInfoModalStyle.thirdBoxStyle}>
                <Grid container  gap={1.8} style={WorkInfoModalStyle.gridContinerStyle}>
                 <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
                        <TextField required value={empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" 
                        label="Employee Id" variant="outlined" style={WorkInfoModalStyle.textFieldStyle} disabled type='number'
                        onChange={(e)=>{setEmpId(e.target.value)}} ></TextField>
                    </Grid>

                    <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
                 <Autocomplete 
                style={WorkInfoModalStyle.textFieldStyle}
                    onChange={(e,value)=>{
                        if(value==null){
    
                          return setManagerId("")
                        }
                        let data=value.match("[0-9]*")
                       return  setManagerId(data[0])
    
                      }}
            
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                               
                                required
                                
                                 {...params} 
                                label='Manager Id'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                               
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />}
            />    
                    </Grid>
                   

                    <Grid item xs={12} style={WorkInfoModalStyle.gridItemStyle}>
            <TextField required value={startDate} 
            onChange={(e)=>{setstartDate(e.target.value)}} 
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
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>UPDATE</Button>

                        <Button  disableElevation  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                    </Grid>
                   
                </Grid>
            </Box>
            </form>
        <GlobalButton.GlobalDivider1/>
        </CardContent>
        </Card>

    )
}
