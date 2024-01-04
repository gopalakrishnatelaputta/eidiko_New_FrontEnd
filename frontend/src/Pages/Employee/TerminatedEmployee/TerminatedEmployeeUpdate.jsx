import React, { useEffect, useState } from 'react'
import { TerminatedEmployeeFormStyle } from './TerminatedEmployeeFormStyle'
import { Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import Loading from '../../../Components/LoadingComponent/Loading'
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton'
import { ResignedEmployee } from '../../../Services/employee-service/EmployeeService'
import { toast } from 'react-toastify'


export default function TerminatedEmployeeUpdate(props) {


const [updateData,setUpdateData]=useState(props.updatedata2)
console.log(props);
    const [isLoading,setIsLoading]=useState(false)

    const[termination,setTermination]=useState({
        "resignedId":updateData.resignedId,
        "startDate":updateData.startDate,
        "endDate":updateData.endDate,
        "modifiedBy":localStorage.getItem("id"),

    })

const func1=props.onClose1

const TerminationModalHandle=(e)=>{
e.preventDefault()
ResignedEmployee.updateResignedEmployee(termination).then((res)=>{
    if(res.status===200 && res.statusMessage==='success' )
    {
         setIsLoading(false)
         toast.success(res.message, {
             position: toast.POSITION.TOP_CENTER
           });
           func1()

           setTermination({
            "startDate":dayjs().format("YYYY-MM-DD"),
            "endDate":dayjs().format("YYYY-MM-DD"),
            "modifiedBy":localStorage.getItem("id"),
        
    
        })
    }
    else{
        setIsLoading(false)
        toast.info(res.result, {
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



  return (
    isLoading?<Loading/>:
        <Card style={ TerminatedEmployeeFormStyle.CardStyle}>
        <CardContent>
            <center>
            <Grid>
            
                 <Typography style={ TerminatedEmployeeFormStyle.TypographyStyle}>
                UPDATE RESIGNED EMPLOYEE
                 </Typography>     
            </Grid>
            </center>
            <GlobalButton.GlobalDivider/>
       
            <form onSubmit={TerminationModalHandle}>

              <Box  style={ TerminatedEmployeeFormStyle.thirdBoxStyle}>
                <Grid container  gap={1.2} style={ TerminatedEmployeeFormStyle.gridContinerStyle}>

                    <Grid item xs={12} style={ TerminatedEmployeeFormStyle.gridItemStyle}>
                    <TextField disabled label='empId'  value={updateData.empId}
                                 
				   id="outlined-basic1" style={TerminatedEmployeeFormStyle.textFieldStyle} type='number'/> 
                    </Grid>
                   

                    <Grid item xs={12} style={ TerminatedEmployeeFormStyle.gridItemStyle}>
            <TextField required value={termination.startDate} 
            onChange={(e)=>{setTermination({...termination,startDate:e.target.value})}}
            className='outlined-basic-text-box' id="outlined-basic1" 
            label="Start Date" variant="outlined" 
            style={ TerminatedEmployeeFormStyle.textFieldStyle} type='date' />  
                    </Grid >

                  
                     <Grid item xs={12} style={ TerminatedEmployeeFormStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={ TerminatedEmployeeFormStyle.textFieldStyle} type='date'
                                      value={termination.endDate}
                          onChange={(e) => {setTermination({...termination,endDate:e.target.value})}} />  
                                  
                     </Grid >
        
                   
                
                    <Grid item xs={12} style={ TerminatedEmployeeFormStyle.gridItemStyle}>
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>Submit</Button>

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

