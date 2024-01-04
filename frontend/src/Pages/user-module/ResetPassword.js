import { Grid, Paper, TextField, Link,Divider } from "@mui/material";
import { Button } from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import userServiceModule from "../../Services/user-service/UserService";
import Swal from "sweetalert2";
import passwordErrorHandler from "../../Error/passwordErrorHandler";
import { useNavigate } from "react-router";
import Loading from "../../Components/LoadingComponent/Loading";
import { GlobalButton } from "../../Components/stylecomponent/GlobalButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { hasAuthority } from "../../Services/AccessLevel/AccessLevelService";
import { NoAuth } from "../../Components/HelperComponent/NoAuth";
import { CreationPagesStyle } from "../User-Information/CreationPages/CreationPagesStyle";

export const  USER_FORGOT_PASSWORD_PAGE_TITLE= "FORGOT_PASSWORD_PAGE"



export default function ResetPassword() {

    const textfield1 = { width: 400 }
    const[isLoading,setIsLoading]=useState(false)

    const [password, setPassword] = useState(
        {

            "oldPassword": "",
            "newPassword": "",
            "confirmPassword": ""

        }
    )

    const [message, setMessage] = useState("")
    const [validationError1, setValidationError1] = useState({})

   
    const navigate = useNavigate();
   
    const changePasswordHandle = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setValidationError1(passwordErrorHandler(password.oldPassword))
        
        if (password.newPassword !== password.confirmPassword) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "New password and confirm password doesn't match",
                showConfirmButton: false,
                timer: 1500
            }
            )
            setIsLoading(false)
            return
        }
         else if (password.newPassword.length <8 && password.confirmPassword.length<8){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Password length must be greater than or equal to 8",
                showConfirmButton: false,
                timer: 1500
            })
            setIsLoading(false)
            return

         }
        else {
            userServiceModule.changePassword(password).then((res) => {
                
                if (res.status === 200 && res.statusMessage === 'success') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/user/profile');
                }
                else {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    }
                    )
                }
            }).catch((error) => {
                setIsLoading(false)
                Swal.fire(
                    {
                        position: 'center',
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    }

                )
            })

        }
    }
  //backbutton
  const backbutton=useNavigate()

    return hasAuthority(USER_FORGOT_PASSWORD_PAGE_TITLE)? (
        isLoading?<Loading/>:
       
       <Box style={CreationPagesStyle.firstBox}>

<Box style={CreationPagesStyle.secondBox}>
                
                    <Typography  style={CreationPagesStyle.TypographyStyle} >CHANGE PASSWORD </Typography>
                <Grid style={{justifyContent:"center"}}>
<Button variant='outlined'  style={CreationPagesStyle.backButtonStyle}  onClick={()=>{backbutton("/user/profile")}}startIcon={<ArrowBackIosNewIcon/>}>back</Button>
                </Grid>
 </Box>
  <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
  <Box style={CreationPagesStyle.thirdBoxStyle}>
                <form onSubmit={changePasswordHandle}>
                  
                            <Grid container gap={2} style={CreationPagesStyle.gridContinerStyle}>

                                <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                                    <TextField  type="password" value={password.oldPassword}
                                        onChange={(event) => setPassword({
                                            ...password, oldPassword: event.target.value
                                        })}
                                        required className='outlined-basic-text-box' id="outlined-basic" label="Old Password" variant="outlined" style={CreationPagesStyle.textFieldStyle} />
                                </Grid>
                                {validationError1.name && <Typography variant="h5" style={{ color: "red", fontSize: "15px" }}>{validationError1.name}</Typography>}

                                <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                                    <TextField onCut={changePasswordHandle} onCopy={changePasswordHandle} onPaste={changePasswordHandle} type="password" value={password.newPassword} onChange={(event) => setPassword({
                                        ...password, newPassword: event.target.value
                                    })} required className='outlined-basic-text-box' id="outlined-basic" label="New Password" variant="outlined" style={CreationPagesStyle.textFieldStyle} />
                                </Grid>
                                {validationError1.name && <Typography variant="h5" style={{ color: "red", fontSize: "15px" }}>{validationError1.name}</Typography>}
                                <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                                    <TextField onCut={changePasswordHandle} onCopy={changePasswordHandle} onPaste={changePasswordHandle} type="password" value={password.confirmPassword} onChange={(event) => setPassword({
                                        ...password, confirmPassword: event.target.value
                                    })} required className='outlined-basic-text-box' id="outlined-basic" label="Confirm Password" variant="outlined" style={CreationPagesStyle.textFieldStyle}/>
                                </Grid>
                                {validationError1.name && <Typography variant="h5" style={{ color: "red", fontSize: "15px" }}>{validationError1.name}</Typography>}

                                <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                                    <Button  disableElevation type="submit" variant="contained" style={GlobalButton.OperationButton}>Submit</Button>
                                </Grid>

                                <Typography variant="h4" style={{ color: "red", fontSize: "19px" }}>{message}</Typography>

                            </Grid>
                </form>
                </Box>
        </Box>



    ):<NoAuth></NoAuth>
}