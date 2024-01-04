import React, { useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { HolidayEmpFormStyle, holidayStyle } from './HolidayStyle'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import { HolidayService } from './HolidayService'
import { toast } from 'react-toastify'

export const UpdateHolidays = (props) => {

const [holi,setHoli]=useState(props.uHoliday)
    const func1=props.onclose
    const [isLoading,setIsLoading]=useState(false)

    const [updateHolidays,setUpdateHolidays]=useState({
        "holidayDate":holi.holidayDate,
        "holidayDesc":holi.holidayDesc,
       
    })

const updateHolidaysHandler= (e)=>{  
    e.preventDefault()
    setIsLoading(true)
    HolidayService.updateHoliday(holi.holidayListId,updateHolidays).then((res)=>{
        console.log(res);
        if (res.status===200 && res.statusMessage==='OK') {
            setIsLoading(false)
            toast.success("Holiday Data Updated Successfully",{
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
    isLoading? <Loading/>:
    <Card style={HolidayEmpFormStyle.CardStyle}>
        <CardContent>
            <center>
                <Grid>
                    <Typography style={HolidayEmpFormStyle.TypographyStyle}>UPDATE HOLIDAYS</Typography>
                </Grid>
            </center>
            <GlobalButton.GlobalDivider1/>

            <form onSubmit={updateHolidaysHandler}>
                <Box style={holidayStyle.thirdBoxStyle}>
                    <Grid container gap={1.8} style={HolidayEmpFormStyle.gridContinerStyle}>
                        
                    <Grid item xs={12} style={HolidayEmpFormStyle.gridItemStyle}>
                            <TextField required value={updateHolidays.holidayDate}
                            onChange={(e)=>{setUpdateHolidays({...updateHolidays,holidayDate:e.target.value})}}
                            label="Holiday Date" 
                            variant='outlined'
                            style={HolidayEmpFormStyle.textFieldStyle}
                             type='date'
                             InputLabelProps={{
                                shrink: true, // Add the shrink property here
                              }}
                            />
                        </Grid>                     
                        <Grid item xs={12} style={HolidayEmpFormStyle.gridItemStyle}>
                            <TextField required
                             value={updateHolidays.holidayDesc}
                             multiline
                              rows={3}
                            onChange={(e)=>{setUpdateHolidays({...updateHolidays,holidayDesc:e.target.value})}}
                            className='outlined-basic-text-box' id='outlined-basic1'
                            label="Holiday Desc" variant='outlined'
                            style={HolidayEmpFormStyle.textFieldStyle} type='text'
                            />
                        </Grid>                       
                    <Grid item xs={12} style={ HolidayEmpFormStyle.gridItemStyle}>
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
