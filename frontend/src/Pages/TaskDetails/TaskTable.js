import { Box, FormControlLabel, FormGroup } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { DataGrid } from '@mui/x-data-grid';
import {  useNavigate } from 'react-router';
import moment from 'moment';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar';
const verfiedIcon=(data)=>{
  return data==null? <TaskAltIcon  style={{backgroundColor:"red",color:"white",borderRadius:"50%"}}/> : 
  <TaskAltIcon  style={{backgroundColor:"green",color:"white",borderRadius:"50%"}}/>
    }

  const columns = [
 
    { 
      field: 'empId',
     headerName: 'Employee Id', 
     minWidth: 80,
      flex:2,
     headerClassName:'table-header'
   
    },
    { 
      field: 'taskDetail',
     headerName: 'Task Details',
     minWidth: 120,
      flex:2,
     headerClassName:'table-header'
     
    },
   
    { 
      field: 'status',
     headerName: 'Status', 
     minWidth: 90,
      flex:2,
     headerClassName:'table-header',
     renderCell: (params) => {
      if (params.row.status==="Yes"){
        return "Completed"
      }
      return "Not Completed"
  
     }
  
    },
    { 
      field: 'reason',
     headerName: 'Reason', 
     minWidth: 100,
      flex:2,
     headerClassName:'table-header'
  
    },
    { 
        field: 'assignedDate',
       headerName: 'Assigned Date', 
       minWidth: 120,
        flex:2,
       headerClassName:'table-header',
       valueFormatter: params => 
       moment(params?.value).format("DD/MM/YYYY"),   
      },
    { 
        field: 'statusReportDate',
       headerName: 'Status Reporting Date', 
       minWidth: 120,
        flex:2,
       headerClassName:'table-header',
       valueFormatter: params => 
       moment(params?.value).format("DD/MM/YYYY"),   
      },
   
      { 
        field: 'team',
       headerName: 'Team', 
       minWidth: 95,
        flex:2,
       headerClassName:'table-header'
       
      },
      { 
        field: 'assignedByName',
       headerName: 'AssignedBy', 
       minWidth: 230,
        flex:3,
       headerClassName:'table-header'
       
      },
    
    {
      field: 'verifiedBy',
      headerName: 'Verified',
      minWidth: 80,
      flex:1.5,
      align:'center',
      headerClassName: 'table-header',
      renderCell: (params) => {
          return (
            <FormGroup>
            <FormControlLabel required control={verfiedIcon(params.value)}  />
           </FormGroup>
           );
         
      }
  }
  ];


 
  



export const TaskTable = (props) => {
  

  const navigate=useNavigate()
 let data=props.allTask
const [taskTable,setTaskTable]=useState([])


useEffect(()=>{setTaskTable(data)},[data])



const handleRowClick = (params) => {
  // const employeeDetailsUrl=`../user/task-details?row=${params.row}`;
  //  window.open(employeeDetailsUrl,'_blank');
navigate(`../task-details`,{state:params.row})

};


    return (
        <Box style={SerchingComponetsstyle.firstBox}>
        <Box style={SerchingComponetsstyle.DatagridBoxStyle}>
        <DataGrid
        rows={taskTable}
        columns={columns}
        getRowId={(taskTable)=>taskTable.taskDetailsId}
        initialState={{
           ...taskTable.initialState,
         pagination: { paginationModel: { pageSize: 8} },
       }}
       pageSizeOptions={[8,15,25,50,75]}
       onRowClick={handleRowClick}

       slots={{
        toolbar: CustomToolBar,
      }}
        >
           
        </DataGrid>
       </Box>
       </Box>
    )
}


