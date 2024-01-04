import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Fade, Grid, IconButton, Modal, TextField, Typography } from '@mui/material'
import { AddLocation, Call, Create, Delete, Update } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate, useParams } from 'react-router';
import CommentIcon from '@mui/icons-material/Comment';
import { getProfileData } from '../../Services/ProfileService';
import userServiceModule from '../../Services/user-service/UserService';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import Swal from 'sweetalert2';
import {Paper } from '@mui/material';
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import {Checkbox,FormLabel,FormGroup,FormControlLabel} from '@mui/material';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
//updatemodals
import {ContactModal} from "../Access-Level-Pages/UpdateModals/ContactModal"
import Loading from "../../Components/LoadingComponent/Loading";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { updateEmployeeService } from '../../Services/employee-service/EmployeeService';
import GradingIcon from '@mui/icons-material/Grading';
import { FcNext } from "react-icons/fc";
import { EmployeeAccessLevelService } from '../../Services/Employee-Access-Level-service/EmployeeAccessService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { baseUrl } from '../../Server/baseUrl';
import './ProfilePic1.css'
import axios from 'axios';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { DropDownServices } from '../../Services/DropDownServices/DropDownServices';
import { band } from '../../Components/HelperComponent/HelperText';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { bandWithLeaves } from '../../Components/HelperComponent/HelperText'; 


export const  EMPLOYEE_AFTER_CLICKING_EMPLOYEE_TABLE_PAGE_TITLE= "EMPLOYEE_PROFILE"
export const ACCESS_UPDATE_EMPLOYEE_MODAL="UPDATE_EMPLOYEE"
export const ACCESS_UPDATE_CONTACT_MODAL="ACCESS_UPDATE_CONTACT"
export const ACCESS_LEVEL_REPORTING_MANAGER_MODAL="ACCESS_LEVEL_REPORTING_MANAGER_MODAL_1"
export const ACCESS_LEVEL_WORKING_LOCATION_MODAL="ACCESS_LEVEL_WORKING_LOCATION_MODAL_1"
export const ACCESS_LEVEL_SHIFT_TIMING_MODAL="ACCESS_LEVEL_SHIFT_TIMING_MODAL_1"
export const ACCESS_LEVEL_PROFILE_PHOTO_UPLOAD="PROFILE_PHOTO_UPLOAD"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const  convertDateToYyyyMmDd = (date) => {
    if (!date) return '';
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  };

const Employee = () => {

//------Band
const[visible,setVisible]=useState(false);
const[status,setStatus]=useState("click")

const handlelerButton=(e)=>{
if(status==="click"){
setVisible(true)
setStatus("")
}
else if(status!==1){
setVisible(false)
setStatus("click")
}
}








    let { id } = useParams();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [authorities, setAuthorities] = useState([]);
    const [reportingManagers, setReportingManagers] = useState({})
    const [workLocation, setWorkLocation] = useState({});
    const [shiftTimings, setShiftTimings] = useState({});
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [about, setAbout] = useState("");
    const [designation, setDesignation] = useState("");
    

    const [designationdrop,setdesignationdrop]=useState([])
    function fetchdesignation(){
    DropDownServices.getdesignations().then((res)=>{
        setdesignationdrop(res.result)
       
    }).catch((err)=>{
    
    })
    }
    useEffect(()=>{
        fetchdesignation()
    },[])
    
    const[band1,setband1]=useState(band())

    const [updateEmployee, setUpdateEmployee] = useState({
        "empName": "",
        "emailId": "",
        "contactNo": "",
        "dateOfJoining": "",
        "designation":"",
        "band":"",
        "eligibleLeaves":""
    })


    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    const [openModal2, setOpenModal2] = React.useState(false);
    const handleModal2Open = () => {
        setUpdateEmployee({
            "empId": profileData?.empId,
            "empName": profileData?.empName,
            "emailId": profileData?.emailId,
            "contactNo": profileData?.contactNo,
            "dateOfJoining": profileData?.dateOfJoining,
            "designation":designation,
            "band":"",
            "eligibleLeaves":0
        })
        setOpenModal2(true);
    };
    const handleModal2Close = () => {
        setOpenModal2(false);
    };

    //for getting designations

    const getDesignationTitle = (data) => {
        let aa= data.sort((a, b) =>
            new Date(a.effectiveDate) - new Date(b.effectiveDate)
        );
        if(aa.length>0){
            return aa[aa.length-1].designation.designationName;
        }else {
            return "";
        }
    }

    ///////////////updating employee////////////////////////////////////

    const handleUpdateEmployeeSubmit = (e)=>{
        e.preventDefault();
        const dateString  = dayjs(updateEmployee.dateOfJoining).format('YYYY-MM-DD');
        updateEmployee.dateOfJoining = dateString;

        updateEmployeeService(updateEmployee).then((res)=>{
            if(res.status===200 && res.statusMessage==='success'){
                toast.success(res.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                handleModal2Close()
            }
            else{
                toast.error(res.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                handleModal2Close()
            }
        }).catch((error)=>{
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            handleModal2Close()
        })

      
    }

    const [reportm,setReportm]= React.useState(false);
  const handleRmOpen =() => setReportm(true);
  const handleRmClose = () => setReportm(false);
    async function fetchData() {
        await getProfileData(id).then(res => {
            setProfileData(res.result);
            setAuthorities(res.result.authorities);
            setDateOfJoining(stringToDate(res.result.dateOfJoining));
            setReportingManagers(res.reportingManagers[0]);
            setWorkLocation(res.employeeWorkingLocation[0]);
            setShiftTimings(res.empShiftTimings[0])
            setDesignation(getDesignationTitle(res.designations))

           setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })

    }

    const handleAboutSubmit = (e) => {
        e.preventDefault();
    
        if (about.length < 50) {
            toast.error("About must be greater than 50 words", {
                position: toast.POSITION.TOP_RIGHT
            });
            setIsLoading(false)
            return
        }
        EmployeeAccessLevelService.AccessUpdateAbout(about).then((res) => {
            if (res.status == 200 ) {
                handleModalClose()
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false)
               
            } else {
                handleModalClose()

                toast.error("not updated", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setIsLoading(false)
               
            }
        }).catch(err => {
            handleModalClose()
            toast.error("not updated", {
                position: toast.POSITION.TOP_RIGHT
            });
            setIsLoading(false)
           
            
        }
        )
    }


    const stringToDate = (date1) => {
       
        return moment(date1).format("DD/MM/YYYY")
    }

    const [isLoading,setIsLoading]=useState(true)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {

        fetchData();
        
    }, [open,openModal,openModal2]);


    // for modal update Contact
  

  //modal for reporting manager updation
  
  const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
    const textfield1={width: 400}

 
// modal for  Work Location
const [workl,setWorkl]= React.useState(false);
const handleWlOpen =() => setWorkl(true);
const handleWlClose = () => setWorkl(false);
const [wl, setwl] = useState(false);

//modal for shift timing
const [shiftt,setShiftt]= React.useState(false);
const handleStOpen =() => setShiftt(true);
const handleStClose = () => setShiftt(false);
const minute1=[0,15,30,45,60]


const navigate1=useNavigate()
//backbutton
const backbutton=useNavigate()
const token = localStorage.getItem("token")
const getprofilepic1 =`${baseUrl}/employee/load-profile-pic/${id}`


const profilePic=(file)=>{
    let form =new FormData()  //for uploading mulitpart file 
form.append("file",file.target.files[0]) //it append the uploaded file and store in form
   
 axios({ //it is used to call the service to conmplt the operation(upload)
     method: "post",
     url: `${baseUrl}/access/employee/update-profile-pic/${id}`,
     data:form,
     headers: { "Content-Type": 'multipart/form-data' ,"Authorization" : 'Bearer ' + token},
   }).then((res)=>{
  if(res.status===200  && res.data.statusMessage==="success"){
    //  setisloading(false)
     toast.success(res.data.message,{position:toast.POSITION.TOP_RIGHT})
     window.location.reload() //auto reload
     
 }
 else if( res.status===200 && res.data.status===400){
    //  setisloading(false)
     toast.info(res.data.message,{position:toast.POSITION.TOP_RIGHT})
 
 }
 else{
    //  setisloading(false)
     toast.error(res.data.message,{position:toast.POSITION.TOP_RIGHT})
 }
 
 }).catch((error)=>{
   
    //  setisloading(false)
     toast.error(error.response.data.message,{position:toast.POSITION.TOP_RIGHT})
 })


}

const handleIncrease=(value)=>{

    if(value==="increase"){
        setUpdateEmployee({
            ...updateEmployee,eligibleLeaves:updateEmployee.eligibleLeaves+1
        })
    }
    else if(value==="decrease"){
        setUpdateEmployee({
            ...updateEmployee,eligibleLeaves:updateEmployee.eligibleLeaves-1
        })
    }
   
}






    return hasAuthority( EMPLOYEE_AFTER_CLICKING_EMPLOYEE_TABLE_PAGE_TITLE)? (
        isLoading?<Loading/>:

        <Container sx={{
            margin: '10px 0px'
        }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '5px 0px'

            }}>
                
              
                <Typography  style={{fontSize:"21px",marginLeft:"10px",marginTop:"15px"}} color="secondary">
                
                EMPLOYEE INFORMATION
                </Typography>
            

                <Box sx={{
                justifyContent: 'flex-end',
            }}>
               {
                hasAuthority(ACCESS_UPDATE_EMPLOYEE_MODAL)? <Button startIcon={<ArrowCircleUpIcon/>} variant='outlined' onClick={handleModal2Open} >
                UPDATE EMPLOYEE
              </Button>:null
               }
               
               
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",
                marginBottom:"3px",marginTop:"4px",marginRight:"12px",marginLeft:"10px"}} 
                 onClick={()=>{backbutton("../employees")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
             </Box>
                
            </Box>
        <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
            <Box sx={{
                flexGrow: 1,
            }} >
                <Grid container spacing={2}>
                    <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>

                        <Box sx={{
                            display: 'flex',
                            margin: '20px',
                            boxShadow: 'none'
                        }}>

                            <Grid container > 
                             <Grid item  xs={12} sm={12} md={4} lg={4} xl={4} className='wrapper'
                               style={{backgroundImage:`url(${getprofilepic1})`}}
                             >

{
    hasAuthority(ACCESS_LEVEL_PROFILE_PHOTO_UPLOAD)?
    <form enctype="multipart/form-data"  >
    <input  type='file' className='my_file'  onChange={profilePic}></input>
    </form>:null
}
                         
                           
                             </Grid>
                             <Grid item  xs={12} sm={12} md={8} lg={8} xl={8}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>

                                    <Typography component="div" variant="h5" color="secondary">
                                        {profileData.empName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {designation}
                                    </Typography>
                                 
                                </CardContent>

                            </Box>
                           </Grid>
                            </Grid>
                        </Box>
                        <Typography variant='h6' color="secondary">
                            About:
                        </Typography>
                        <Typography variant='p' color='text.secondary' sx={{ fontSize: '12px' }}>
                            {profileData?.about ? profileData?.about : <>No Data</>} &nbsp; &nbsp; &nbsp;

                           

                        </Typography>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={6} lg={6} xl={6} sx={{
                        margin: '20px 0px'
                    }}>
                        <Box sx={{
                            flexGrow: 1
                        }}>
                            <Grid container spacing={2} sx={{
                                fontSize: '15px'
                            }}>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Email
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong> {profileData.emailId}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Employee Id
                                    </Typography><br />
                                    <Typography variant='p'>
                                        {/* <strong>{authorities.map(a => <p>{a.authority},</p>)}</strong> */}
                                        <strong>{profileData?.empId}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Designation
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong> {designation}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Date Of Joining
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong>{dateOfJoining}</strong>
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0} sx={{
                    margin: '15px 0px'
                }}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',  
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:"137px"
                        }}
                       
                        
                        style={{cursor: "pointer"}}
                        >
                            <CardContent>
                                <Call />CONTACT
                                <Typography variant='h6'>
                                    {profileData.contactNo}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>

                              {
                                hasAuthority(ACCESS_UPDATE_CONTACT_MODAL)? <Button onClick={handleOpen} size="small" >update</Button>:null
                              }  
                               
                               
                                <Modal
                                 
                                 open={open}
                        
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description">
                                    <ContactModal empId={profileData?.empId}  onClose={handleClose}  contact={profileData?.contactNo ? profileData?.contactNo:null}/>
                                </Modal>
                            </CardActions>
                        </Card>
                    </Grid>
                    
                    {hasAuthority(ACCESS_LEVEL_REPORTING_MANAGER_MODAL)?
                     <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>

                       
                   
                     <Card sx={{
                         boxShadow: 'none',
                         backgroundColor: '#BED8FB',
                         marginLeft:"10px",
                         marginTop:"15px",
                         height:"137px"
                        
                     }}
                     style={{cursor: "pointer"}}
                     onClick={()=>{navigate("/user/employee-reportingManager-via-profile",{state:{"empId":id}})}}
                     >
                          <CardContent>
                             <ManageAccountsIcon />Reporting Manager
                             <Typography variant='h6'>
                                 {reportingManagers?.empName ? reportingManagers?.empName : <small>(Manager not assigned)</small>}
                             </Typography>
                         </CardContent>
                         <CardActions sx={{
                             display: 'flex',
                             justifyContent: 'flex-end'
                         }}>

                    <DoubleArrowIcon color="primary" ></DoubleArrowIcon>

                           
                         </CardActions>
                     </Card>
                 </Grid>  :

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>

                       
                   
                  <Card sx={{
                      boxShadow: 'none',
                      backgroundColor: '#BED8FB',
                      marginLeft:"10px",
                      marginTop:"15px",
                      height:"137px"
                     
                  }}
                  style={{cursor: "pointer"}}
                  >
                       <CardContent>
                          <ManageAccountsIcon />Reporting Manager
                          <Typography variant='h6'>
                              {reportingManagers?.empName ? reportingManagers?.empName : <small>(Manager not assigned)</small>}
                          </Typography>
                      </CardContent>
                      <CardActions sx={{
                          display: 'flex',
                          justifyContent: 'flex-end'
                      }}>

                        
                      </CardActions>
                  </Card>
              </Grid>
                        
                    }


                   {
                    hasAuthority(ACCESS_LEVEL_WORKING_LOCATION_MODAL)?
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Card sx={{
                        boxShadow: 'none',
                        backgroundColor: '#BED8FB',
                        marginLeft:"10px",
                        marginTop:"15px",
                        height:"137px"

                    }}
                    onClick={()=>{navigate(`/user/employee-workingLocation-via-profile`,{state:{"empId":id}})}}
                    style={{cursor: "pointer"}}
                    >

                        <CardContent>
                            <AddLocation />Work Location <br />
                            <Typography variant='p'>
                                {!workLocation?.workingFrom && <small>Not Assigned</small>}
                                {workLocation?.workingFrom}{workLocation?.location ? <><br /><span>({workLocation.location})</span></> : ''}
                                {/* {workLocation.workingFrom == undefined || null || '' ? '' : workLocation.workingFrom} */}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                             <DoubleArrowIcon color="primary"></DoubleArrowIcon>
                           
                        </CardActions>
                    </Card>
                </Grid>
                :
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Card sx={{
                    boxShadow: 'none',
                    backgroundColor: '#BED8FB',
                    marginLeft:"10px",
                    marginTop:"15px",
                    height:"137px"

                }}
                style={{cursor: "pointer"}}
                >

                    <CardContent>
                        <AddLocation />Work Location <br />
                        <Typography variant='p'>
                            {!workLocation?.workingFrom && <small>Not Assigned</small>}
                            {workLocation?.workingFrom}{workLocation?.location ? <><br /><span>({workLocation.location})</span></> : ''}
                            {/* {workLocation.workingFrom == undefined || null || '' ? '' : workLocation.workingFrom} */}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        
                       
                    </CardActions>
                </Card>
            </Grid>


                   }


{
    hasAuthority(ACCESS_LEVEL_SHIFT_TIMING_MODAL)?
    
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
    <Card sx={{
        boxShadow: 'none',
        backgroundColor: '#BED8FB',
        marginLeft:"10px",
        marginTop:"15px",
        height:"137px"
    }}
    onClick={()=>{navigate(`/user/employee-shiftTiming-via-profile`,{state:{"empId":id}})}}
    style={{cursor: "pointer"}}
    >

        <CardContent>
            <AddLocation />Shift Timing
            <Typography variant='h6'>
                {shiftTimings?.shiftStartTime} - {shiftTimings?.shiftEndTime}
            </Typography>
        </CardContent>
        <CardActions sx={{
            display: 'flex',
            justifyContent: 'flex-end'
        }}>
              <DoubleArrowIcon color="primary"></DoubleArrowIcon>
          
            
        </CardActions>
    </Card>
</Grid>:

<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
<Card sx={{
    boxShadow: 'none',
    backgroundColor: '#BED8FB',
    marginLeft:"10px",
    marginTop:"15px",
    height:"137px"

}}

style={{cursor: "pointer"}}
>

    <CardContent>
        <AddLocation />Shift Timing
        <Typography variant='h6'>
            {shiftTimings?.shiftStartTime} - {shiftTimings?.shiftEndTime}
        </Typography>
    </CardContent>
    <CardActions sx={{
        display: 'flex',
        justifyContent: 'flex-end'
    }}>
          
      
        
    </CardActions>
</Card>
</Grid>
}
                   



                </Grid>

            </Box>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={style}>
                            <form onSubmit={handleAboutSubmit}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="About Me"
                                    sx={{
                                        width: '100%',
                                        margin: '10px 0px'
                                    }}
                                    defaultValue={profileData.about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                                
                                <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        <Button   sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>UPDATE</Button>

                        <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={handleModalClose} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                    </Grid>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Modal
            sx={{overflow:"scroll"}}
                open={openModal2}
                onClose={handleModal2Close}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Card style={{
                    maxWidth: 400, padding: "13px 5px", margin: "20px auto"

                }}>
                    <CardContent>

                        <center>

                        <Typography  color={"secondary"} style={{fontSize:"26px",marginLeft:"4px"}}>UPDATE EMPLOYEE</Typography>
                            <GlobalButton.GlobalDivider1/>

                            {/* <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  /> */}
                            <form onSubmit={handleUpdateEmployeeSubmit}>
                                <Grid container gap={2} >

                                    <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                                        <TextField
                                            onChange={(e)=>setUpdateEmployee({
                                                ...updateEmployee,empName:e.target.value
                                            })}
                                            defaultValue={updateEmployee.empName}
                                            type="text" label="Name" required placeholder="Employee Name" variant='outlined' fullWidth style={{ width: "350px",marginTop:"15px"}}></TextField>
                                    </Grid>

                                    <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                                        <TextField
                                             onChange={(e)=>setUpdateEmployee({
                                                ...updateEmployee,emailId:e.target.value
                                            })}                                            
                                            defaultValue={updateEmployee?.emailId}
                                            type="text" label="Email Id" required placeholder="Email Id" variant='outlined' fullWidth style={{ width: "350px"}}></TextField>
                                    </Grid>
                                    <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }} style={{ width: "350px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker 
                                              onChange={(newValue)=>setUpdateEmployee({
                                                ...updateEmployee,dateOfJoining:newValue
                                            })} 
                                            label="Date Of Joining" defaultValue={dayjs(`${updateEmployee.dateOfJoining}`)}
                                                className='outlined-basic-text-box' sx={{ width: "350px" }} />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                                        <TextField
                                          onChange={(e)=>setUpdateEmployee({
                                            ...updateEmployee,contactNo:e.target.value
                                        })} 
                                            defaultValue={updateEmployee?.contactNo}
                                            type="number" label="Contact Number" required placeholder="Contact Number" variant='outlined' fullWidth style={{ width: "350px"}}></TextField>
                                    </Grid>
                                    
                                  {
                        status==="click"?
                       <Grid container>
                        <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }} >
                        <Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         <label className='col-sm-4 col-form-label'>Add Designation(Optional)</label>

                         </Grid>
                         </Grid>
                         :
                         <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }} >
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         <label className='col-sm-4 col-form-label'>Add Designation(Optional)</label>

                         </Grid>
                      }
                               
                                    

                                  {
                                    visible ?<>
                                        <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                                    
                                    <FormControl style={{ width: "350px"}} >
                                        <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                                       
                                      
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Designation"
                                            name="Designation"
                                          onChange={(e)=>{setUpdateEmployee({...updateEmployee,designation:e.target.value})}}
                                          value={updateEmployee.designation}
                                        >
                                            
                                            {
                                                designationdrop.map((item)=>{
                                                    return(
                                                        
                                                    <MenuItem  key={item.designationId}  value={item.designationName}>{item.designationName}</MenuItem>
                                                
                                                    )
                                                
                                                }
                                               
                                                )
                                            }
                                   
                                        </Select>
                                        
                                    </FormControl>
                                  </Grid>
                                   
                                    <Grid item xs={12} sx={{justifyContent: "center", display: "flex" }}>
                                    
                                    <FormControl style={{ width: "350px"}} >
                                        <InputLabel id="demo-simple-select-label">Band *</InputLabel>
                                       
                                      
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Band *"
                                            name="Band *"
                                            required
                                            
                                          onChange={(e)=>{setUpdateEmployee({...updateEmployee,band:e.target.value})}}
                                          value={updateEmployee.band}
                                        >
                                           {
                                            band1.map((item)=>{
                                                return(
                                                    <MenuItem  key={item.id}  value={item.id}>{item.band1}</MenuItem> 
                                                )

                                            })
                                           } 
                                           
                                            
                                   
                                        </Select>
                                        
                                    </FormControl>

                                    </Grid > 
                                     
                                   
                                        <Grid item xs={12} sx={{justifyContent: "center", display: "flex" }}>
                                     
                                     

                                     
                                      <div style={{display:"flex",justifyContent:"space-around",width:"350px",alignContent:"center",alignItems:"center",padding:"5px"}}>
                                     
                                     <IconButton  onClick={()=>{handleIncrease("decrease")}} sx={{width:"50px",height:"50px",borderRadius:"50%",backgroundColor:"#fff"}} >
                                     <RemoveIcon  sx={{color:"red",fontSize:"45px"}}></RemoveIcon>
                                     </IconButton>
                                     
                                      <TextField
                                            onChange={(e)=>setUpdateEmployee({
                                                ...updateEmployee,eligibleLeaves:e.target.value
                                            })}
                                            value={updateEmployee.eligibleLeaves}
                                        type="number" label="Leaves(per year)" required placeholder="Leaves(per year)" variant='outlined'style={{ width: "150px"}}></TextField>
                                        <IconButton onClick={()=>{handleIncrease("increase")}} sx={{width:"50px",height:"50px",borderRadius:"50%",backgroundColor:"#fff"}} >
                                        <AddCircleOutlineIcon  sx={{fontSize:"35px",color:"#2196F3"}}></AddCircleOutlineIcon>
                                     </IconButton>
                                        
            
                                    
                                      </div>
                                      
                                    </Grid>
                                    
                                    
                                     </>:null

                                  }

                                   
                                    <Grid item xs={12}>
                                        <Button sx={{marginTop:"10px"}} type="submit" variant="contained" color="primary" style={GlobalButton.OperationButton} >UPDATE</Button>

                                        <Button sx={{marginLeft:"20px",marginTop:"10px"}} variant='contained' onClick={handleModal2Close} style={GlobalButton.HaltButton}>Cancel</Button>
                                    </Grid>
                                    </Grid>
                                    {/* <Grid item xs={12} sx={{ justifyContent: "right", display: "flex" }}>
                                       
                                </Grid> */}
                            </form>
                            <GlobalButton.GlobalDivider1/>
                        </center>
                    </CardContent>

                </Card>
            </Modal>
        </Container>

    ):<NoAuth></NoAuth>
}
export default Employee