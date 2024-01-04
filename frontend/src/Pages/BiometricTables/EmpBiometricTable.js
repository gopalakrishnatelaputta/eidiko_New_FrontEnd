import * as React from 'react';
// import './em.css'
import { Box,Typography,} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate } from 'react-router';
import {IconButton} from '@mui/material';
import { useState } from 'react';
import moment from 'moment';
import { helpFunction } from '../HelperComponent/helpFunction';
import PreviewIcon from '@mui/icons-material/Preview';
import Loading from '../../Components/LoadingComponent/Loading';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';






const columns = [
   
   
    { 
      field: 'biometricDate',
     headerName: 'Biometric Date', 
     width: 200,
      flex:2,
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
      field: 'checkInTime',
     headerName: 'CheckIn Time', 
     width: 295,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     {
      let checkInTime=""
      if(params?.value!==null){
       checkInTime=params?.value.slice(11,16)
      return checkInTime
      }
   else{
     return null
   }
     }
  
     
    },
    { 
      field: 'checkOutTime',
     headerName: 'Checkout Time', 
     width: 295,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     {
      let checkOutTime=""
      if(params?.value!==null){
       checkOutTime=params?.value.slice(11,16)
      return checkOutTime
      }
   else{
     return null
   }
  } 
    },
  
    { 
    field: 'totalWorkingTime',
     headerName: 'Total Working Time(In Mins)', 
     width: 300,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => {
      return  params?.value +" Mins"
     }
    
     
    },
    
    { 
      field: 'modifiedOn',
     headerName: 'Modified On', 
     width: 125,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     {
      let modifiedOn=""
      if(params?.value!==null){
       modifiedOn=moment(params?.value).format("DD/MM/YYYY")
      return modifiedOn
      }
   else{
     return null
   }
     }
    },
    { 
      field: 'month',
     headerName: 'Month', 
     width: 125,
      flex:2,
     headerClassName:'table-header',
     renderCell: (params) => {
       
      return helpFunction.MonthShowing(params.formattedValue)
     
     }
     
    },
    { 
      field: 'year',
     headerName: 'Year', 
     width: 125,
      flex:2,
     headerClassName:'table-header'
     
    },
    { 
      field: 'isLate',
      headerName: 'Late', 
      width: 125,
      flex:2,
      headerClassName:'table-header',
      renderCell: (params)=>{
   
       if(params.formattedValue){
         return (
           <Box sx={{backgroundColor:"yellow",width:"40px",justifyContent:"center",display:"flex",height:"20px",alignContent:"center",alignItems:"center",borderRadius:"10px"}}>
    <Typography  sx={{color:"blue"}}> Yes</Typography>
           </Box>
         
       )
         
       }
       return (
         <Box sx={{backgroundColor:"green",width:"40px",justifyContent:"center",display:"flex",height:"20px",alignContent:"center",alignItems:"center",borderRadius:"10px"}}>
          <Typography sx={{color:"#FFFFFF"}} >No</Typography>
        </Box>
       )
   
      }
   
   
     },
    { 
       field: 'veryLate',
      headerName: 'Verylate',
      width: 125,
       flex:2,
      headerClassName:'table-header',
      renderCell: (params)=>{
   
       if(params.formattedValue){
         return (
           <Box sx={{backgroundColor:"#d50000",width:"40px",justifyContent:"center",display:"flex",height:"20px",alignContent:"center",alignItems:"center",borderRadius:"10px"}}>
           <Typography sx={{color:"yellow"}} >Yes</Typography>
           </Box>
       )
         
       }
       return (
         <Box sx={{backgroundColor:"green",width:"40px",justifyContent:"center",display:"flex",height:"20px",alignContent:"center",alignItems:"center",borderRadius:"10px"}}>
         <Typography sx={{color:"#FFFFFF"}} > No</Typography>
         </Box>
       )
   
      }
      
     },
     {
      field: 'View',
      headerName: 'View',
      width: 140,
      flex:2,
      headerClassName: 'table-header',
      renderCell: (params) => {
        
        
        return (
          <Box sx={{
              display: 'flex',
              justifyContent: 'center'
          }}>
              <IconButton variant="contained" color='error'>
             <PreviewIcon  color='secondary' sx={{marginRight:"39px"}}/>
             </IconButton >
  
          </Box>
      );
  
      }
  }
  
  ];


export default function EmpBiometricTable(props) {

  const [biometricTable1,setBiometricTable1]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(true)
let Data=props.allDetails

  React.useEffect(()=>{

   setBiometricTable1(Data)
    setIsLoading(false)
  },[Data])




//backbutton
const backbutton=useNavigate()

//row click
const handleRowClick=(params)=>{
  backbutton(`../Emp-Bio-Table-Ater-Clicking-View`,{state:params.row.empId})
}


  return  (
    isLoading?<Loading></Loading>:
    <Box sx={{
        height: 200,
        width: 'auto',
    }}>
    <Box style={{height:"64vh",width:"98.7%",marginLeft:"8px",marginTop:"10px"}}>
    <DataGrid
     onRowClick={handleRowClick}
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.biometricReportId}
    initialState={{
       ...biometricTable1.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
   pageSizeOptions={[8,15,25,50,75]}

    >
       
    </DataGrid>
   </Box>
   </Box>
  )
}

