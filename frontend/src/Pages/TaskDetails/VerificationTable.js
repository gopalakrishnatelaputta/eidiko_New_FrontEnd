import { Box, Button, Paper } from '@mui/material';
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import {Modal} from '@mui/material';
import TaskDetailsElaborately from '../../Components/TaskComponent/TaskDetailsElaborately';
import PreviewIcon from '@mui/icons-material/Preview';
import {IconButton} from '@mui/material';
import { useNavigate } from 'react-router';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';

  

  
export const VerificationTable = (props) => {
  const navigate=useNavigate
  const [reportm,setReportm]=useState(false)
    const handleRmOpen=()=>{
      setReportm(true)
    }
 
let data=props.allTask
const [VerificationTable,setVerificationTable]=useState([])
const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

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
setRowSelectionModel([])

}

  useEffect(()=>{setVerificationTable(data)},[data])

  

const [data1,setData1]=useState()

  
  const handleRowClick = (params) => {
       setData1(params.row)
    };

    const columns = [ 
    
      { 
        field: 'empId',
       headerName: 'Employee Id', 
       minWidth: 90,
        flex:1.5,
       headerClassName:'table-header'
     
      },
     
      { 
        field: 'status',
       headerName: 'Status', 
       minWidth: 110,
        flex:2.5,
       headerClassName:'table-header'
       ,renderCell: (params) => {
        if (params.row.status==="Yes"){
          return "Completed"
        }
        return "Not Completed"
    
       }
    
    
      },
      { 
        field: 'reason',
       headerName: 'Reason', 
       minWidth: 120,
        flex:1.5,
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
         minWidth: 100,
          flex:2,
         headerClassName:'table-header'
         
        },
        { 
          field: 'assignedByName',
         headerName: 'AssignedBy', 
         minWidth: 240,
          flex:3,
         headerClassName:'table-header'
         
        },
      
      {
        field: 'View',
        headerName: 'View',
        minWidth: 80,
        flex:2,
        headerClassName: 'table-header',
        renderCell: (params) => {
          
          
          return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <IconButton variant="contained" color='error'>
               <PreviewIcon onClick={handleRmOpen} color='secondary' sx={{marginRight:"39px"}}/>
                <Modal
                sx={{overflow:"scroll"}}
                    open={reportm}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">
                  <center><Paper elevation={0} sx={{width:'350px',minWidth:"100px",justifyContent:"center"}}>
                    <TaskDetailsElaborately row1={rowSelectionModel} state={data1} onClose1={()=>{setReportm(false)}} />
                  </Paper></center>
                </Modal>
               </IconButton >
    
            </Box>
        );
    
    
    
    
        }
    }
    ];






    return (
        <Box style={SerchingComponetsstyle.firstBox}>
        <Box style={SerchingComponetsstyle.DatagridBoxStyle}>
        <DataGrid

 checkboxSelection
 onRowSelectionModelChange={(newRowSelectionModel) => {
  setRowSelectionModel(newRowSelectionModel);
}}
rowSelectionModel={rowSelectionModel}
        onRowClick={handleRowClick}
        rows={VerificationTable}
        columns={columns}
        getRowId={(VerificationTable)=>VerificationTable.taskDetailsId}
        initialState={{
           ...VerificationTable.initialState,
         pagination: { paginationModel: { pageSize: 8} },
       }}
       pageSizeOptions={[8,15,25,50,75]}
     
        >
           
        </DataGrid>
        <Box sx={{display:"flex",justifyContent:"center",mt:2}}>
        {rowSelectionModel.length>0?<Button variant='contained' sx={{width:"150px",borderRadius:"20px"}} type='submit' onClick={verificationHandle}>verify</Button>:null}
        </Box>


       </Box>







       </Box>
    )
}




/////////////////searched table/////////////////////////
