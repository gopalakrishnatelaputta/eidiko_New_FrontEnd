import { useNavigate } from "react-router";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {Grid} from "@mui/material";
import { useLocation } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified';
import {GlobalButton} from "../stylecomponent/GlobalButton"
import { toast } from "react-toastify";
import { taskService } from "../../Services/Employee-Task-Service/taskService";
import moment from "moment";
import { NoAuth } from "../HelperComponent/NoAuth";
import { hasAuthority } from "../../Services/AccessLevel/AccessLevelService";


export const  EMPLOYEE_LEVEL_TASK_DETAILS_ELABORATELY_TITLE= "TASK_DETAILS_ELABORATELY_1"

export default function EmpTaskDetailsElaborately(props){

const [taskDetail,setTaskDetail]=useState()
 const navigate=useNavigate()
 const { state } = useLocation(props.state);

 let dataVerification=props.state
 let veridata=props.row1
const func1=props.onClose1
const[rowSelectionModel,setrowSelectionModel]=useState()


useEffect(()=>{
    if(state==null){
        setTaskDetail(dataVerification)
        setrowSelectionModel(veridata)
    }
    else{
        setTaskDetail(state)
        setrowSelectionModel(state.taskDetailsId)
    }
    
},[])

let date1=moment(taskDetail?.statusReportDate).format("DD/MM/YYYY")
 let assignedDate=moment(taskDetail?.assignedDate).format("DD/MM/YYYY")  
let status=taskDetail?.status
 let verifiedBy=taskDetail?.verifiedBy

 const verificationHandle=()=>{

    taskService.VerificationOfDaylyReport(rowSelectionModel).then((res)=>{
      
      if(res.status===200 && res.statusMessage==='Success' ){
  
          toast.success(res.message, {
              position: toast.POSITION.TOP_CENTER
            });
            func1()
        }
        else{
          toast.error(res.message, {
              position: toast.POSITION.TOP_CENTER
          });
          func1()

  
        }
  }).catch((error)=>{
      toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER
      });
      func1()

  })


 }
 
const history=useNavigate()
const handleGoBack = () =>{
 history(-1);
};

    return hasAuthority(EMPLOYEE_LEVEL_TASK_DETAILS_ELABORATELY_TITLE)? (
        <Box>
               <Box sx={{mt:2,display:"flex",justifyContent:"space-between"}}>
    <Typography  style={{marginLeft:"5px",fontSize:"21px",fontFamily:"Times New Roman Times"}} color="#2196F3">
        EMPLOYEE TASK DETAILS
    </Typography>
   <Button sx={{marginRight:"7px"}} variant="outlined" startIcon={<ArrowBackIosNewIcon/>} 
   onClick={handleGoBack} >back</Button>
        </Box>
       <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>



        <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            
            <Box sx={{
                margin: '10px 5px',
                padding: '0px 0px',
                width: '90%',
                boxShadow: 'rgba(0, 0, 0, 0) 0px 3px 8px;'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Typography variant='h6' color='primary'>
                            {taskDetail?.taskDetail}
                        </Typography>
                        <Typography variant='p' sx={{
                            fontSize: '12px'
                        }}>
                            (Assigned by {taskDetail?.assignedByName} on {assignedDate})
                        </Typography>
                    </Box>
                    <Box>
                       {verifiedBy!=null? <VerifiedIcon sx={{
                            color: 'green'
                        }} /> :<VerifiedIcon sx={{
                            color: 'red'
                        }} />}
                        <Typography variant='p' sx={{
                            fontSize: '12px'
                        }}>
                            Verified by {taskDetail?.verifiedBy}
                        </Typography>
                    </Box>
                </Box>
                <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                <Box sx={{width:"auto",
                    padding: '2%',
                    minHeight: '300px',
                    width:"auto"
                }}>
                    <Typography  variant='p' dangerouslySetInnerHTML={{__html:taskDetail?.desc}}>
                        {/* {taskDetail?.desc} */}
                    </Typography>
                  
                   
                </Box>
                
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                   columnGap:'50px'

                }}>
                    <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                    <TableContainer   >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Emp Id</TableCell>
                                    <TableCell>Team</TableCell>
                                    <TableCell>Reported Date(g)</TableCell>
                                    <TableCell>Status(g)</TableCell>
                                    <TableCell>Reason</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                    <TableCell>{taskDetail?.empId}</TableCell>
                                    <TableCell>{taskDetail?.team}</TableCell>
                                    <TableCell>{date1}</TableCell>
                                    <TableCell>{status==="Yes"?"Completed":"Not Completed"}</TableCell>
                                    <TableCell>{taskDetail?.reason}</TableCell>
                                </TableRow>
                            </TableBody></Table></TableContainer>

           
                 </Box>
               
                
           

            </Box>
        </Container>
        </Box>

    ):<NoAuth></NoAuth>


}