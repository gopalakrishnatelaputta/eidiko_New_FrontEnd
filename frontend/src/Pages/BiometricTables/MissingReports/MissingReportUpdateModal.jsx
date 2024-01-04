import React, { useState } from 'react'
import Loading from '../../../Components/LoadingComponent/Loading'
import { BiometricServiceModule } from '../../../Services/BiometricService/BiometricServiceModule'
import { MissingReportStyle } from './StyleMissingReportUpdateModal'
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'



export default function MissingReportUpdateModal(props) {

const[isLoading,setIsLoading]=useState(false)
const[monthYear,setmonthYear]=useState({"month":dayjs().format("MM")-1,"year":dayjs().format("YYYY")})
    let func1=props.onClose
    const handleMissingReport=(e)=>{
e.preventDefault()

        setIsLoading(true)


BiometricServiceModule.updateBiometricMissingReport(monthYear.month,monthYear.year).then((res)=>{

    if(res.status===200)
    {
         setIsLoading(false)
         toast.success(res.message, {
             position: toast.POSITION.TOP_CENTER
           });
           func1()
    }

    else if(res.status===201){
        setIsLoading(false)
        toast.info(res.message, {
            position: toast.POSITION.TOP_CENTER
          });
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
     
            <Card style={MissingReportStyle.CardStyle}>
                                        <CardContent>
                                            <center>
                                            <Typography style={MissingReportStyle.TypographyStyle}>UPDATE MISSING REPORTS</Typography>
                                            </center>
                                        <GlobalButton.GlobalDivider/>

                                            <center>
                                             <form onSubmit={handleMissingReport}>
                                                <Box style={MissingReportStyle.thirdBoxStyle}>

<Grid container style={MissingReportStyle.gridContinerStyle} >
<Grid item xs={6}  style={MissingReportStyle.gridItemStyle} >

<FormControl style={MissingReportStyle.textFieldStyle}>
<InputLabel id="demo-multiple-name-label">Month</InputLabel>
        <Select 
      value={monthYear.month}
         onChange={(e)=>{setmonthYear({...monthYear,month:e.target.value})}}
          labelId="demo-multiple-name-label"
          id="demo-multiple-start"
          name="month"
          label="Month"
        >
          <MenuItem value="0" >Jan</MenuItem>
          <MenuItem value="1" >Feb</MenuItem>
          <MenuItem value="2" >Mar</MenuItem>
          <MenuItem value="3" >April</MenuItem>
          <MenuItem value="4" >May</MenuItem>
          <MenuItem value="5" >June</MenuItem>
          <MenuItem value="6" >July</MenuItem>
          <MenuItem value="7" >Aug</MenuItem>
          <MenuItem value="8" >Sept</MenuItem>
          <MenuItem value="9" >Oct</MenuItem>
          <MenuItem value="10" >Nov</MenuItem>
          <MenuItem value="11" >Dec</MenuItem>
                                      
        </Select>
      </FormControl>
 
        </Grid >
        <Grid item xs={6}  style={MissingReportStyle.gridItemStyle}>
 <TextField style={MissingReportStyle.textFieldStyle} required name="year"  value={monthYear.year} onChange={(e)=>{setmonthYear({...monthYear,year:e.target.value})}} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
        </Grid >

                                                    <Grid item xs={12} style={MissingReportStyle.gridItemStyle} sx={{marginTop:"20px"}}>
                                                        <Button     sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained"
                                                         style={GlobalButton.OperationButton}>UPDATE</Button>

                                                        <Button  disableElevation sx={{marginLeft:"10px",marginTop:"10px"}} onClick={props.onClose} variant='contained' 
                                                         style={GlobalButton.HaltButton}>Cancel</Button>
                                                    </Grid>
                                                    
                                                  
                                                </Grid>
                                                </Box>
                                                </form>
                                                <GlobalButton.GlobalDivider/>
                                            </center>
                                        </CardContent>
            </Card>
  )
}
