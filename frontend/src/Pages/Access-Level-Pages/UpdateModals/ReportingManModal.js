import { Autocomplete, Box, Button, Card, CardContent, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Person3Icon from '@mui/icons-material/Person3';
import { useState } from 'react';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import {Divider} from '@mui/material';
import Loading from '../../../Components/LoadingComponent/Loading';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import { toast } from "react-toastify";
import AutoEmpSearch from '../../../Services/AutoEmpSearch/AutoEmpSearch';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import dayjs from 'dayjs';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AccessLevelWorkInfoModalStyle } from './AccessLevelPageWorkInfoModalStyle';



export const ReportingManModal = (props) => {
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


 const[managerData,setManagerData]=useState(props.manager)
 const[managerId,setManagerId]=useState(managerData.reportingManagerId)
 
 const [initialStartDate,setInitialStartDate]=useState(dayjs(helpFunction.helperFunctionForEndDateInput(managerData.startDate)).format("YYYY-MM-DD"))
 const[initialEndDate,setInitialEndDate]=useState(
    function dataFormated(){
        if(managerData.endDate !==null){
        return  dayjs(helpFunction.helperFunctionForEndDateInput(managerData.endDate)).format("YYYY-MM-DD")
        }
        return ""
    }
    
   )


const[empId,setEmpId]=useState(managerData.empId)
const [reportingManagerId,setreportingManagerId]=useState(managerData.id)
const [isLoading,setIsLoading]=useState(false)
let func1=props.onClose1
const reportingManagerModalHandle=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(initialEndDate)
    EmployeeAccessLevelService.updateReportingManager(empId,managerId,initialStartDate,endDate1,reportingManagerId).then((res)=>{
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
        
        })}
 //AutoComplete
 const [data, setData]=useState([]);
 const[records,setRecords]=useState();
 
 useEffect(()=>{
   AutoEmpSearch(records).then((res)=>{
     setData(res.data.result)
   })
     },[records])


    return (
        isLoading?<Loading/>:
        <Card style={AccessLevelWorkInfoModalStyle.CardStyle}>
        <CardContent>
            <center>
            <Grid>
                 <Typography style={AccessLevelWorkInfoModalStyle.TypographyStyle} >
                 UPDATE REPORTING MANAGER
                 </Typography>
            </Grid>
            </center>
            <GlobalButton.GlobalDivider1/>
            <form onSubmit={reportingManagerModalHandle}>
              <Box style={AccessLevelWorkInfoModalStyle.thirdBoxStyle}>
                <Grid container  gap={1.8} style={AccessLevelWorkInfoModalStyle.gridContinerStyle}>
                 <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
                        <TextField required value={empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" label="Employee Id" variant="outlined" style={AccessLevelWorkInfoModalStyle.textFieldStyle} disabled type='number' ></TextField>
                    </Grid>
                    <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
                     <Autocomplete 
                      onChange={(e,value)=>{
                        if(value==null){
    
                          return setManagerId("")
                        }
                        let data=value.match("[0-9]*")
                       return  setManagerId(data[0])
    
                      }}
                      style={AccessLevelWorkInfoModalStyle.textFieldStyle}
                                    options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                InputProps={{ inputProps: { maxLength:50,minLength:5} }}
                                required
                                 {...params} 
                                 label="Manager Id"
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                               
                                type='text'
                    
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                    </Grid>
                
                    <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle}>
            <TextField InputLabelProps={{
    shrink: true,
}} required value={initialStartDate} onChange={(e)=>{setInitialStartDate(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic1" label="Start Date" variant="outlined" style={AccessLevelWorkInfoModalStyle.textFieldStyle} type='date' />  
                    </Grid >


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
                         <Grid item xs={12} style={AccessLevelWorkInfoModalStyle.gridItemStyle} >
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
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>UPDATE</Button>

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
