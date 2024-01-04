import { PersonAddOutlined } from '@mui/icons-material'
import { Autocomplete, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Paper } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { createEmployee } from '../../Services/employee-service/EmployeeService';
import Swal from 'sweetalert2';
import {Divider} from '@mui/material';
import {IconButton} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Loading from '../../Components/LoadingComponent/Loading';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from "../../Components/HelperComponent/NoAuth";
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { EmployeeCreationPageStyle } from './EmployeeCreationPageStyle';
import { DropDownServices } from '../../Services/DropDownServices/DropDownServices';


export const  CREATE_EMPLOYEE_PAGE_TITLE= "CREATE_EMPLOYEE"


const CreateEmployee = () => {

    // const [designation,setdesignation]=useState([])
    // function fetchdesignation(){
    // DropDownServices.getdesignations().then((res)=>{
    //     setdesignation(res.result)
       
    // }).catch((err)=>{
    
    // })
    // }
    // useEffect(()=>{
    //     fetchdesignation()
    // },[])
    



    const navigate=useNavigate()
    const employeeTableHandle=()=>{
        navigate("/user/employees")
    }


  
    const[isLoading,setIsLoading]=useState(false)

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const handleClose = () => {
        setState({ ...state, open: false });
      };



    const [employee, setEmployee] = useState({
        "empId": "",
        "empName": "",
        "emailId": "",
        "dateOfJoining": dayjs().format("YYYY-MM-DD"),
        "contactNo": "",
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
             
        createEmployee(employee).then(

            res => {
                
               // console.log(res);
                if (res.status === 200 && res.statusMessage === 'success') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setEmployee({
                        "empId": "",
                        "empName": "",
                        "emailId": "",
                        "dateOfJoining": dayjs().format("YYYY-MM-DD"),
                        "contactNo": "",
                    })
                } else {
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
            }
        ).catch(err => {
            setIsLoading(false)
            Swal.fire(
                {

                    position: 'center',
                    icon: 'error',
                    title: err.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                }

            )
        })

    }

//backbutton
const backbutton=useNavigate()
 //AutoComplete
const[managerId,setManagerId]=useState("")
const [data, setData]=useState([]);
const[records,setRecords]=useState();
console.log(managerId)

useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })
    },[records])

    return hasAuthority( CREATE_EMPLOYEE_PAGE_TITLE)? (
isLoading ? <Loading/> : 


        <Box style={EmployeeCreationPageStyle.firstBox}>
             <Box style={EmployeeCreationPageStyle.secondBox} >
        
                  

                <Typography style={EmployeeCreationPageStyle.TypographyStyle}>CREATE EMPLOYEE</Typography>
                <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={EmployeeCreationPageStyle.backButtonStyle} 
                 onClick={()=>{backbutton("/user/employees")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
            </Box>

            

           <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

         
                    <form onSubmit={handleSubmit} >
                        <Box style={EmployeeCreationPageStyle.thirdBoxStyle}>
                            <Grid container  gap={1.8} style={EmployeeCreationPageStyle.gridContinerStyle}>

                                <Grid item xs={12} style={EmployeeCreationPageStyle.gridItemStyle}>
                                    
                                <TextField
                            
                            style={EmployeeCreationPageStyle.textFieldStyle}
                                required
                                 
                                 label="Employee Id"
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                type='number'
                                Value={employee.empId}
                                onChange={(e,value)=>{ setEmployee({
                                  ...employee, empId:e.target.value
                              })}}></TextField>
                                    
                                </Grid>
                                <Grid item xs={12} style={EmployeeCreationPageStyle.gridItemStyle}>
                                  
                                <TextField
                                InputProps={{ inputProps: { maxLength:50,minLength:5} }}
                                style={EmployeeCreationPageStyle.textFieldStyle}
                                required
                                 value={employee.empName}
                                
                                 label="Employee Name"
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                               
                                type='text'
                                onChange={(event) => setEmployee({
                                    ...employee, empName: event.target.value
                                })}></TextField>
                          
                                    
                                </Grid>
                                <Grid item xs={12} style={EmployeeCreationPageStyle.gridItemStyle}>
                                    <TextField required type='email' className='outlined-basic-text-box' id="outlined-basic" label="Employee Email-Id" variant="outlined" style={EmployeeCreationPageStyle.textFieldStyle}
                                        onChange={(event) => setEmployee({
                                            ...employee, emailId: event.target.value
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} style={EmployeeCreationPageStyle.gridItemStyle}>
                                    

                                    <TextField required className='outlined-basic-text-box' id="outlined-basic" label="Date of Joining" variant="outlined"  style={EmployeeCreationPageStyle.textFieldStyle} type='date'
                                        value={employee.dateOfJoining}
                                        onChange={(event) => setEmployee({
                                            ...employee, dateOfJoining: event.target.value
                                        })}
                                    />

                                </Grid >

                                {/* <Grid item xs={12} style={EmployeeCreationPageStyle.gridItemStyle}>
                                    
                                <FormControl style={EmployeeCreationPageStyle.formcontrolStyle}>
                                    <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                                   
                                  
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Designation"
                                        name="Designation"
                                      onChange={(e)=>{setEmployee({...employee,designation:e.target.value})}}
                                      value={employee.designation}
                                    >
                                        
                                        {
                                            designation.map((item)=>{
                                                return(
                                                    
                                                <MenuItem  key={item.designationId}  value={item.designationName}>{item.designationName}</MenuItem>
                                            
                                                )
                                            
                                            }
                                           
                                            )
                                        }
                               
                                    </Select>
                                    
                                </FormControl>

                                </Grid > */}

                                <Grid item xs={12} style={EmployeeCreationPageStyle.gridItemStyle}>
                                    <TextField required type='number' InputProps={{ inputProps: { max:9999999999,min:1111111111} }} className='outlined-basic-text-box' id="outlined-basic" label="Contact No" variant="outlined" style={EmployeeCreationPageStyle.textFieldStyle}
                                        value={employee.contactNo}
                                        onChange={(event) => setEmployee({
                                            ...employee, contactNo: event.target.value
                                        })}
                                    />
                                </Grid>

                                <Grid item xs={12} style={EmployeeCreationPageStyle.gridItemStyle}>
                                    <Button variant="contained" type='submit' style={GlobalButton.OperationButton}>Create</Button>
                                </Grid>

                            </Grid>
                        </Box>
                    </form>
        </Box>

    ):<NoAuth></NoAuth>
}

export default CreateEmployee