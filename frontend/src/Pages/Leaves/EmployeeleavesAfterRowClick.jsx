import * as React from 'react';
// import './em.css'
import { 
  Box,
  Grid, 
   Modal, 
   Paper,
   Typography,
        } from "@mui/material";
import {FcBusinessman} from "react-icons/fc";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Navigate, useLocation, useNavigate } from 'react-router';
import {Divider} from '@mui/material';
import {Container} from '@mui/material';
import Person4Icon from '@mui/icons-material/Person4';
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { getReportingManagerTable } from '../../Services/employee-service/EmployeeService';
import { toast } from 'react-toastify'
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import PreviewIcon from '@mui/icons-material/Preview';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { LeaveServices } from '../../Services/Leave-Service/LeaveServices';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { LeavesComponetsstyle } from './LeavesComponentStyle';
import LeavesupdateModal from './LeavesUpdateModal';
import Swal from 'sweetalert2';

function getIdWithName(params) {
  return params.row?.modifiedBy+ " - "+params.row?.modifiedByName
}


export const EMPLOYEE_LEAVES_SPENT_AFTER_ROW_CLICK_PAGE_TITLE=" EMPLOYEE_LEAVES_SPENT_ROW_CLICK" 

export default function EmployeeLeaveSpentAfterRowClick(props) {

  const [empname,setempname]=useState()
const [totalLeavesAsPerBand,settotalLeavesAsPerBand]=useState()
const [leavecount,setleavecount]=useState(0)
const [absentcount,setabsentcount]=useState(0)

const [reportm,setReportm]= React.useState(false);
const handleRmOpen =() => setReportm(true);
const location=useLocation();
const queryParams= new URLSearchParams(location.search);
const param1Value=queryParams.get('empId');
const {state}=useLocation(props.state)
const[empId,setEmpId]=useState(param1Value)


// const[empId,setEmpId]=useState(state)


  const [biometricTable1,setBiometricTable1]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(false)
  const handleDelete=(value,action)=>{
    setIsLoading(true)
    if (action === 'delete') {
        Swal.fire({
            icon: "warning",
            iconColor:"#d50000",
            title: 'Do you want to delete this Leave ' + value.leaveStatusId,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#d50000'

           
        })

        .then((result) => {
            setIsLoading(false)
            if (result.isConfirmed) {
               LeaveServices.EmpLeaveDeletion(value.leaveStatusId).then((res)=>{
                    setIsLoading(false)
                    if(res.status===200){
                        Swal.fire(' Leaves  successfully removed', '', 'success')
                        setIsLoading(false)
                        window.location.reload()
                    }
                    else{
                        Swal.fire("Leaves with following id"+value.leaveStatusId+"doesn't exist",'',"error")
                        setIsLoading(false)
                    }
                })
                
            }
        })
    
      
}

}



  
  function fetchleavesDatawithId(){
    setIsLoading(true)
    LeaveServices.EmployeeLeavesSpent(empId).then((res)=>{
        if(res.status===200){
          setIsLoading(false)
          if(res.result.length==0){
            toast.info("No leaves data associated with this employee Id " +empId+" -   "+  res.empName, {
              position: toast.POSITION.TOP_CENTER
          })

          }
        setBiometricTable1(res.result)
        setempname(res.empName)
        settotalLeavesAsPerBand(res.totalLeavesAsPerBand)

        for(let i=0;i<res.result.length;i++){
          let abcount=0
          let lecount=0
        res.result.filter((leave)=>{
         
          if(leave.estatus==="A"){
          abcount++
          }
          else if(leave.estatus==="L"){
            lecount++
          }
        })
        setabsentcount(abcount)
        setleavecount(lecount)
      }

        }
        else{
          setIsLoading(false)
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT
        })
        }
    
      }).catch((err)=>{
    
      setIsLoading(false)
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT
    })
      })

  }



  React.useEffect(()=>{
      fetchleavesDatawithId()

  },[reportm])

  const [updateLeave,setUpdateLeave]=useState()

const handleRow = (params)=>{
  setUpdateLeave(params.row)

}



  const columns = [
    { 
      field: 'empId',
     headerName: 'Employee Name', 
     minWidth: 210,
      flex:3,
     headerClassName:'table-header',
     renderCell: (params)=>{
        
      return params?.value+" -"+empname 
       
     }
   
    },
    { 
      field: 'leaveDate',
     headerName: 'Leave Date', 
     minWidth: 125,
      flex:2.5,
     headerClassName:'table-header',
     valueFormatter: params => 
     {
      let biometricDate=""
      if(params?.value!==null){
       biometricDate=moment(params?.value).format("DD/MM/YYYY")
      return biometricDate
      }
   else{
     return null
   }
     }
   
    },
   
    { 
      field: 'estatus',
     headerName: ' Leave Status', 
     minWidth: 100,
      flex:1.5,
      align:"center",
     headerClassName:'table-header'
   
    },
    { 
      field: 'modifiedbywithname',
     headerName: 'Modified By', 
     minWidth: 210,
      flex:3,
      headerClassName:'table-header',
      valueGetter: getIdWithName,
    },  
    {
      field: 'edit',
      headerName: 'Edit',
      minWidth: 90,
      flex:1.5,
      headerClassName: 'table-header',
      renderCell: (params) => {
          return (
              <Box sx={{display: 'flex',justifyContent: 'center'}}>
                  <IconButton  variant="contained" sx={{color:"#2196F3"}}
                  >
                 <EditOutlinedIcon onClick={handleRmOpen} sx={{color:"#2196F3"}}/>
                 <Modal
                  sx={{overflow:"scroll"}}
                      open={reportm}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description">
                    <LeavesupdateModal UpdateLeave={updateLeave} onClose={()=>{setReportm(false)}} />
                  </Modal>
                
                 </IconButton >
  
              </Box>
              
          );
      }
  },


    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 80,
      flex:1.5,
      headerClassName: 'table-header',
      renderCell: (params) => {
          return  (
              <Box sx={{
                  display: 'flex',
                  justifyContent: 'center'
              }}>
                  <IconButton variant="contained" color='error'
                   onClick={(e) => handleDelete( params.row, 'delete')}
                  ><Delete /></IconButton >

              </Box>
          )
      }
  }
   
  
  ];

  return hasAuthority( EMPLOYEE_LEAVES_SPENT_AFTER_ROW_CLICK_PAGE_TITLE)? 
  ( isLoading?<Loading></Loading>:
 
    <Box style={LeavesComponetsstyle.firstBox}>

  <Box style={LeavesComponetsstyle.SecondBox} >
  <Typography style={LeavesComponetsstyle.typographystyle}> Spent Leaves of <span style={{color:"black"}}>{empname}</span></Typography>
  

             </Box>

             
   
        <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
    

        <Box sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
            marginRight:"30px",
        }}>

        <Typography color={"secondary"} style={{marginLeft:"10px",fontSize:"16px"}}>Total Eligible Leaves: <span style={{color:"green",fontSize:"20px"}}>{totalLeavesAsPerBand}</span></Typography>

        <Typography color={"secondary"} style={{fontSize:"16px"}}>Leaves Spent: <span style={{color:"black",fontSize:"20px"}}>{leavecount}</span></Typography>
        <Typography color={"secondary"} style={{fontSize:"16px"}}>Absent Count: <span style={{color:"red",fontSize:"20px"}}>{absentcount}</span></Typography>
             </Box>


    <Box style={LeavesComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    rows={biometricTable1}

    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.leaveStatusId}
    initialState={{
       ...biometricTable1.initialState,
     pagination: { paginationModel: { pageSize: 12} },
   }}
   onRowClick={handleRow}
   pageSizeOptions={[12,15,25,50,75]}

    >
       
    </DataGrid>
   </Box>
   </Box>
  ):<NoAuth></NoAuth>
}

