import { Box, FormControlLabel, FormGroup } from '@mui/material';
import React, { useCallback, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { DataGrid } from '@mui/x-data-grid';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import { useEffect } from 'react';
import Loading from '../../Components/LoadingComponent/Loading';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

const columns = [
    
  { 
    field: 'taskDetailsId',
   headerName: 'Task Details Id', 
   width: 125,
    flex:2,
   headerClassName:'table-header'
 
  },
  { 
    field: 'empId',
   headerName: 'Employee Id', 
   width: 125,
    flex:2,
   headerClassName:'table-header'
 
  },
  { 
    field: 'taskDetail',
   headerName: 'Task Details',
   width: 210,
    flex:2,
   headerClassName:'table-header'
   
  },
  { 
    field: 'desc',
   headerName: 'Description',
   width: 210,
    flex:2,
   headerClassName:'table-header'
   
  },
  { 
    field: 'status',
   headerName: 'Status', 
   width: 125,
    flex:2,
   headerClassName:'table-header'

  },
  { 
    field: 'reason',
   headerName: 'Reason', 
   width: 210,
    flex:2,
   headerClassName:'table-header'

  },
  { 
      field: 'assignedDate',
     headerName: 'Assigned Date', 
     width: 125,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
    //  renderCell: (params) => (
    //   params.value? params.value.slice(0,13):"")   
    },
  { 
      field: 'statusReportDate',
     headerName: 'Status Reporting Date', 
     width: 125,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),   
    },
 
    { 
      field: 'team',
     headerName: 'Team', 
     width: 125,
      flex:2,
     headerClassName:'table-header'
     
    },
    { 
      field: 'assignedBy',
     headerName: 'AssignedBy', 
     width: 140,
      flex:2,
     headerClassName:'table-header'
     
    },
  
  {
    field: 'verifiedBy',
    headerName: 'Verified',
    width: 140,
    flex:2,
    headerClassName: 'table-header',
    renderCell: (params) => {
        return (
         
          <FormGroup>
          <FormControlLabel required control={<TaskAltIcon />} />
        </FormGroup>
        );
    }
}
];
 




export const StatusTable = (props) => {
    const textfield1 = { width: 400 }
    let data=props.allTask
  const [pendingReport,setPendingReport]=useState([])
  useEffect(()=>{setPendingReport(data)},[data])


    return (
        <Box sx={{
            height: 200,
            width: '75vw',
            padding: '10px 0px',
        }}>
        <Box style={{height:"54.5vh",width:"95%",marginLeft:"33px",marginTop:"10px"}}>
        <DataGrid
        rows={pendingReport}
        columns={columns}
        getRowId={(pendingReport)=>pendingReport.taskDetailsId}
        initialState={{
           ...pendingReport.initialState,
         pagination: { paginationModel: { pageSize: 8} },
       }}
       pageSizeOptions={[8,15,25,50,75]}

        >
           
        </DataGrid>
       </Box>
       </Box>
    )
}







//serching table
