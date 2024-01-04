import * as React from 'react';
import { Box,Grid, Modal, Paper} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {Divider} from '@mui/material';
import {Typography} from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { getShiftTimingsTable } from '../../../Services/employee-service/EmployeeService';
import { toast } from 'react-toastify'
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Loading from "../../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment/moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import WorkShiftTiming from '../WorkInfoModals/WorkShiftTiming';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { CustomToolBar } from '../../../Components/DataGridDataDownload/CustomToolBar';
import { UserInformationTableStyle } from './UserInformationTableStyle';


 export const  EMPLOYEE_SHIFT_TIMING_TABLE_TITLE= "SHIFT_TIMING_TABLE_21"

export default function EmpShiftTime() {
//empid getting

const [reportm,setReportm]= React.useState(false);
let empId1=localStorage.getItem("id")
const[tableData,setTableData]=useState([])
const[manager1,setmanager1]=useState([])
const handleRow=(params)=>{
  setTableData(params.row)
  setmanager1(params.row)
}

 const [shiftTimingsTable,setShiftTimingTable]=React.useState([])
 const[isLoading,setIsLoading]=useState(true)
const navigate=useNavigate()

React.useEffect(()=>{

  getShiftTimingsTable().then((res)=>{
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
  
},[reportm])
  
   const [profileData, setProfileData] = useState({});
   

const [openModal, setOpenModal] = React.useState(false);
const handleModalOpen = () => setOpenModal(true);
const handleModalClose = () => setOpenModal(false);

const [openModal2, setOpenModal2] = React.useState(false);

const handleModal2Close = () => {
    setOpenModal2(false);
};

  
   const handleRmOpen =() => setReportm(true);
   const handleRmClose = () => setReportm(false);
   const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
     const textfield1={width: 400}
//------
 //backbutton
 const backbutton=useNavigate()

//--------------------------------------

const columns = [

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
   flex:2,
   headerClassName:'table-header',
   renderCell: (params) => {
     
    let data=helpFunction.WeakOffShowing(params.formattedValue)
   return data
   }
   
  },
  {
    field: 'modifiedByWithName',
   headerName: 'Modified By', 
   minWidth: 200,
   flex:2,
   headerClassName:'table-header'

  },
  {
    field: 'edit',
    headerName: 'Edit',
    minWidth: 90,
    flex:2,
    headerClassName: 'table-header',
    renderCell: (params) => {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <IconButton variant="contained" color='error'
                    // onClick={(e) => onButtonClick(e, params.row, 'delete')}
                >
               <EditOutlinedIcon onClick={handleRmOpen} color='secondary' sx={{marginRight:"39px"}}/>
                <Modal
                    sx={{overflow:"scroll"}}
                    open={reportm}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">
                  <WorkShiftTiming empId={empId1} manager={manager1}  onClose1={()=>{setReportm(false)}} 
                  />
                </Modal>
               </IconButton >

            </Box>
            
        );
    }
}
];


//--------------------------------------

   return hasAuthority(EMPLOYEE_SHIFT_TIMING_TABLE_TITLE) ? (
 
    isLoading ?<Loading/>:
    <Box style={UserInformationTableStyle.firstBox}>
      <Box style={UserInformationTableStyle.SecondBox}>
        
                  <Typography style={UserInformationTableStyle.typographystyle} >SHIFT TIMING</Typography>
                  <Grid style={{justifyContent:"center"}}>
                  <Button  variant='outlined' style={UserInformationTableStyle.backbuttonstyle}  startIcon={<HistoryToggleOffIcon/>} 
                onClick={()=>{navigate("/user/shift-timings")}} >
                            CREATE SHIFT
                </Button>
              
                </Grid>
                 </Box>
                 
          <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
             
               
               
                <Box style={UserInformationTableStyle.DatagridBoxStyle}>
                 <DataGrid
                  rows={shiftTimingsTable}
                  columns={columns}
                  getRowId={(shiftTimingsTable) => shiftTimingsTable.shiftTimingId}      
                    initialState={{
                    ...shiftTimingsTable.initialState,
                    pagination: { paginationModel: { pageSize: 8 } },
                  }}
                  onRowClick={handleRow}
                  pageSizeOptions={[8,15,25,50,75]}
                 />
                 </Box>
      
    </Box>
  ):<NoAuth></NoAuth>
}
