import * as React from 'react';

import { 
  Box,
  Grid, 
   Paper,
        } from "@mui/material";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {Divider} from '@mui/material';
import {Typography} from '@mui/material';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify'
import Loading from "../../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation } from 'react-router';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import { WorkLocationModal } from '../UpdateModals/WorkLocationModal';
import {Modal} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { AccessLevelTableStyle } from './AccessLevelTableStyle';


export const  ACCESS_LEVEL_WORKING_LOCATION_TABLE_TITLE= "WORKING_LOCATION_TABLE"

export default function EmpWorkLocationFromProfile(props) {

  const [reportm,setReportm]=useState(false)

  const handleRmOpen=()=>{
    setReportm(true)
  }


  const[working,setWorking]=useState([])
  const ManagerRowHandler=(params)=>{
    setWorking(params.row)
  }







  const columns = [
    {field: 'empId',
    headerName: 'Employee Id', 
    minWidth: 90,
    flex:1.5,
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
      field: 'workingFrom',
     headerName: 'Working From', 
     minWidth: 140,
     flex:2,
     headerClassName:'table-header'
     
    },
    { 
      field: 'location',
     headerName: 'Location', 
     minWidth: 150,
     flex:2,
     headerClassName:'table-header'
     
    },
    {
      field: 'modifiedByWithName',
     headerName: 'Modified By', 
     minWidth: 220,
     flex:3,
     headerClassName:'table-header'
  
    },

    {
      field: 'edit',
      headerName: 'Update',
      minWidth: 100,
      flex:1.5,
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
                    <WorkLocationModal working={working} empId={empId} onClose1={()=>{setReportm(false)}} 
                    />
                  </Modal>
                 </IconButton >
  
              </Box>
          );
      }
  }


  
  ];
  



  const [workLocationTable,setworkLocationTable]=React.useState([])
   const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(true)
  const {state}=useLocation(props.state)
  const[empId,setEmpId]=useState(state.empId)

function fetchDataOfWork(empId){
  EmployeeAccessLevelService.WorkingLocationFromProfile(empId).then((res)=>{
      
    if(res.status===200 && res.statusMessage==="success"){
    
    setIsLoading(false)
    setworkLocationTable(res.result)
    
    
    }
    else{
      setIsLoading(false)
   
    }

  }).catch((err)=>{
    setIsLoading(false)
  
  })

} 


  React.useEffect(()=>{ 
    fetchDataOfWork(empId)
  },[reportm])



//backbutton
const backbutton=useNavigate()


  return hasAuthority(ACCESS_LEVEL_WORKING_LOCATION_TABLE_TITLE)? (
    isLoading ? <Loading/>:
    <Box style={AccessLevelTableStyle.firstBox}>

      <Box style={AccessLevelTableStyle.SecondBox}>
       
                  <Typography  color={"secondary"}  style={AccessLevelTableStyle.typographystyle}> WORK LOCATION</Typography>
                <Box style={AccessLevelTableStyle.thirdbox}>
                  <Button variant='outlined' style={AccessLevelTableStyle.backbuttonstyle}
                  startIcon={<LocalAirportIcon/>} onClick={()=>{navigate(`../access-level-working-location-creation`,{state:{"empId":empId}})}} >
                            CREATE WORK
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
                  onRowClick={ManagerRowHandler} 
                  rows={workLocationTable}
                  columns={columns} 
                  getRowId={(workLocationTable) => workLocationTable.empWorkLocationId}     
                    initialState={{
                    ...workLocationTable.initialState,
                    pagination: { paginationModel: { pageSize: 8 } },
                  }}
                  pageSizeOptions={[8,15,25,50,75]}
                 />
                 </Box>
    </Box>
  ):<NoAuth></NoAuth>
}