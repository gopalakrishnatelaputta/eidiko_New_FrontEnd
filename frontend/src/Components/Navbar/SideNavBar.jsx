import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Collapse, Container, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'

import DraftsIcon from '@mui/icons-material/Drafts';
import Groups2Icon from '@mui/icons-material/Groups2';

import { AddLocation, Call, Create, ExpandLess, ExpandMore, Person2, SpeakerNotes, StarBorder } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { FaBookOpen,FaClock,FaUserTie,FaGlobeAsia } from "react-icons/fa";
import TaskIcon from '@mui/icons-material/Task';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TableChartIcon from '@mui/icons-material/TableChart';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Person4Icon from '@mui/icons-material/Person4';
import KeyIcon from '@mui/icons-material/Key';

import { EMPLOYEE_TABLE_PAGE_TITLE } from '../../Pages/Employee/Employees';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { ACCESS_LEVEL_TASK_STATUS_TITLE } from '../../Pages/TaskDetails/TaskStatus';
import { ACCESS_LEVEL_VERIFICATION_PENDING_TABLE_TITLE } from '../../Pages/TaskDetails/VerificationPending';
import { BIOMETRIC_DATA_UPLOAD_PAGE_TITLE } from '../../Pages/BiometricTables/DataUpload';
import { ACCESS_LEVEL_FIRST_BIOMETRIC_TABLE_TITLE } from '../../Pages/BiometricTables/BiometricSearch';
import UploadIcon from '@mui/icons-material/Upload';
import InfoIcon from '@mui/icons-material/Info';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Groups3Icon from '@mui/icons-material/Groups3';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { LEAVES_DATA_UPLOAD_PAGE_TITLE } from '../../Pages/Leaves/LeaveDataUpload';
import { ALL_EMPLOYEE_LEAVES_REPORT_PAGE_TITLE } from '../../Pages/Leaves/LeavesReport';
import { EMPLOYEE_LEAVES_SPENT_PAGE_TITLE } from '../../Pages/Leaves/EmployeeLeaveSpent';
import { REPORTED_EMPLOYEES_PAGE_TITLE } from '../../Pages/ReportingManager/ReportingEmployees';
import { LEAVES_DATA_UPLOAD_AS_PER_BAND_PAGE_TITLE } from '../../Pages/Leaves/LeavesAsPerBand';
import DeblurIcon from '@mui/icons-material/Deblur';
import { ALL_EMPLOYEE_MISSING_REPORT_PAGE_TITLE } from '../../Pages/BiometricTables/MissingReports/AccessLevelMissingReportSearch';
import { WARNING_MAILS_CREATION_PAGE_TITLE } from '../../Pages/WarningMails/CreateWarningMails';
import { ALL_EMPLOYEE_WARNING_MAILS_PAGE_TITLE } from '../../Pages/WarningMails/WarningMailSearch';
import { PARTICULAR_EMPLOYEE_WARNING_MAILS_PAGE_TITLE } from '../../Pages/WarningMails/WarnigMaillTable';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import  {ACCESS_LEVEL_WARNING_MAIL_SEARCH_GIVEN_DATES_PAGE_TITLE} from '../../Pages/WarningMails/AllWarningMailReportsWithSearch'
import { REVIEW_RATING_CREATION_PAGE_TITLE } from '../../Pages/Rating/EmpReviewRating';
import { PARTUCULAR_EMPLOYEE_REVIEW_RATING_TABLE_TITLE } from '../../Pages/Rating/EmpReviewModule';
import { ALL_EMPLOYEE_REVIEW_RATING_SYSTEM_PAGE_TITLE } from '../../Pages/Rating/AllEmpReviewRating';
import StarIcon from '@mui/icons-material/Star';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { ACCESS_LEVEL_GIVEN_TABLE_PAGE_TITLE } from '../../Pages/AccessTables/EmpAccess';
import { ALL_EMPLOYEES_SKILL_REPORT_PAGE_TITLE } from '../../Pages/EmpSkillReport/EmployeeSkillsReport';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { ALL_EMPLOYEE_TERMINATION_PAGE_TITLE } from '../../Pages/Employee/TerminatedEmployee/TerminationTable';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import FestivalIcon from '@mui/icons-material/Festival';
import { HOLIDAYLIST_FOR_ALLEMPLOYEES } from '../../Pages/Holiday/HolidayTable';
// import { HOLIDAYLIST_FOR_ALLEMPLOYEES } from '../../Pages/Holiday/HolidayTable';


const SideNavBar = (props) => {

    const func1=props.close


    const navigate = useNavigate()
    const [profileOpen, setprofileOpen] = React.useState(false);
    const [employeesOpen, setemployeesOpen] = React.useState(false);
    const [workInfoOpen, setworkInfoOpen] = React.useState(false);
    const [taskDetails,setTaskDetails]=useState(false)
    const[biometricOpen,setBiometricOpen]=useState(false)
    const[accessOpen,setAccessOpen]=React.useState(false);
    const[LeavesOpen,setLeavesOpen]=useState(false)
    const [warningMailOpen,setwarningMailOpen]=useState(false)
    const [ratingInfoOpen,setratingInfoOpen]=useState(false)
    const[skillsOpen,setSkillsOpen]=useState(false)
    const [training,settraining]=useState(false)

const handletraining=()=>{
    settraining(!training)
    setSkillsOpen(false)
    setworkInfoOpen(false);
    setprofileOpen(false);
    setemployeesOpen(false);
    setTaskDetails(false);
    setAccessOpen(false);
    setBiometricOpen(false)
    setwarningMailOpen(false)
    setratingInfoOpen(false)
    setLeavesOpen(false);
}


    const handleleaveupload=()=>{
        if (func1==undefined){
            navigate(`/user/Leaves-Data-upload`)
        }
        else{
            navigate(`/user/Leaves-Data-upload`)
            func1()
        }
      
    }


    const handleSkillsClick=()=>{
        setSkillsOpen(!skillsOpen)
        setworkInfoOpen(false);
        setprofileOpen(false);
        setemployeesOpen(false);
        setTaskDetails(false);
        setAccessOpen(false);
        setBiometricOpen(false)
        setwarningMailOpen(false)
        setratingInfoOpen(false)
        setLeavesOpen(false);
        settraining(false)
    
       }
    const handleRating=()=>{
        setratingInfoOpen(!ratingInfoOpen)
        setwarningMailOpen(false)
    setprofileOpen(false)
    setBiometricOpen(false)
    setTaskDetails(false)
    setworkInfoOpen(false);
    setemployeesOpen(false);
    setAccessOpen(false);
    setLeavesOpen(false)
    setSkillsOpen(false);
    settraining(false)
    }

const handleWarningMail=()=>{
    setwarningMailOpen(!warningMailOpen)
    setprofileOpen(false)
    setBiometricOpen(false)
    setTaskDetails(false)
    setworkInfoOpen(false);
    setemployeesOpen(false);
    setAccessOpen(false);
    setLeavesOpen(false)
    setratingInfoOpen(false)
    setSkillsOpen(false);
    settraining(false)
}



    const handleProfileClick = () => {
        setprofileOpen(!profileOpen);
        setBiometricOpen(false)
        setTaskDetails(false)
        setworkInfoOpen(false);
        setemployeesOpen(false);
        setAccessOpen(false);
        setLeavesOpen(false)
        setwarningMailOpen(false)
        setratingInfoOpen(false)
        setSkillsOpen(false);
        settraining(false)
    };
    const handleEmployeeClick = () => {
        setemployeesOpen(!employeesOpen);
        setBiometricOpen(false)
        setTaskDetails(false)
        setworkInfoOpen(false);
        setprofileOpen(false);
        setAccessOpen(false);
        setLeavesOpen(false)
        setwarningMailOpen(false)
        setratingInfoOpen(false)
        setSkillsOpen(false);
        settraining(false)
    };
    const handleworkInfoOpenClick = () => {
        setworkInfoOpen(!workInfoOpen);
        setBiometricOpen(false)
        setTaskDetails(false)
        setprofileOpen(false);
        setemployeesOpen(false);
        setAccessOpen(false);
        setLeavesOpen(false)
        setwarningMailOpen(false)
        setratingInfoOpen(false)
        setSkillsOpen(false);
        settraining(false)
    };
    const handleAccessOpenClick=()=>{
        setAccessOpen(!accessOpen);
        setworkInfoOpen(false);
        setBiometricOpen(false)
        setTaskDetails(false)
        setprofileOpen(false);
        setemployeesOpen(false);
        setLeavesOpen(false)
        settraining(false)
        setwarningMailOpen(false)
        setratingInfoOpen(false)
        setSkillsOpen(false);
    }

    const handleTaskDetails=()=>{
        setTaskDetails(!taskDetails)
        setBiometricOpen(false)
        setworkInfoOpen(false);
        setprofileOpen(false);
        setemployeesOpen(false);
        setAccessOpen(false);
        setLeavesOpen(false)
        setwarningMailOpen(false)
        setratingInfoOpen(false)
        setSkillsOpen(false);
        settraining(false)

    }
   const handleBiometric=()=>{
    setBiometricOpen(!biometricOpen)
    setworkInfoOpen(false);
    setprofileOpen(false);
    setemployeesOpen(false);
    setTaskDetails(false);
    setLeavesOpen(false)
    setAccessOpen(false);
    setwarningMailOpen(false)
    setratingInfoOpen(false)
    setSkillsOpen(false);
    settraining(false)
   }

   const handleLeavesClick=()=>{
    setLeavesOpen(!LeavesOpen)
    setworkInfoOpen(false);
    setprofileOpen(false);
    setemployeesOpen(false);
    setTaskDetails(false);
    setAccessOpen(false);
    setBiometricOpen(false)
    setwarningMailOpen(false)
    setratingInfoOpen(false)
    setSkillsOpen(false);
    settraining(false);
   }

   

    const logoutHandle = () => {
        func1()
        Swal.fire({
            icon: "warning",
            iconColor:"#d50000",
            title: 'Do you want to Leave?',
            showCancelButton: true,
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#d50000'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.clear()
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logout successfully completed ! Redirecting to Login page...',
                showConfirmButton: false,
                timer: 1500
              })
              navigate("/login")
            } 
          })
    }

    const handleNavigation=(page)=>{
        navigate(page)
    }

    return (

        <Container>

{/* leaves option starts here */}

{/* employee-leave-data-upload-as-per-band */}

            <ListItemButton onClick={handleLeavesClick}>
                <SignalCellularAlt2BarIcon>
                    <ManageAccountsIcon color='white'/>
                </SignalCellularAlt2BarIcon>
                <ListItemText sx={{pl:4}} primary="Leaves" />
                {LeavesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

        <Collapse in={LeavesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                   
                      {hasAuthority(LEAVES_DATA_UPLOAD_PAGE_TITLE)?
                      <ListItemButton sx={{ pl: 4 }}
                      onClick={handleleaveupload} 
                     // onClick={()=>{navigate(`/user/Leaves-Data-upload`)}}
                     >
                         <UploadIcon sx={{ pl:1 }}>
                             <SpeakerNotes color='white' />
                         </UploadIcon>
                         <ListItemText sx={{ pl:1 }} primary="Leave Upload" />
                     </ListItemButton>:null  
                    }
                    
                    {hasAuthority(LEAVES_DATA_UPLOAD_AS_PER_BAND_PAGE_TITLE)?
                      <ListItemButton sx={{ pl: 4 }}
                      onClick={()=>{
                        if (func1==undefined){
                        navigate(`/user/employee-leave-data-upload-as-per-band`)
                    }else{
                        navigate(`/user/employee-leave-data-upload-as-per-band`) 
                        func1()
                    }
                }
                        }
                     >
                         <UploadIcon sx={{ pl:1 }}>
                             <SpeakerNotes color='white' />
                         </UploadIcon>
                         <ListItemText sx={{ pl:1 }} primary="Band leave upload" />
                     </ListItemButton>:null  
                    }

                  
  {
    hasAuthority(EMPLOYEE_LEAVES_SPENT_PAGE_TITLE)?
    <ListItemButton sx={{ pl: 4 }} 
     onClick={()=>{
        if (func1==undefined){
        navigate(`/user/employee-spent-leaves`)
     }
     else{
        navigate(`/user/employee-spent-leaves`)
        func1()
     }
    }}
    >
        <TableRowsIcon sx={{ pl:1 }}>
            <Create color='white' />
        </TableRowsIcon>
        <ListItemText sx={{ pl:1 }} primary="Leaves Spent" />
    </ListItemButton>
    :null
}

{
    hasAuthority(HOLIDAYLIST_FOR_ALLEMPLOYEES)?
    <ListItemButton sx={{ pl: 4}}
    onClick={()=>{
        if(func1==undefined){
            navigate(`/user/holiday`)
        }
        else{
            navigate(`/user/holiday`)
            func1()
        }
    }}
    >
         <FestivalIcon sx={{ pl:1 }}>
            <Create color='white' />
        </FestivalIcon>
        <ListItemText sx={{ pl:1 }} primary="Holiday List" />
    </ListItemButton>:null
}
         

                    {hasAuthority( ALL_EMPLOYEE_LEAVES_REPORT_PAGE_TITLE )?
                      <ListItemButton sx={{ pl: 4 }} 
                      onClick={()=>{
                        if (func1==undefined){
                        navigate("/user/All-employees-Leave-Report")
                        }
                        else{
                            navigate("/user/All-employees-Leave-Report")
                            func1()
                        }
                    }}
                     >
                         <TableRowsIcon sx={{ pl:1 }}>
                             <Create color='white' />
                         </TableRowsIcon>
                         <ListItemText sx={{ pl:1 }} primary="Leaves Report" />
                     </ListItemButton>:null}
                  
                </List>
            </Collapse>


{/* biometric details starts here */}


<ListItemButton onClick={handleBiometric}>
                <ListItemIcon>
                    <DeblurIcon color='white' />
                </ListItemIcon>
                <ListItemText primary="Biometric" />
                {biometricOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={biometricOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                    if (func1==undefined){
                    navigate('/user/empbiometric')
                    }
                    else{
                        navigate('/user/empbiometric')
                        func1()
                    }

                    }}>
                        <Person4Icon  sx={{ pl:1 }}>
                            <SpeakerNotes color='white' />
                        </Person4Icon>
                        <ListItemText  sx={{ pl:1 }}  primaryTypographyProps={{fontSize: '16px'}}  primary=" Biometric Report" />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                    if (func1==undefined){
                    navigate('/user/employee-biometric-detailed-missing-reports')
                    }
                    else{
                        navigate('/user/employee-biometric-detailed-missing-reports')
                        func1()
                    }

                    }}>
                        <TableRowsIcon  sx={{ pl:1 }}>
                            <SpeakerNotes color='white' />
                        </TableRowsIcon>
                        <ListItemText  sx={{ pl:1 }}  primaryTypographyProps={{fontSize: '16px'}}  primary="Missing Report" />
                    </ListItemButton>

                   
                   {
                    hasAuthority( BIOMETRIC_DATA_UPLOAD_PAGE_TITLE)?
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                        if (func1==undefined){
                    
                            navigate('/user/biometric')
                        }else{
                            navigate('/user/biometric')
                            func1()
                        }
                    }}>
                    <FingerprintIcon  sx={{ pl:1 }}>
                        <SpeakerNotes color='white' />
                    </FingerprintIcon>
                    <ListItemText  sx={{ pl:1 }} primaryTypographyProps={{fontSize: '16px'}}  primary="Biometric Upload" />
                </ListItemButton>:null
                   }
               
{
    hasAuthority(ACCESS_LEVEL_FIRST_BIOMETRIC_TABLE_TITLE)?
    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
        if (func1==undefined){
        navigate('/user/biometric-search')
        }
        else{
            navigate('/user/biometric-search')
            func1()
        }
    }}>
    <TableRowsIcon  sx={{ pl:1 }}>
        <SpeakerNotes color='white' />
    </TableRowsIcon>
    <ListItemText   sx={{ pl:1 }} primaryTypographyProps={{fontSize: '16px'}} primary="Biometric Data" />
</ListItemButton>:null

}

{
    hasAuthority( ALL_EMPLOYEE_MISSING_REPORT_PAGE_TITLE)?
    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
        if (func1==undefined){
        navigate('/user/all-employee-biometric-missing-reports')
        }
        else{
            navigate('/user/all-employee-biometric-missing-reports')
            func1()
        }
    }}>
    <TableRowsIcon  sx={{ pl:1 }}>
        <SpeakerNotes color='white' />
    </TableRowsIcon>
    <ListItemText   sx={{ pl:1 }} primaryTypographyProps={{fontSize: '16px'}} primary="All Missing Report" />
</ListItemButton>:null

}


               
                </List>
            </Collapse>


{/* //biometric details end here */}
{/*---------------------Profile------------------- */}


            {/* <ListItemButton onClick={handleProfileClick}>
                <ListItemIcon>
                    <ManageAccountsIcon color='white' />
                </ListItemIcon>
                <ListItemText primary="Profile" />
                {profileOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={profileOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                        if (func1==undefined){
                        handleNavigation('/user/profile')
                    }
                    else{
                        handleNavigation('/user/profile')
                        func1()
                    }
                    }}>
                        <InfoIcon  sx={{ pl:1 }}>
                            <SpeakerNotes color='white' />
                        </InfoIcon>
                        <ListItemText  sx={{ pl:1 }} primary="Information" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                         if (func1==undefined){
                        navigate("/user/change-password")
                         }
                         else{
                            navigate("/user/change-password")
                            func1()
                         }
                    
                    }}>
                        <ChangeCircleIcon  sx={{ pl:1 }}>
                            <Create color='white' />
                        </ChangeCircleIcon>
                        <ListItemText  sx={{ pl:1 }} primary="Change Password" />
                    </ListItemButton>
                </List>
            </Collapse>
 */}



 

{/*---------------------TaskDetails------------------- */}

<ListItemButton onClick={handleTaskDetails}>
                <ListItemIcon>
                    <TaskIcon color='white' />
                </ListItemIcon>
                <ListItemText primary="TaskDetails" />
                {taskDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={taskDetails} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>


                <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                         if (func1==undefined){
                        navigate("/user/daily-report")
                         }
                         else{
                            navigate("/user/daily-report")
                            func1()
                         }
                        }}>
                        <AssignmentLateIcon sx={{ pl:1 }}>
                            <SpeakerNotes color='white' />
                        </AssignmentLateIcon>
                        <ListItemText primaryTypographyProps={{fontSize: '16px'}} sx={{ pl:1 }} primary="Create Task" />
                    </ListItemButton>



                <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                      if (func1==undefined){
                    navigate("/user/emptaskstatus")
                      }
                      else{
                        navigate("/user/emptaskstatus")
                        func1()
                      }
                    }}>
                        <Person4Icon sx={{ pl:1 }}>
                            <SpeakerNotes color='white' />
                        </Person4Icon>
                        <ListItemText primaryTypographyProps={{fontSize: '16px'}} sx={{ pl:1 }} primary="Emp Task Report" />
                    </ListItemButton>

                  
                  
                  {
                    hasAuthority(ACCESS_LEVEL_TASK_STATUS_TITLE)?
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                        if (func1==undefined){
                        navigate("/user/ts")
                        }
                        else{
                            navigate("/user/ts")
                            func1()
                        }
                        }}>
                    <TableRowsIcon sx={{ pl:1 }}>
                        <SpeakerNotes color='white' />
                    </TableRowsIcon>
                    <ListItemText sx={{ pl:1 }} primary="Task Status" primaryTypographyProps={{fontSize: '16px'}}/>
                </ListItemButton> :null
                  }
                
           {
            hasAuthority(ACCESS_LEVEL_VERIFICATION_PENDING_TABLE_TITLE)?
            
            <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                if (func1==undefined){
                navigate("/user/vp")
                }
                else{
                    navigate("/user/vp")
                    func1()
                }
                }}>
            <TableRowsIcon sx={{ pl:1 }}>
                <SpeakerNotes color='white' />
            </TableRowsIcon>
            <ListItemText sx={{ pl:1 }} primary="Verification Pending"  primaryTypographyProps={{fontSize: '16px'}}/>
        </ListItemButton>:null
           }
      
                    {/* <ListItemButton sx={{ pl: 4 }} onClick={()=>{navigate("/user/sp")}}>
                        <TableChartIcon sx={{ pl:1 }}>
                            <SpeakerNotes color='white' />
                        </TableChartIcon>
                        <ListItemText primaryTypographyProps={{fontSize: '16px'}} sx={{ pl:1 }} primary="Status Pending" />
                    </ListItemButton> */}

                </List>
            </Collapse>

{/*---------------------Employees------------------- */}
{hasAuthority( EMPLOYEE_TABLE_PAGE_TITLE)?<>
 <ListItemButton onClick={handleEmployeeClick}>
 <Groups3Icon>
     <ManageAccountsIcon color='white'/>
 </Groups3Icon>
 <ListItemText sx={{ pl: 4 }}  primary="Employees" />
 {employeesOpen ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>

<Collapse in={employeesOpen} timeout="auto" unmountOnExit>
 <List component="div" disablePadding>
     <ListItemButton sx={{ pl: 4 }} onClick={()=>{
         if (func1==undefined){
        handleNavigation('/user/employees')
         }
         else{
            handleNavigation('/user/employees')
            func1()
         }
        }}>
         <Groups2Icon sx={{ pl: 1 }}>
             <SpeakerNotes color='white' />
         </Groups2Icon>
         <ListItemText sx={{ pl: 1 }} primary="Employees" />
     </ListItemButton>

     {
        hasAuthority(ALL_EMPLOYEE_TERMINATION_PAGE_TITLE)?<ListItemButton sx={{ pl: 4 }} onClick={()=>{
            if (func1==undefined){
           handleNavigation('/user/All-Employee-Termination-details')
            }
            else{
               handleNavigation('/user/All-Employee-Termination-details')
               func1()
            }
           }}>
            <IndeterminateCheckBoxIcon sx={{ pl: 1 }}>
                <SpeakerNotes color='white' />
            </IndeterminateCheckBoxIcon>
            <ListItemText sx={{ pl: 1 }} primary=" Resigned Employees" />
        </ListItemButton>:null
     }
     



     {
        hasAuthority(REPORTED_EMPLOYEES_PAGE_TITLE)? <ListItemButton sx={{ pl: 4 }} onClick={()=>{
            if (func1==undefined){
            handleNavigation('/user/reporting-employees')
        }
        else{
            handleNavigation('/user/reporting-employees')
            func1()
        }
        }}>
        <Groups2Icon sx={{ pl: 1 }}>
            <SpeakerNotes color='white' />
        </Groups2Icon>
        <ListItemText sx={{ pl: 1 }} primary="Reporting Employees" />
    </ListItemButton>:null
     }
    
 </List>
</Collapse>
</> :null}    
{/*------------------------- Work Information------------------- */}
            <ListItemButton onClick={handleworkInfoOpenClick}>
                <ListItemIcon>
                    <AddHomeWorkIcon color='white' />
                </ListItemIcon>
                <ListItemText primary="Work Information" />
                {workInfoOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={workInfoOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}  onClick={()=>{
                         if (func1==undefined){
                        handleNavigation('/user/reporting-manager-data')
                    }else{
                        handleNavigation('/user/reporting-manager-data')
                        func1()
                    }
                    }}>
                        <Person2 sx={{ pl: 1 }}>
                            <SpeakerNotes color='white' />
                        </Person2>
                        <ListItemText sx={{ pl: 1 }} primary="Reporting Manager" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                         if (func1==undefined){
                        handleNavigation('/user/employee-shift-timing-data')
                    }
                    else{
                        handleNavigation('/user/employee-shift-timing-data') 
                        func1()
                    }
                    }}>
                        <AccessTimeIcon  sx={{ pl: 1 }}>
                            <SpeakerNotes color='white'/>
                        </AccessTimeIcon>
                        <ListItemText sx={{ pl: 1 }} primary="Shift Timings" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                         if (func1==undefined){
                        handleNavigation('/user/employee-work-location-data')
                    }else{
                        handleNavigation('/user/employee-work-location-data')
                        func1()
                    }
                    }}>
                        <AddLocationAltIcon sx={{ pl: 1 }}> 
                            <SpeakerNotes color='white' />
                        </AddLocationAltIcon>
                        <ListItemText sx={{ pl: 1 }} primary="Working From" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/*------------------------- Access------------------- */}

            {
                hasAuthority(ACCESS_LEVEL_GIVEN_TABLE_PAGE_TITLE)?<>
                <ListItemButton onClick={handleAccessOpenClick}>
                <ListItemIcon>
                    <KeyIcon color='white' />
                </ListItemIcon>
                <ListItemText primary="Access" />
                {accessOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={accessOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}  onClick={()=>{
                          if (func1==undefined){
                            handleNavigation('/user/emp-access')
                        }else{
                            handleNavigation('/user/emp-access')
                            func1()
                        }
                    }}>
                        <ListItemIcon>
                            <Person4Icon color='white' />
                        </ListItemIcon>
                        <ListItemText primary="Employee Access" />
                    </ListItemButton>
                </List>
            </Collapse></>:null


            }

{/* --------------------------------------rating starts here---------------------------------------------------------- */}


  <ListItemButton onClick={handleRating} >
                <ListItemIcon>
                    <StarIcon color='white' />
                </ListItemIcon>
                <ListItemText primary="Ratings" />
                { ratingInfoOpen? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={ratingInfoOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    {
                        hasAuthority( REVIEW_RATING_CREATION_PAGE_TITLE)?
                        <ListItemButton sx={{ pl: 4 }}  onClick={()=>{
                            if (func1==undefined){
                           handleNavigation('/user/Employee-review-rating-creation')
                       }else{
                           handleNavigation('/user/Employee-review-rating-creation')
                           func1()
                       }
                       }}>
                           <StarIcon sx={{ pl: 1 }}>
                               <SpeakerNotes color='white' />
                           </StarIcon>
                           <ListItemText sx={{ pl: 1 }} primary="Review Rating" />
                       </ListItemButton>:null
                    }
                   
                   {
                    hasAuthority(PARTUCULAR_EMPLOYEE_REVIEW_RATING_TABLE_TITLE)?
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                        if (func1==undefined){
                       handleNavigation('/user/Employee-detailed-review-rating-table')
                   }
                   else{
                       handleNavigation('/user/Employee-detailed-review-rating-table') 
                       func1()
                   }
                   }}>
                       <TableRowsIcon  sx={{ pl: 1 }}>
                           <SpeakerNotes color='white'/>
                       </TableRowsIcon>
                       <ListItemText sx={{ pl: 1 }} primary="Employee Rating" />
                   </ListItemButton>:null
                   }

                  {
                    hasAuthority(ALL_EMPLOYEE_REVIEW_RATING_SYSTEM_PAGE_TITLE)?
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                        if (func1==undefined){
                       handleNavigation('/user/All-Employees-review-rating-table')
                   }else{
                       handleNavigation('/user/All-Employees-review-rating-table')
                       func1()
                   }
                   }}>
                       <TableRowsIcon sx={{ pl: 1 }}> 
                           <SpeakerNotes color='white' />
                       </TableRowsIcon>
                       <ListItemText sx={{ pl: 1 }} primary="Employees Rating" />
                   </ListItemButton>:null
                  }
                   
                </List>
            </Collapse>



{/* --------------------------------------rating end here---------------------------------------------------------- */}








{/* ---------------------------------------------warning mail button start---------------------------------- */}

<ListItemButton onClick={handleWarningMail}>
                <ListItemIcon>
                    <ReportIcon color='white' />
                </ListItemIcon>
                <ListItemText primary="Warning Mails" />
                {warningMailOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={warningMailOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    {
                        hasAuthority( WARNING_MAILS_CREATION_PAGE_TITLE)?
                        <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                            if (func1==undefined){
                            handleNavigation('/user/create-warning-mails')
                        }
                        else{
                            handleNavigation('/user/create-warning-mails')
                            func1()
                        }
                        }}>
                            <WarningIcon WarningIcon  sx={{ pl:1 }}>
                                <SpeakerNotes color='white' />
                            </WarningIcon>
                            <ListItemText  sx={{ pl:1 }} primary="Create Warning" />
                        </ListItemButton>:null
                    }
                  {
                    hasAuthority(PARTICULAR_EMPLOYEE_WARNING_MAILS_PAGE_TITLE)? <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                        if (func1==undefined){
                       navigate("/user/particular-employees-warning-mails")
                        }
                        else{
                           navigate("/user/particular-employees-warning-mails")
                           func1()
                        }
                   
                   }}>
                       <TableRowsIcon  sx={{ pl:1 }}>
                           <Create color='white' />
                       </TableRowsIcon>
                       <ListItemText  sx={{ pl:1 }} primary="Employee Warning" />
                   </ListItemButton>:null
                  }

{
    hasAuthority(ACCESS_LEVEL_WARNING_MAIL_SEARCH_GIVEN_DATES_PAGE_TITLE)?
    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
        if (func1==undefined){
       navigate("/user/all-warning-mails-between-given-dates")
        }
        else{
           navigate("/user/all-warning-mails-between-given-dates")
           func1()
        }
   
   }}>
       <TableRowsIcon  sx={{ pl:1 }}>
           <Create color='white' />
       </TableRowsIcon>
       <ListItemText  sx={{ pl:1 }} primary="Employees Warning" />
   </ListItemButton>:null
}      


{/* {
    hasAuthority(ALL_EMPLOYEE_WARNING_MAILS_PAGE_TITLE)?
    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
        if (func1==undefined){
       navigate("/user/all-employees-warning-mails")
        }
        else{
           navigate("/user/all-employees-warning-mails")
           func1()
        }
   
   }}>
       <TableRowsIcon  sx={{ pl:1 }}>
           <Create color='white' />
       </TableRowsIcon>
       <ListItemText  sx={{ pl:1 }} primary="All Warning" />
   </ListItemButton>:null
}           */}
                </List>
            </Collapse>






{/* ---------------------------------------------warning mail button end---------------------------------- */}

<ListItemButton onClick={handleSkillsClick}>
                <AcUnitIcon>
                    <ManageAccountsIcon color='white'/>
                </AcUnitIcon>
                <ListItemText sx={{pl:4}} primary="Skills" />
                {skillsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={skillsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                         if (func1==undefined){
                            navigate("/user/create-skill-report")
                             }
                             else{
                                navigate("/user/create-skill-report")
                                func1()
                             }}}
                    >
                        <AcUnitIcon sx={{pl:1}}>
                            <SpeakerNotes color='white'/>
                        </AcUnitIcon>
                        <ListItemText  sx={{ pl:1 }}  primaryTypographyProps={{fontSize:'16px'}} 
                        primary="Create Skill Report"/>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                         if (func1==undefined){
                            navigate("/user/employee-skills-report")
                             }
                             else{
                                navigate("/user/employee-skills-report")
                                func1()
                             }}}
                       
                    >
                        <TableRowsIcon sx={{pl:1}}>
                            <SpeakerNotes color='white'/>
                        </TableRowsIcon>
                        <ListItemText  sx={{ pl:1 }}  primaryTypographyProps={{fontSize:'16px'}} 
                        primary="Employee Skills"/>
                    </ListItemButton>
                    {
                        hasAuthority( ALL_EMPLOYEES_SKILL_REPORT_PAGE_TITLE) ? <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                            if (func1==undefined){
                                navigate("/user/all-emp-skills")
                                 }
                                 else{
                                    navigate("/user/all-emp-skills")
                                    func1()
                                 }}}
                        >
                            <TableRowsIcon sx={{pl:1}}>
                                <SpeakerNotes color='white'/>
                            </TableRowsIcon>
                            <ListItemText  sx={{ pl:1 }}  primaryTypographyProps={{fontSize:'16px'}} 
                            primary="Employees Skills"/>
    
                        </ListItemButton>:null
                    }
                   



                </List>
            </Collapse>

  



<Grid Container>
          <Grid item xs={12} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none',lg:"none",xl:"none" }}}>
            <ListItemButton type='submit'>
                <ListItemIcon>
                    <LogoutIcon color='white'></LogoutIcon>
                </ListItemIcon>
                <ListItemText onClick={logoutHandle} primary="Logout" />
            </ListItemButton>
</Grid>
</Grid>
        </Container>
    )
}

export default SideNavBar