import React, { useEffect, useState } from 'react'
import { TerminatedEmployeeFormStyle } from './TerminatedEmployeeFormStyle'
import { Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import Loading from '../../../Components/LoadingComponent/Loading'
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton'
import AutoEmpSearch from '../../../Services/AutoEmpSearch/AutoEmpSearch'
import { ResignedEmployee } from '../../../Services/employee-service/EmployeeService'
import { toast } from 'react-toastify'


export default function TerminatedEmployeeForm(props) {
//AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();
const [status,setStatus]=useState(false)


useEffect(()=>{
 AutoEmpSearch(records).then((res)=>{
   setData(res.data.result)
 })

   },[records])
   
    const [isLoading,setIsLoading]=useState(false)

    const[termination,setTermination]=useState({
        "empId":"",
        "startDate":dayjs().format("YYYY-MM-DD"),
        "endDate":dayjs().format("YYYY-MM-DD"),
        "modifiedBy":localStorage.getItem("id"),
        "comment":""

    })

const func1=props.onclose

const TerminationModalHandle=(e)=>{
e.preventDefault()
ResignedEmployee.ResignationCreation(termination).then((res)=>{
    if(res.status===200 && res.statusMessage==='success' )
    {
         setIsLoading(false)
         toast.success(res.message, {
             position: toast.POSITION.TOP_CENTER
           });
           func1()

           setTermination({
            "empId":"",
            "startDate":dayjs().format("YYYY-MM-DD"),
            "endDate":dayjs().format("YYYY-MM-DD"),
            "modifiedBy":localStorage.getItem("id"),
            "comment":""
    
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
                 RESIGNED EMPLOYEE
                 </Typography>     
            </Grid>
            </center>
            <GlobalButton.GlobalDivider1/>
       
            <form onSubmit={TerminationModalHandle}>

              <Box  style={ TerminatedEmployeeFormStyle.thirdBoxStyle}>
                <Grid container  gap={1.8} style={ TerminatedEmployeeFormStyle.gridContinerStyle}>

                    <Grid item xs={12} style={ TerminatedEmployeeFormStyle.gridItemStyle}>
                 <Autocomplete 
                style={ TerminatedEmployeeFormStyle.textFieldStyle}
                    onChange={(e,value)=>{
                        if(value==null){
    
                          return setTermination({...termination,empId:""})
                        }
                        let data=value.match("[0-9]*")
                       return setTermination({...termination,empId:data[0]})
    
                      }}
            
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                               
                                required
                                
                                 {...params} 
                                label='Employee Id'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                               
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />}
            />    
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
                                 
                                 <TextField 
                                 multiline rows={2}
                                 className='outlined-basic-text-box' id="outlined-basic1" 
                                 label="Comment" variant="outlined" style={ TerminatedEmployeeFormStyle.textFieldStyle} type="text"
                                               value={termination.comment}
                                   onChange={(e) => {setTermination({...termination,comment:e.target.value})}} />  
                                           
                              </Grid >
                   
                
                    <Grid item xs={12} style={ TerminatedEmployeeFormStyle.gridItemStyle}>
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>Submit</Button>

                        <Button  disableElevation  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onclose} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                    </Grid>
                   
                </Grid>
            </Box>
            </form>
        <GlobalButton.GlobalDivider1/>
        </CardContent>
        </Card>
  )
}
