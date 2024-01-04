import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Fade, Grid, Modal, TextField, Typography } from '@mui/material'
import { AddLocation, Call, Create } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { getProfileData } from '../../Services/ProfileService';
import userServiceModule from '../../Services/user-service/UserService';
import { toast } from 'react-toastify';
import Loading from '../../Components/LoadingComponent/Loading';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { ProfileContactModal } from '../../Pages/User-Information/WorkInfoModals/ProfileContactModal';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from "../../Components/HelperComponent/NoAuth";
import moment from 'moment';
import axios from 'axios';
import { baseUrl } from '../../Server/baseUrl';
import './ProfilePic1.css'
import WarningCard from '../WarningMails/WarningCard';
import { PopupMailServices } from '../../Services/WarningMailServices/PopupMailServices';
import { red } from '@mui/material/colors';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    
};

const warningStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border:'5px',
    p: 4,
    
};

export const  USER_PROFILE_PAGE_TITLE= "PROFILE_PAGE"

const Profile = (props) => {
    console.log(props)
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [authorities, setAuthorities] = useState([]);
    const [reportingManagers, setReportingManagers] = useState({})
    const [workLocation, setWorkLocation] = useState({});
    const [shiftTimings, setShiftTimings] = useState({});
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [about, setAbout] = useState("");
    const [designation, setDesignation] = useState("");


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    // start
    // const [hasWarningCardDisplayed, setHasWarningCardDisplayed] = useState(false);

    // useEffect(() => {
    //   fetchData();
    //   checkAndDisplayWarningCard(); // Check and display the warning card
    // }, [openModal, open]);
  
    // const checkAndDisplayWarningCard = () => {
    //   const hasDisplayed = localStorage.getItem('hasDisplayedWarningCard');
    //   if (!hasDisplayed) {
    //     // If the warning card hasn't been displayed during this session, show it
    //     setOpened(true);
    //     localStorage.setItem('hasDisplayedWarningCard', 'true'); // Set the flag
    //   }
    // };
    // end

    const authoritiesToString = (authorities) => {
        let arr = [];
        authorities.map(({ authority }) =>
            arr.push(authority)
        )
        return arr.join(',')
    }
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
    async function fetchData() {
        await getProfileData(localStorage.getItem("id")).then(res => {
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
            toast.error('length must be greater than 50', {
                position: toast.POSITION.TOP_RIGHT
            });
            return
        }
        userServiceModule.updateAbout(about).then((res) => {
            if (res.status == 200 && res.statusMessage == 'success') {

                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                handleModalClose()
            } else {

                toast.error("not updated", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            toast.error("not updated", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        )
    }


    const stringToDate = (date) => {
        return moment(date).format("DD/MM/YYYY")
    }

    useEffect(() => {

        fetchData();
    }, [openModal,open]);
     
//for profile pic upload

const getprofilepic1 =`${baseUrl}/employee/load-profile-pic/${localStorage.getItem("id")}` //by that baseUrl we are getting image



const profilePic=(file)=>{
    let form =new FormData()  //for uploading mulitpart file 
form.append("file",file.target.files[0]) //it append the uploaded file and store in form
   
 axios({ //it is used to call the service to conmplt the operation(upload)
     method: "post",
     url: `${baseUrl}/employee/update-profile-pic`,
     data:form,
     headers: { "Content-Type": 'multipart/form-data' ,"Authorization" : 'Bearer ' + token},
   }).then((res)=>{
     console.log(res);
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






const [isLoading,setIsLoading]=useState(true)
//backbutton
const backbutton=useNavigate()

//popup
const [opened,setOpened]=useState(false)
const[data,setData]=useState([])
const empId=localStorage.getItem("id");
useEffect(() => {
   
    
    PopupMailServices.getUnreadWarningMailsByEmpId(empId).then((res)=>{
    if(res.status===200 && res.result.length>0){
        setOpened(true)
        setData(res.result)     
    }
    })
}, []);
//////
    return hasAuthority( USER_PROFILE_PAGE_TITLE)?(
        isLoading?<Loading/>:

        <Container sx={{
            margin: '10px 0px',
        }}>

            {/* <Typography variant='h5' color="secondary">
                Employee Information
            </Typography> */}
            <Box sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                alignContent:"center",
                marginRight:"1px",
                
            }}>
                <Typography color={"secondary"}style={{marginLeft:"15px",fontSize:"26px"}}>EMPLOYEE INFORMATION</Typography>
                <Grid style={{justifyContent:"center"}}>
             
                </Grid>
            </Box>
<GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>

            <Box sx={{
                flexGrow: 1,
            }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box elevation={0} sx={{
                            display: 'flex',
                            margin: '20px',
                           boxShadow:"none"
                        }}>

                              
                              <Grid container > 
                             <Grid item  xs={12} sm={12} md={4} lg={4} xl={4} className='wrapper'
                              style={{backgroundImage:`url(${getprofilepic1})`}}
                             >
                              <form enctype="multipart/form-data" >
                             <input  type='file' className='my_file'  onChange={profilePic}></input>
                             </form>
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

                            <Create color='primary' sx={{
                                cursor: 'pointer'
                            }}
                                onClick={handleModalOpen}
                            />

                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{
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
                                        <strong>{designation}</strong>
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
                    margin: '10px 0px',
                   
                }}>
                    <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}  >
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:"137px"
                        }}
                        style={{cursor: "pointer"}}>

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
                                
                                <Button onClick={handleOpen} size="small" >update</Button>
                               
                                <Modal
                                 
                                 open={open}
                        
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description">
                                    <ProfileContactModal empId={profileData?.empId} 
                                     onClose={handleClose}  
                                     contact={profileData?.contactNo ? profileData?.contactNo:null}/>
                                </Modal>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:"137px"
                        }}>

                            <CardContent>
                                <ManageAccountsIcon />(Reporting Manager)
                                <Typography variant='h6'>
                                    {reportingManagers?.empName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',
                            height: '100px',
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:"137px"
                        }}>

                            <CardContent>
                                <AddLocation />Work Location <br />
                                <Typography variant='p'>
                                    {workLocation?.workingFrom}{workLocation?.location ? <><br /><span>({workLocation.location})</span></> : ''}
                                    {/* {workLocation.workingFrom == undefined || null || '' ? '' : workLocation.workingFrom} */}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB',
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:"137px"
                        }}>

                            <CardContent>
                                <AddLocation />(Shift Timing)
                                <Typography variant='h6'>
                                    {shiftTimings?.shiftStartTime} - {shiftTimings?.shiftEndTime}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

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
                                multiline
                                rows={3}
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
{/* //// */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={opened}
           >
     <Fade in={opened} >
        <Box  style={{border:'none',display:'flex'}}>
     <Box sx={warningStyle}>
              <WarningCard  onClose={()=>{setOpened(false)}} props={data}/>
              </Box>
        </Box>
                  
        </Fade>
       
      
       </Modal>
       {/* ////// */}
        </Container>

    ):<NoAuth></NoAuth>
}
export default Profile