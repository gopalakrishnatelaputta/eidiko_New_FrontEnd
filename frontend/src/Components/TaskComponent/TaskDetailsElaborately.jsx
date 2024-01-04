
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
import moment from "moment/moment";
import { NoAuth } from "../HelperComponent/NoAuth";
import { hasAuthority } from "../../Services/AccessLevel/AccessLevelService";

export const  ACCESS_LEVEL_TASK_DETAILS_ELABORATELY_TITLE= "TASK_DETAILS_ELABORATELY"

export default function TaskDetailsElaborately(props){

const [taskDetail,setTaskDetail]=useState()
 const navigate=useNavigate()
 const { state } = useLocation(props.state);

 let dataVerification=props.state
 let veridata=props.row1
const func1=props.onClose1
const[rowSelectionModel,setrowSelectionModel]=useState([])


useEffect(()=>{
    if(state==null){
        setTaskDetail(dataVerification)
        setrowSelectionModel(veridata)
    }
    else{
        setTaskDetail(state)
        setrowSelectionModel([state.taskDetailsId])
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
           
            window.location.reload()
        }
        else{
          toast.error(res.message, {
              position: toast.POSITION.TOP_CENTER
          });
         
  
        }
  }).catch((error)=>{
    
      toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER
      });
     
  })


 }
 
const history=useNavigate()
const handleGoBack = () =>{
 history(-1);
};


    return hasAuthority(ACCESS_LEVEL_TASK_DETAILS_ELABORATELY_TITLE)? (
        <Box>
         <Box sx={{mt:2,display:"flex",justifyContent:"space-between"}}>
    <Typography   style={{marginLeft:"10px",fontSize:"21px",marginTop:"20px",fontFamily:"Times New Roman Times"}} color="#2196F3">
        TASK DETAILS
    </Typography>
   {state!==null ?<Button sx={{marginRight:"5px",marginTop:"15px"}} variant="outlined" 
   startIcon={<ArrowBackIosNewIcon/>} onClick={handleGoBack} >back</Button>:null}
        </Box>
       <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>



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
                    <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
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
                 <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center',
                marginTop:"20px"
            }}>
            
             {verifiedBy!=null ? null: <Button disableElevation sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} onClick={verificationHandle} >Verify</Button>}

               {state!==null?null:<Button disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>}
                </Grid>
                
           

            </Box>
        </Container>
        </Box>

    ):<NoAuth></NoAuth>


}