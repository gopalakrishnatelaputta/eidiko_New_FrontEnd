import * as React from 'react';

import { Box,Grid, Paper} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {Divider} from '@mui/material';
import {Typography} from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { toast } from 'react-toastify'
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Loading from "../../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment/moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import { useLocation } from 'react-router';
import {Modal} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {ShiftTimingModal} from "../UpdateModals/ShiftTimingModal"
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { AccessLevelTableStyle } from './AccessLevelTableStyle';


export const  ACCESS_LEVEL_SHIFT_TIMING_TABLE_TITLE= "SHIFT_TIMING_TABLE"


export default function EmpShiftTimingfromProfileData(props) {

  const [reportm,setReportm]=useState(false)

  const handleRmOpen=()=>{
    setReportm(true)
  }
  const[shiftTiming,setShiftTiming]=useState([])
  const ManagerRowHandler=(params)=>{
    setShiftTiming(params.row)
  }

  
  const columns = [
    
    {field: 'empId',
    headerName: 'Employee Id', 
    minWidth: 90,
    flex:2,
    headerClassName:'table-header',
    renderCell: (params) => {
      return empId
    }
    
   },
    
    { 
      field: 'startDate',
     headerName: 'Start Date',
     minWidth: 120,
     flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
     
    },
    { 
      field: 'endDate',
     headerName: 'End Date', 
     minWidth: 120,
     flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     {
      let enddate=""
      if(params?.value!==null){
       enddate=moment(params?.value).format("DD/MM/YYYY")
      return enddate
      }
   else{
     return null
   }
     }
  
    },
    { 
      field: 'shiftStartTime',
     headerName: 'Shift Start Time', 
     minWidth: 100,
     flex:2,
     headerClassName:'table-header',
     renderCell: (params) => (
      params.value ? params.value.slice(0,5):"")
  
     
    },
    { 
      field: 'shiftEndTime',
     headerName: 'Shift End Time', 
     minWidth: 100,
     flex:2,
     headerClassName:'table-header',
     renderCell: (params) => (
      params.value ? params.value.slice(0,5):"")
  
     
    },
    { 
      field: 'weekOff',
     headerName: 'Week-Off', 
     minWidth: 140,
     flex:1.5,
     headerClassName:'table-header',

     renderCell: (params) => {
     
      return helpFunction.WeakOffShowing(params.formattedValue)
     
     }
  
    },
    {
      field: 'modifiedByWithName',
     headerName: 'Modified By', 
     minWidth: 200,
     flex:3,
     headerClassName:'table-header'
  
    },
    
    {
      field: 'edit',
      headerName: 'Update',
      minWidth:90,
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

                    <ShiftTimingModal manager={shiftTiming} empId={empId} onClose1={()=>{setReportm(false)}} />
                    
                  </Modal>
                 </IconButton >
  
              </Box>
          );
      }
  }
  
  ];


 const [shiftTimingsTable,setShiftTimingTable]=React.useState([])
 const[isLoading,setIsLoading]=useState(true)
const navigate=useNavigate()
const {state}=useLocation(props.state)
const[empId,setEmpId]=useState(state.empId)
function fetchDataOfShift(empId){
  EmployeeAccessLevelService.ShiftTimingsFromProfile(empId).then((res)=>{

    if(res.status===200 && res.statusMessage==="success"){
      setIsLoading(false)
    setShiftTimingTable(res.result)
    
    }
    else{
      setIsLoading(false)  
    
    }

  }).catch((err)=>{
    setIsLoading(false)  
  
  })
}


React.useEffect(()=>{
fetchDataOfShift(empId)
  
},[reportm])


 const backbutton=useNavigate()


  return hasAuthority(ACCESS_LEVEL_SHIFT_TIMING_TABLE_TITLE)? (
    isLoading ?<Loading/>:
    <Box style={AccessLevelTableStyle.firstBox}>
      <Box style={AccessLevelTableStyle.SecondBox}>
                 
                 
                  <Typography  color={"secondary"} style={AccessLevelTableStyle.typographystyle}> SHIFT TIMING</Typography>
                  <Box style={AccessLevelTableStyle.thirdbox}>
                  <Button variant='outlined' style={AccessLevelTableStyle.backbuttonstyle}  startIcon={<HistoryToggleOffIcon/>} 
                onClick={()=>{navigate(`../access-level-shift-timing-creation`,{state:{"empId":empId}})}} >
                            CREATE SHIFT 
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
                  rows={shiftTimingsTable}
                  columns={columns}
                  onRowClick={ManagerRowHandler}
                  getRowId={(shiftTimingsTable) => shiftTimingsTable.shiftTimingId}      
                    initialState={{
                    ...shiftTimingsTable.initialState,
                    pagination: { paginationModel: { pageSize: 8 } },
                  }}
                  pageSizeOptions={[8,15,25,50,75]}
                 />
                 </Box>
          
    </Box>
  ):<NoAuth></NoAuth>
}