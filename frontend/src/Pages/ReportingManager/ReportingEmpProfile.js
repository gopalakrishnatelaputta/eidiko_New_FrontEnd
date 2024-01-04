

import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, Collapse, Container, Divider, Fade, Grid, List, ListItemButton, ListItemIcon, ListItemText, Modal, TextField, Typography } from '@mui/material'
import { AddLocation, Call, Create } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useLocation, useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { getProfileData } from '../../Services/ProfileService';
import userServiceModule from '../../Services/user-service/UserService';
import { toast } from 'react-toastify';
import Loading from '../../Components/LoadingComponent/Loading';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { ProfileContactModal } from '../User-Information/WorkInfoModals/ProfileContactModal';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from "../../Components/HelperComponent/NoAuth";
import Groups3Icon from '@mui/icons-material/Groups3';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment';
import { baseUrl } from '../../Server/baseUrl';
import './ProfilePic1.css'
import { getDetailedEmployeeInformation } from '../../Services/employee-service/EmployeeService';
import dayjs from 'dayjs';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import TocIcon from '@mui/icons-material/Toc';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AcUnitIcon from '@mui/icons-material/AcUnit';



export const REPORTED_EMPLOYEE_PROFILE_PAGE_TITLE="REPORTED_EMPLOYEE_PROFILE_PAGE"

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


//api :--- employee/get-reported-employees
export  const loci=window.location.href

const ReportingEmpProfile = (props) => {



// localStorage.setItem("rep",loci)


// back
const history=useNavigate();
const handleGoBack = () =>{
    history(-1);
};
const location = useLocation();
const queryParams= new URLSearchParams(location.search);
const param1Value=queryParams.get('empId');
const param2Value=queryParams.get('managerId');



    const {state}=useLocation(props.state)
    const [empId1,setEmpId1]=useState(param1Value)
    const [managerId,setmanagerid]=useState( param2Value)

    // const [empId1,setEmpId1]=useState(state.empId)
    // const [managerId,setmanagerid]=useState(state.managerId)
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);
    const getprofilepic1 =`${baseUrl}/employee/load-profile-pic/${empId1}`
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

   



    const [employeeInfo , setemployeeInfo ] = useState();
    const [empLeaveStatuslist,setempLeaveStatuslist]=useState()
    const[employeeLateCount,setemployeeLateCount]=useState()
    const[employeeNoLateCount,setemployeeNoLateCount]=useState()
    const[isVeryLateCount, setisVeryLateCount]=useState()
    const[reportingEmployees,setreportingEmployees]=useState()
    const[taskStatusList,settaskStatusList]=useState()
    const[workingGreaterThan9Hrs,setworkingGreaterThan9Hrs]=useState()
    const[workingLessThan9Hrs,setworkingLessThan9Hrs]=useState()
    const [designations,setdesignations]=useState()
    const[empShiftTimings,setempShiftTimings]=useState()
    const[employeeWorkingLocation,setemployeeWorkingLocation ]=useState()
    const [reportingManagers,setreportingManagers ]=useState()
    const[leavecount,setleavecount]=useState(0)
    const[absentcount,setabsentcount]=useState(0)
    const[compcount,setcompcount]=useState(0)
    const [empWorkingOnSkill,setempWorkingOnSkill]=useState([])


    async function fetchData() {
        await  getDetailedEmployeeInformation(empId1,managerId).then(res => {
            setemployeeInfo(res.result.employeeInfo.result)
            setdateOfJoining(dayjs(res.result.employeeInfo.result.dateOfJoining).format("DD/MM/YYYY"))
            setempLeaveStatuslist(res.result.empLeaveStatuslist)
            setemployeeLateCount(res.result.employeeLateCount)
            setempWorkingOnSkill(res.result.empWorkingOnSkill[0])

            setemployeeNoLateCount(res.result.employeeNoLateCount)
            setisVeryLateCount(res.result.isVeryLateCount)
            setreportingEmployees(res.result.reportingEmployees)
            settaskStatusList(res.result.taskStatusList)

            setworkingGreaterThan9Hrs(res.result.workingGreaterThan9Hrs)
            setworkingLessThan9Hrs(res.result.workingLessThan9Hrs)

            setdesignations(res.result.employeeInfo.designations[0].designation)
            setempShiftTimings(res.result.employeeInfo.empShiftTimings[0])
            setemployeeWorkingLocation(res.result.employeeInfo.employeeWorkingLocation[0])
            setreportingManagers( res.result.employeeInfo.reportingManagers[0])

            for(let i=0;i<res.result.empLeaveStatuslist.length;i++){
                let abcount=0
                let lecount=0
                let compcount=0
                res.result.empLeaveStatuslist.filter((leave)=>{
               
                if(leave.estatus==="A"){
                abcount++
                }
                else if(leave.estatus==="L"){
                  lecount++
                }
                else if(leave.estatus==="C"){
                    compcount++
                  }
              })
              setabsentcount(abcount)
              setleavecount(lecount)
              setcompcount(compcount)
            }


          setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })

    }


    const stringToDate = (date) => {
        return moment(date).format("DD/MM/YYYY")
    }

    useEffect(() => {

        fetchData();
    }, [openModal,open]);
     
    const[dateOfJoining,setdateOfJoining]=useState()
const [isLoading,setIsLoading]=useState(true)
const backbutton=useNavigate()

const handleRap = ()=>{
    navigate(`../reporting-employees` ,{state:employeeInfo?.empId})
}

    return  hasAuthority(REPORTED_EMPLOYEE_PROFILE_PAGE_TITLE)? (
        isLoading?<Loading/>:

        <Container sx={{
            margin: '10px 0px'
        }}>

          
            <Box sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                marginRight:"1px",
                
            }}>
                <Typography color={"secondary"}style={{marginLeft:"15px",fontSize:"26px"}}>REPORTING EMPLOYEE</Typography>
                <Grid style={{justifyContent:"center"}}>

                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"0px"}} 
                 onClick={handleGoBack}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
            </Box>
<GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>

            <Box sx={{
                flexGrow: 1,
            }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box sx={{
                            display: 'flex',
                            margin: '20px',
                            boxShadow: 'none'
                        }}>

                              
                              <Grid container > 
                             <Grid item  xs={12} sm={12} md={4} lg={4} xl={4} className='wrapper'
                               style={{backgroundImage:`url(${getprofilepic1})`}}
                             >
                          
                            </Grid>

                            <Grid item  xs={12} sm={12} md={8} lg={8} xl={8}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5" color="secondary">
                                        {employeeInfo.empName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                  {designations?.designationName}
                                    </Typography>
                                </CardContent>
                            </Box>
                            </Grid>
                            </Grid>
                        </Box>
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
                                        <strong> {employeeInfo.emailId}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Employee Id
                                    </Typography><br />
                                    <Typography variant='p'>
                                        {/* <strong>{authorities.map(a => <p>{a.authority},</p>)}</strong> */}
                                        <strong>{employeeInfo?.empId}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Designation
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong> {designations?.designationName}</strong>
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
                                
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                        Contact
                                    </Typography><br />
                                    <Typography variant='P'>
                                    <strong>{employeeInfo.contactNo}</strong>
                                </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                    Reporting Manager
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong>{ reportingManagers?.empName}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                    Work Location
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong> {employeeWorkingLocation?.workingFrom}{employeeWorkingLocation?.location ? <><br /><span>({employeeWorkingLocation.location})</span></> : ''}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Typography variant='p'>
                                    Shift Timing
                                    </Typography><br />
                                    <Typography variant='p'>
                                        <strong>  {empShiftTimings?.shiftStartTime} - {empShiftTimings?.shiftEndTime}</strong>
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
                }}>
                   
{ reportingEmployees?.length>0?
     <Grid item  xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
     <Card sx={{
         boxShadow: 'none',
         backgroundColor: '#BED8FB' ,
         marginLeft:"10px",
         marginTop:"15px",
         height:200
        
     }}
     style={{cursor: "pointer"}}
     
     onClick={handleRap}
     >

         <CardContent>
             <Groups3Icon />(Reporting Employees)
             <Grid container sx={{marginTop:"10px"}}>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Total Employee</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{reportingEmployees?.length}</Typography>
                                    </Grid>
                                    </Grid>
                                  
         </CardContent>
         <Box sx={{display:"flex",justifyContent:"flex-end",marginTop:'35px'}}>
                               <DoubleArrowIcon color='secondary'  />
                               </Box>
     </Card>
 </Grid>:
 <Grid item  xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
 <Card sx={{
     boxShadow: 'none',
     backgroundColor: '#BED8FB'  ,
     marginLeft:"10px",
     marginTop:"15px",
     height:200
    
 }}
 style={{cursor: "pointer"}}
 
 //onClick={handleRap}
 >

     <CardContent>
         <Groups3Icon />(Reporting Employees)
         <Grid container sx={{marginTop:"10px"}}>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Total Employee</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{reportingEmployees?.length}</Typography>
                                    </Grid>
                                    </Grid>
     </CardContent>
    
 </Card>
</Grid>


}



                    <Grid item  xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB'  ,
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:200
                           
                           }}
                           style={{cursor: "pointer"}}
     
                           onClick={()=>{navigate("../empbiometric",{state:employeeInfo.empId})}}
                        >

                            <CardContent>
                                <FingerprintIcon />(Biometric Report)
                                <Grid container sx={{marginTop:"10px"}}>


                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}} > On Time</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{employeeNoLateCount !==null ?employeeNoLateCount.count:0}</Typography>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Late</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{employeeLateCount !==null?employeeLateCount.count:0}</Typography>
                                    </Grid>

                              
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                   
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}} > Very Late  </Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{isVeryLateCount !==null ?isVeryLateCount.count:0}</Typography>
                                    </Grid>
                                    
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}> Working  &gt;9hrs</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{workingGreaterThan9Hrs!==null ?workingGreaterThan9Hrs.count:0}</Typography>
                                   
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                  
                                <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}} > Working &lt;9hrs </Typography>
                                <Typography style={{color:"black",fontSize:"27px"}}>{workingLessThan9Hrs !==null? workingLessThan9Hrs.count:0 }</Typography>
                                    </Grid>
                                  

                                </Grid>
                                
                              
                                <Box sx={{display:"flex",justifyContent:"flex-end"}}>
                               <DoubleArrowIcon color='secondary'  />
                               </Box>
                            </CardContent>
                            
                        
                        </Card>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB' ,
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:200
                          
                        }}
                        style={{cursor: "pointer"}}
     
                        onClick={()=>{navigate("../employee-spent-leaves",{state:employeeInfo.empId})}}
                        >

                            <CardContent>
                                <TocIcon />(Leave Report)
                                <Grid container sx={{marginTop:"10px"}}>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}> Spent Leaves</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{leavecount}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Absent</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{absentcount}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Compoff</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{compcount}</Typography>
                                    </Grid>

                                    </Grid>
                                 
                            </CardContent>
                                
                            
    
                            <Box sx={{display:"flex",justifyContent:"flex-end",marginTop:'37px'}}>
                               <DoubleArrowIcon color='secondary'  />
                               </Box>
    
                        </Card>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB'  ,
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:200
                        
                        }}
                        
                        style={{cursor: "pointer"}}
     
                        onClick={()=>{navigate("../emptaskstatus",{state:employeeInfo.empId})}}
                        >

                            <CardContent>
                                <AssignmentTurnedInIcon />(Task Details)
                                <Grid container sx={{marginTop:"10px"}}>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Total Task</Typography>
                                    <Typography style={{color:"black",fontSize:"27px"}}>{taskStatusList.length}</Typography>
                                    </Grid>
                                 </Grid>
                            
                            </CardContent>
                       
                            <Box sx={{display:"flex",justifyContent:"flex-end",marginTop:'39px'}}>
                               <DoubleArrowIcon color='secondary'  />
                               </Box>
                        </Card>
                      
                    </Grid>

                    <Grid item  xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: '#BED8FB'  ,
                            marginLeft:"10px",
                            marginTop:"15px",
                            height:200
                        
                        }}
                        
                        style={{cursor: "pointer"}}
     
                        onClick={()=>{navigate("../employee-skills-report",{state:employeeInfo.empId})}}
                        >

                            <CardContent>
                                <AcUnitIcon />(Skill Details)
                                <Grid container sx={{marginTop:"10px"}}>
                                    <Grid item xs={6}  >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Working</Typography>
                                    <Typography style={{color:"black",fontSize:"19px"}}>{empWorkingOnSkill?.working}</Typography>
                                    </Grid>
                                    <Grid item xs={6}  >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Team</Typography>
                                    <Typography style={{color:"black",fontSize:"19px"}}>{empWorkingOnSkill?.team}</Typography>
                                  
                                    </Grid>
                                    <Grid item xs={6} >
                                    <Typography color={"secondary"} style={{fontSize:"11px",fontWeight:"bold"}}>Skill</Typography>
                                    <Typography style={{color:"black",fontSize:"19px"}}>{empWorkingOnSkill?.skills}</Typography>
                                   
                                    </Grid>
                                    
                                    <Grid item xs={12}  sx={{justifyContent:"flex-end",display:"flex"}} >
                                    <DoubleArrowIcon  color='secondary'  />
                                    </Grid>
                                   
                                 </Grid>
                            
                            </CardContent>
                       
                          
                        </Card>
                      
                    </Grid>



                </Grid>

            </Box>

        </Container>

    ):<NoAuth></NoAuth>
}
export default ReportingEmpProfile