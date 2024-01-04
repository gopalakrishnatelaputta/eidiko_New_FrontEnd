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
import { Navigate, useNavigate } from 'react-router';
import {Divider} from '@mui/material';
import {Container} from '@mui/material';
import Person4Icon from '@mui/icons-material/Person4';
import {IconButton} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getReportingManagerTable } from '../../../Services/employee-service/EmployeeService';
import { toast } from 'react-toastify'
import Loading from "../../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { WorkReportingManager } from '../WorkInfoModals/WorkReportingManager';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { UserInformationTableStyle } from './UserInformationTableStyle';




export const  EMPLOYEE_REPORTING_MANAGER_TABLE_TITLE= "REPORTING_MANAGER_TABLE_1"

export default function ReportingMangr() {
   //modal for reporting manager updation
   const [profileData, setProfileData] = useState({});
   
const [reportingManagers, setReportingManagers] = useState({})
 
const [openModal, setOpenModal] = React.useState(false);
const handleModalOpen = () => setOpenModal(true);
const handleModalClose = () => setOpenModal(false);

const [openModal2, setOpenModal2] = React.useState(false);

const handleModal2Close = () => {
    setOpenModal2(false);
};

   const [reportm,setReportm]= React.useState(false);
   const handleRmOpen =() => setReportm(true);
   const handleRmClose = () => setReportm(false);
   const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
     const textfield1={width: 400}

const[tableData,setTableData]=useState([])
const[manager1,setmanager1]=useState([])
const handleRow=(params)=>{
  setTableData(params.row)
  setmanager1(params.row)
}
//--------------------------------------
const columns = [
  { 
    field: 'mngrIdWithname',
   headerName: 'Manager Name',
   minWidth: 230,
    flex:3.5,
   headerClassName:'table-header'
   
  },

  { 
  field: 'startDate',
   headerName: 'Start Date', 
   minWidth: 120,
    flex:2,
   headerClassName:'table-header',
   valueFormatter: params => 
   moment(params?.value).format("DD/MM/YYYY"),
  //  renderCell: (params) => (
  //   params.value ? params.value.slice(0,10):"")

   
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
   minWidth: 200,
    flex:3,
   headerClassName:'table-header'
   
  },
  {
    field: 'edit',
    headerName: 'Edit',
    minWidth: 90,
    flex:1,
    marginLeft:5,
    headerClassName: 'table-header',
    renderCell: (params) => {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
              
                <IconButton variant="contained" color='secondary'
                >
            
                    <EditOutlinedIcon onClick={handleRmOpen} sx={{marginRight:"39px"}}/>
                  <Modal
                  sx={{overflow:"scroll"}}
                      open={reportm}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description">
                    <WorkReportingManager manager1={manager1} onClose1={()=>{setReportm(false)}} 
                    empId={profileData?.empId} manager={reportingManagers?.empId}
                      startdate={reportingManagers?.startDate? 
                      reportingManagers?.startDate:null} 
                      enddate={reportingManagers?.endDate ? reportingManagers?.endDate:null}/>
                  </Modal>
              
                </IconButton >

            </Box>
        );
    }
}
];



  //------------------------------------

  const [reportingManagerTable,setReportingManagerTable]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(true)
  React.useEffect(()=>{

    getReportingManagerTable().then((res)=>{

      if(res.status===200 && res.statusMessage==="success"){
        setIsLoading(false)
      setReportingManagerTable(res.result)
      
      
      }
      else{
        setIsLoading(false)
      //   toast.error(res.message, {
      //     position: toast.POSITION.TOP_RIGHT
      // })
      }
  
    }).catch((err)=>{
  
    setIsLoading(false)
    })
    
  },[reportm])




//backbutton
const backbutton=useNavigate()

  return hasAuthority( EMPLOYEE_REPORTING_MANAGER_TABLE_TITLE)? (
    isLoading ?<Loading/>:
    <Box  style={UserInformationTableStyle.firstBox}>
      <Box  style={UserInformationTableStyle.SecondBox}>
       
              
                <Typography  style={UserInformationTableStyle.typographystyle}>REPORTING MANAGER</Typography>
                  <Grid style={{justifyContent:"center"}}>
                  <Button variant='outlined'  style={UserInformationTableStyle.backbuttonstyle} 
                startIcon={<Person4Icon></Person4Icon>} 
                onClick={()=>{navigate(`/user/reporting-manager`,{state:tableData})}} >
                            CREATE REPORTING MANAGER
                </Button>
                </Grid>
                 </Box>
                
               
          <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>


                  
                  <Box  style={UserInformationTableStyle.DatagridBoxStyle}>

                  
                 <DataGrid 
                  rows={reportingManagerTable}
                  columns={columns} 
                
                  getRowId={(reportingManagerTable) => reportingManagerTable.id}    
                    initialState={{
                      ...reportingManagerTable.initialState,
                    pagination: { paginationModel: { pageSize: 8} },
                    
                  }}
                  onRowClick={handleRow}
                  pageSizeOptions={[8,15,25,50,75]}
                 />
                </Box>

    </Box>
  ):<NoAuth></NoAuth>
}