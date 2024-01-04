import {Button, Card, CardContent,TextField,Grid,Box, Typography } from '@mui/material';
import React, { useState } from 'react';
// import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
// import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import { toast } from "react-toastify";
import Loading from '../../../Components/LoadingComponent/Loading';
import userServiceModule from '../../../Services/user-service/UserService';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { ContactModalStyle } from './WorkInfoModalStyle';




export const ProfileContactModal= (props) => {
   

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



        userServiceModule.updateContact(contact,empId).then((res)=>{
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
 
    return  (
        isLoading?<Loading/>:
     
            <Card style={ContactModalStyle.CardStyle}>
                                        <CardContent>


                                            <center>
                                                <Typography style={ContactModalStyle.TypographyStyle}>UPDATE CONTACT</Typography>
                                                <GlobalButton.GlobalDivider/>
                                            
                                             <form onSubmit={handleContact}>
                                                <Box style={ContactModalStyle.thirdBoxStyle}>

                                              
                                                <Grid container spacing={1} style={ContactModalStyle.gridContinerStyle} >
                                                    <Grid item xs={12} style={ContactModalStyle.gridItemStyle}>
                                                    <TextField InputProps={{ inputProps: { min: 1111111111, max: 9999999999 } }} value={contact} onChange={(e)=>{setContact(e.target.value)}} type="number" label="Update Contact" required placeholder="update contact" variant='outlined'  style={ContactModalStyle.textFieldStyle}></TextField>
                                                    </Grid>

                                                    <Grid item xs={12} style={ContactModalStyle.gridItemStyle}>
                                                        <Button     sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained"
                                                         style={GlobalButton.OperationButton}>UPDATE</Button>

                                                        <Button  disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose} variant='contained' 
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
