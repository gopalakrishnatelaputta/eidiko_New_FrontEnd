import {Button, Card, CardContent,TextField,Grid,Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import { toast } from "react-toastify";
import Loading from '../../../Components/LoadingComponent/Loading';
import { AccessLevelContactModalStyle } from './AccessLevelPageWorkInfoModalStyle';



export const ContactModal= (props) => {

    const[contact1,setContact1]=useState(props.contact)
    const[contact,setContact]=useState(props.contact)
    const[isLoading,setIsLoading]=useState(false)
const[empId,setEmpId]=useState(props.empId)
let func1=props.onClose

    const handleContact=(e)=>{
        setIsLoading(true)

        if(contact1==contact){
            setIsLoading(false)
                toast.info("You have entered same number, please enter a different number", {
                    position: toast.POSITION.TOP_CENTER
                });
                func1() 
                return
        }
        else{

        
        EmployeeAccessLevelService.updateContact(contact,empId).then((res)=>{
           // console.log(res)
    if(res.status===200 && res.statusMessage==='success' )
    {
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
}
 
    return (
        isLoading?<Loading/>:
     
            <Card style={AccessLevelContactModalStyle.CardStyle}>
             <CardContent>
                                          
                                            <center>
                                                <Typography >UPDATE CONTACT</Typography>
                                                <GlobalButton.GlobalDivider/>

                                              
                                             <form onSubmit={handleContact}>
                                             <Box style={AccessLevelContactModalStyle.thirdBoxStyle}>
                                                <Grid container spacing={1.8} style={AccessLevelContactModalStyle.gridContinerStyle}>
                                                    <Grid item xs={12} style={AccessLevelContactModalStyle.gridItemStyle}>
                                                    <TextField InputProps={{ inputProps: { min: 1111111111, max: 9999999999 } }} value={contact} onChange={(e)=>{setContact(e.target.value)}} type="number" label="Update Contact" required placeholder="update contact" variant='outlined'  style={AccessLevelContactModalStyle.textFieldStyle}></TextField>
                                                    </Grid>
                                                    <Grid item xs={12} style={AccessLevelContactModalStyle.gridItemStyle} >
                                                     <Button  disableElevation sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} >UPDATE</Button>
                                                     <Button  disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose}  variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
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
