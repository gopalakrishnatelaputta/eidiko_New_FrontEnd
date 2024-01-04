import { Grid, Paper, TextField, Button, Link, Avatar, Typography, Card, Box } from "@mui/material";
import eidiko1 from '../../images/eidiko1.jpg';
import img2 from '../../images/img2.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import validation from "../../Error/LoginErrorHandler";
import passwordErrorHandler from "../../Error/passwordErrorHandler";
import { GlobalStyle1 } from "../../Components/stylecomponent/forFirstDiv";
import userServiceModule from "../../Services/user-service/UserService";
import Loading from "../../Components/LoadingComponent/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { GlobalButton } from "../../Components/stylecomponent/GlobalButton";
import "./Form1.css"



export default function Login() {



    const grid2 = { height: "500px", width: "500px", backgroundColor: "#2196F3" }
    const grid3 = { height: "500px", width: "500px", backgroundColor: "FFFFFF", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", verticalAlign: "middle" }
    const button1 = { backgroundColor: "#2196F3", color: "white", minWidth:"40%",width: "auto", borderRadius: "20px", marginTop: "20px", display: "flex",
    boxShadow: "rgba(12, 197, 21, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
}


    const [employeeId, setEmployeeId] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [isloading, setIsLoading] = useState(false)


    const navigate = useNavigate()
    const [validationError, setValidationError] = useState({})
    const [validationError1, setValidationError1] = useState({})


    const HandleEmployeeId = (e) => {

        setEmployeeId(e.target.value)
    }
    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }
    const loginHandle = (e) => {
        e.preventDefault();
        setIsLoading(true)
        setValidationError(validation(employeeId))

        setValidationError1(passwordErrorHandler(password))

        userServiceModule.logService(employeeId, password).then((res) => {
           
            if (res.status === 200) {
                setIsLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'login succesfull | redirecting to dashboard',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/user/profile")
            }
            else {
                setIsLoading(false)
                setError("Please enter valid userId or password")
                toast.error(res.message,{position:toast.POSITION.TOP_RIGHT})
                //navigate("/login")
            }


        }).catch(error => {
            setIsLoading(false)
            toast.error(error.response.data.message,
            {
                position: toast.POSITION.TOP_RIGHT
              }
            )

        })

    }







    return (


        isloading ? <Loading /> :
    <Box className="container1">
	<Box className="screen">
		<Box className="screen__content">
        <form onSubmit={loginHandle} >
                            < Grid container >
                                <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center"}}>
                                    <Avatar sx={{ width: 120, height: 120, backgroundColor: "#2196F3",marginTop:"20px" }}>
                                        <img src={eidiko1} style={{ display: "flex", height: "100px", width: "150px" }} alt="not found"></img>
                                    </Avatar>
                                </Grid>

                                <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",mt:"10px"}}>
                                    <h2>Login</h2>
                                </Grid>

                               

                                    <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",mt:"20px"}}>

                                        <TextField value={employeeId} onChange={HandleEmployeeId} id="employeeId1" label="Employee Id" name="Employeeid" type="number" max="4" placeholder="EmployeeId" sx={{width:"300px",borderRadius: "20px" }} required></TextField>
                                    </Grid>
                                    {validationError.name && <p style={{ color: "red", fontSize: "15px" }}>{validationError.name}</p>}



                                    <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",mt:"20px"}}>

                                        <TextField value={password} onChange={HandlePassword} sx={{ width:"300px",borderRadius: "20px" }} id="password1" label="Password" name="password" type="password" placeholder="Password"  required

                                        ></TextField>

                                    </Grid>
                                    {validationError1.name && <Typography variant="h5" style={{ color: "red", fontSize: "15px" }}>{validationError1.name}</Typography>}


                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-end"
                                    >
                                        <h4 onClick={()=>{navigate("/forgot-password")}} style={{ color:"#263238",marginLeft: "170px", marginTop: "5px" ,cursor:"pointer"}}>Forgot Password?</h4>

                                    </Grid>

                                    <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center"}}>
                                        <Button  disableElevation id="loginbutton" variant="contained" style={button1} type="submit">login</Button>
                                    </Grid>

                                    <p style={{ color: "red", fontSize: "19px" }}>{error}</p>
                               
                            </Grid>

                            </form>


		</Box>
		<Grid container sx={{display:"flex"}} className="screen__background">
			<Grid item xs={12}className="screen__background__shape screen__background__shape4"></Grid>
			<Grid item xs={12} className="screen__background__shape screen__background__shape3"></Grid>		
			<Grid item xs={12} className="screen__background__shape screen__background__shape2"></Grid>
			<Grid item xs={12}  className="screen__background__shape screen__background__shape1"></Grid>
		</Grid>		
	</Box>

            </Box>

    );

}