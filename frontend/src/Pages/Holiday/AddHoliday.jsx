import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HolidayEmpFormStyle } from './HolidayStyle'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import { HolidayService } from './HolidayService'
import { toast } from 'react-toastify'
import Loading from '../../Components/LoadingComponent/Loading'
import dayjs from 'dayjs'

export const AddHoliday = (props) => {

    const [isLoading,setIsLoading]=useState(false)
    const [addHolidays,setAddHolidays]=useState({
        "holidayDate":dayjs().format("YYYY-MM-DD"),
        "holidayDesc":"",
        "holidayYear":"",
        "createdBy":localStorage.getItem("id"),
    })
    const func1=props.onclose

    const HolidayModalHandle =(e)=>{
        e.preventDefault()
        HolidayService.createHoliday(addHolidays).then((res)=>{
            if (res.status===201 && res.message==='success') 
            {
                setIsLoading(false)
                toast.success(res.statusMessage, 
                    {
                position: toast.POSITION.TOP_CENTER
                    });
                func1()
                setAddHolidays({
                    "holidayDate":"",
                    "holidayDesc":"",
                    "holidayYear":"",
                    "createdBy":localStorage.getItem("id"),
                })
                
            } 
            else {
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

    // useEffect(()=>{

    // })`
  return (
    isLoading?<Loading/>:
   <Card style={HolidayEmpFormStyle.CardStyle}>
    <CardContent>
        <center>
            <Grid>
                <Typography style={HolidayEmpFormStyle.TypographyStyle}>ADD HOLIDAY</Typography>
            </Grid>
            </center>
            <GlobalButton.GlobalDivider/>
            <form onSubmit={HolidayModalHandle}>
                <Box style={HolidayEmpFormStyle.thirdBoxStyle}>
                    <Grid container gap={1.8} style={HolidayEmpFormStyle.gridContinerStyle}>
                        
                        <Grid item xs={12} style={HolidayEmpFormStyle.gridItemStyle}>
                            <TextField required value={addHolidays.holidayDate}
                            onChange={(e)=>{setAddHolidays({...addHolidays,holidayDate:e.target.value})}}
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
                            <TextField required value={addHolidays.holidayYear}
                            onChange={(e)=>{setAddHolidays({...addHolidays,holidayYear:e.target.value})}}
                            className='outlined-basic-text-box' id='outlined-basic1'
                            label="Holiday Year" variant='outlined'
                            style={HolidayEmpFormStyle.textFieldStyle} type='number'
                            />
                        </Grid>

                        <Grid item xs={12} style={HolidayEmpFormStyle.gridItemStyle}>
                            <TextField required
                             value={addHolidays.holidayDesc}
                             multiline rows={2}
                            onChange={(e)=>{setAddHolidays({...addHolidays,holidayDesc:e.target.value})}}
                            className='outlined-basic-text-box' id='outlined-basic1'
                            label="Holiday Desc" variant='outlined'
                            style={HolidayEmpFormStyle.textFieldStyle} type='text'
                            />
                        </Grid>

                        {/* <Grid item xs={12} style={HolidayEmpFormStyle.gridItemStyle}>
                            <TextField required value={addHolidays.createdBy}
                            onChange={(e)=>{setAddHolidays({...addHolidays,createdBy:e.target.value})}}
                            className='outlined-basic-text-box' id='outlined-basic1'
                            label="Posted By" variant='outlined'
                            style={HolidayEmpFormStyle.textFieldStyle}
                            />
                        </Grid> */}

                    
                        
                    <Grid item xs={12} style={ HolidayEmpFormStyle.gridItemStyle}>
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>Submit</Button>

                        <Button  disableElevation  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onclose} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                    </Grid>



                    </Grid>

                </Box>


            </form>
     <GlobalButton.GlobalDivider/>   
    </CardContent>
   </Card>
  )
}
