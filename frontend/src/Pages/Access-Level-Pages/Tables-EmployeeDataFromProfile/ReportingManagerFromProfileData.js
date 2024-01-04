import * as React from 'react';
// import './em.css'
import { 
  Box,
  Grid, 
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
import { toast } from 'react-toastify'
import Loading from "../../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import { ReportingManModal } from '../UpdateModals/ReportingManModal';
import {Modal} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { AccessLevelTableStyle } from './AccessLevelTableStyle';





export const  ACCESS_LEVEL_REPORTING_MANAGER_TABLE_TITLE= "REPORTING_MANAGER_TABLE"

export default function ReportingManagerFromProfileData(props) {

  const [reportm,setReportm]=useState(false)

  const handleRmOpen=()=>{
    setReportm(true)
  }


  const[manager,setManager]=useState([])
  const ManagerRowHandler=(params)=>{
    setManager(params.row)
  }


  const columns = [
   
    { 
      field: 'empId',
     headerName: 'Employee Id', 
     minWidth: 90,
      flex:1.5,
     headerClassName:'table-header'
   
    },
    { 
      field: 'mngrIdWithname',
     headerName: 'Manager Name',
     minWidth: 210,
      flex:3,
     headerClassName:'table-header'
     
    },
    
   
   
    { 
    field: 'startDate',
     headerName: 'Start Date', 
     minWidth: 120,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     moment(params?.value ? params.value.slice(0,10):"" ).format("DD/MM/YYYY"),
      
     
    },
    { 
     field: 'endDate',
     headerName: 'End Date', 
     minWidth: 120,
     flex:2,
     headerClassName:'table-header',
     valueFormatter: params =>{
      let enddate=""
     if(params?.value!==null){
      enddate=moment(params.value).format("DD/MM/YYYY")
      return enddate
     }
  else{
    return null
  }
    }
    },
    { 
      field: 'modifiedDate',
     headerName: 'Modified Date', 
     minWidth: 120,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
  
     
    },
    { 
      field: 'modifiedBy',
     headerName: 'Modified By', 
     minWidth: 210,
      flex:3,
     headerClassName:'table-header'
  
    },
  
    {
      field: 'edit',
      headerName: 'Update',
      minWidth: 90,
      flex:2,
      headerClassName: 'table-header',
      renderCell: (params) => {

          return (
              <Box sx={{
                  display: 'flex',
                  justifyContent: 'center'
              }}>
                  <IconButton variant="contained" color='error'>
                 <EditIcon onClick={handleRmOpen} color='secondary' sx={{marginRight:"39px"}}/>
                  <Modal
                  sx={{overflow:"scroll"}}
                      open={reportm}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description">
                    <ReportingManModal manager={manager} onClose1={()=>{setReportm(false)}} 
                    />
                  </Modal>
                 </IconButton >
  
              </Box>
          );
      }
  }
  
  ];

  


  const {state}=useLocation(props.state)
  const[empId,setEmpId]=useState(state.empId)
  
  const [reportingManagerTable,setReportingManagerTable]=React.useState([])
  const navigate=useNavigate()

  const[isLoading,setIsLoading]=useState(true)
 
function fetchRMData(empId){
  EmployeeAccessLevelService.ReportingManagerFromProfile(empId).then((res)=>{

    if(res.status===200 && res.statusMessage==="success"){
      setIsLoading(false)
    setReportingManagerTable(res.result)
    }
    else{
      setIsLoading(false)
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
    })
    }

  }).catch((err)=>{

  setIsLoading(false)
  })
}

  React.useEffect(()=>{
  fetchRMData(empId)
  },[reportm])




//backbutton
const backbutton=useNavigate()

  return hasAuthority(ACCESS_LEVEL_REPORTING_MANAGER_TABLE_TITLE)? (
    isLoading ?<Loading/>:
    <Box style={AccessLevelTableStyle.firstBox}>
      <Box style={AccessLevelTableStyle.SecondBox}>
      
                  <Typography style={AccessLevelTableStyle.typographystyle} >REPORTING MANAGER</Typography>
                 <Box>
                  <Button variant='outlined' style={AccessLevelTableStyle.backbuttonstyle}
                startIcon={<Person4Icon></Person4Icon>} 
                onClick={()=>{navigate(`../access-level-reporting-manager-creation`,{state:{"empId":empId}})}}
                 >
                            CREATE REPORTING MANAGER
                </Button>
                <Button variant='outlined' style={AccessLevelTableStyle.backbuttonstyle}
                 onClick={()=>{backbutton(`/user/${empId}`)}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Box>
                 </Box>

                <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
               

                  <Box style={AccessLevelTableStyle.DatagridBoxStyle}>

                  
                 <DataGrid 
                  rows={reportingManagerTable}
                  columns={columns} 
                  getRowId={(reportingManagerTable) => reportingManagerTable.id}
                  onRowClick={ManagerRowHandler}    
                    initialState={{
                      ...reportingManagerTable.initialState,
                    pagination: { paginationModel: { pageSize: 8} },
                  }}
                  pageSizeOptions={[8,15,25,50,75]}
                 />
                </Box>

    </Box>
  ):<NoAuth></NoAuth>
}