import {  Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from 'react-router';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { BiometricServiceModule } from '../../Services/BiometricService/BiometricServiceModule';
import PreviewIcon from '@mui/icons-material/Preview';
import { DataGrid } from '@mui/x-data-grid';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import moment from 'moment';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';


export const BIOMETRIC_TABLE_DATA_AFTER_FIRST_1_PAGE_TITLE="BIOMETRIC_TABLE_DATA_AFTER_FIRST_1123"

const columns = [
  { 
    field: 'empId',
   headerName: 'Employee Id', 
   minWidth: 80,
    flex:2,
   headerClassName:'table-header'
 
  },
 
  { 
    field: 'biometricDate',
   headerName: 'Biometric Date', 
   minWidth: 120,
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
   minWidth: 90,
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
   minWidth: 90,
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
   minWidth: 90,
    flex:2,
   headerClassName:'table-header',
   valueFormatter: params => {
    return  params?.value +" Mins"
   }
   
   
  },
  
  { 
    field: 'modifiedOn',
   headerName: 'Modified On', 
   minWidth: 120,
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
   minWidth: 80,
    flex:2,
   headerClassName:'table-header',
   renderCell: (params) => {
     
    return helpFunction.MonthShowing(params.formattedValue)
   
   }
   
  },
  { 
    field: 'year',
   headerName: 'Year', 
   minWidth: 80,
    flex:2,
   headerClassName:'table-header'
   
  },
  { 
    field: 'isLate',
    headerName: 'Late', 
    minWidth: 80,
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
    minWidth: 80,
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
           <PreviewIcon  color='secondary' sx={{marginRight:"39px"}}/>
           </IconButton >

        </Box>
    );

    }
}

];


export default function BiometricTable(props) {
  const location = useLocation();
  const queryParams= new URLSearchParams(location.search);
  const param1Value=queryParams.get('empId');
  const param2Value=queryParams.get('empName');


  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(true)
  const [employee, setEmployee] = useState({
    "fromDate":"2023-01-01",
    "toDate":dayjs().format("YYYY-MM-DD"),
    "empId":param1Value
  });

  const [bioMetricTableViaEmpIdFromDateTodate,setbioMetricTableViaEmpIdFromDateTodate]=useState([])
///////////////////////////////////////////////fetching data empid ,fromdate toDate///////////////////////////
function fetchViaParticularEmpIdData(){
  setIsLoading(true)
  BiometricServiceModule.getAllBiometricDataViaEmpIdStartDateEndDate(employee.empId,employee.fromDate,employee.toDate).then((res)=>{
      if(res.status===200){
        setIsLoading(false)
        setbioMetricTableViaEmpIdFromDateTodate(res.result)
        if(res.result.length==0){
          toast.info("No Records Found for  "+employee.empId+" "+param2Value+ "  Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
              position: toast.POSITION.TOP_RIGHT
          })}
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
fetchViaParticularEmpIdData()
    
  },[])

  const handleSerchData=(e)=>{
    e.preventDefault()
 

  if(employee.fromDate.length>0 && employee.toDate.length>0 ){
    fetchViaParticularEmpIdData()
  }
  else{
    toast.error("Please enter start date, end Date ", {
      position: toast.POSITION.TOP_RIGHT
  })
   
  }
  

   }






//backbutton
const backbutton=useNavigate()
const handleRowClick=(params)=>{
  backbutton(`../Biometric-Table-After-Clicking-View`,{state:params.row.empId})
}

  return hasAuthority(BIOMETRIC_TABLE_DATA_AFTER_FIRST_1_PAGE_TITLE)? ( isLoading?<Loading/>:
    
    <Box style={SerchingComponetsstyle.firstBox}>
<Box style={SerchingComponetsstyle.SecondBox}>
             <Typography style={SerchingComponetsstyle.typographystyle}>BIOMETRIC DATA OF <span style={{color:"black"}}>{ param2Value}</span> </Typography>



                 </Box>

                 
      <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                
 {/*--------------InputFields:-----------FromDate---ToDate---EmpId-------------------------- */}



<form onSubmit={handleSerchData}> 
  <Box
   
   style={SerchingComponetsstyle.Thirdbox}
    >
      <Grid container style={SerchingComponetsstyle.gridContainerStyle}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >

<TextField InputLabelProps={{ shrink: true }} 
 style={SerchingComponetsstyle.textFieldStyle} type='date' 
 value={employee.fromDate}
  onChange={(e)=>{setEmployee({ ...employee,fromDate:e.target.value})}} 
  label="From Date"></TextField>
           
        </Grid >
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>

<TextField InputLabelProps={{ shrink: true }}  style={SerchingComponetsstyle.textFieldStyle} type='date' value={employee.toDate} 
onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} label="To Date"></TextField>
            
        </Grid >


       
         <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
            <Button value="click" variant='outlined' type='submit'
            style={SerchingComponetsstyle.searchbuttonstyle} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid> 
                 
      </Grid>
      
      
      </Box>
      

      </form>

      <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>









    <Box style={SerchingComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    onRowClick={handleRowClick}
    rows={bioMetricTableViaEmpIdFromDateTodate}
    columns={columns}
    getRowId={(bioMetricTableViaEmpIdFromDateTodate)=>bioMetricTableViaEmpIdFromDateTodate.biometricReportId}
    initialState={{
      sorting: {
        sortModel: [{ field: 'biometricDate', sort: 'desc' }],
      },
       ...bioMetricTableViaEmpIdFromDateTodate.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
   pageSizeOptions={[8,15,25,50,75]}
   slots={{
    toolbar: CustomToolBar,
  }}
    >
       
    </DataGrid>
   </Box>
   </Box>
  ):<NoAuth></NoAuth>
}

