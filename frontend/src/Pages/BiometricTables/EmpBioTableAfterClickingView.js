import * as React from 'react';
import { 
  Box,
  Grid, 
   Typography,
        } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import {  useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify'
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import dayjs from 'dayjs';
import { BiometricServiceModule } from '../../Services/BiometricService/BiometricServiceModule';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from '@mui/material';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';

export const  EMPLOYEE_LEVEL_THIRD_BIOMETRIC_TABLE_TITLE= "EMPLOYEE_LEVEL_THIRD_BIOMETRIC_TABLE"




const columns = [
    { 
        field: 'biometricId',
       headerName: 'Biometric Id', 
       width: 125,
        flex:2,
       headerClassName:'table-header'
     
      },
 
      { 
        field: 'Biometricdate',
       headerName: 'Biometric Date', 
       width: 125,
        flex:2,
        headerClassName:'table-header',
        valueGetter: getDate,
      },
      { 
        field: 'Biometric Time',
       headerName: 'Biometric Time', 
       width: 125,
        flex:2,
        headerClassName:'table-header',
        valueGetter: getTime,
      },
      { 
        field: 'bioDate',
       headerName: 'Biometric Date Time', 
       width: 125,
        flex:2,
        headerClassName:'table-header',
       
      },    
 
 

];

function getDate(params) {
  return moment(params.row?.bioDate).format("DD/MM/YYYY")
}
function getTime(params) {
  return moment(params.row?.bioDate).format("HH:mm:ss")
}




export default function EmpBioTableAfterClickingView(props) {


const {state}=useLocation(props.state)
const [remEmpId,setRemEmpId]=useState(state)
const[EmpId1,setEmpId1]=useState()
let empid=localStorage.getItem("id")

const[isLoading,setIsLoading]=useState(false)
const textfield1 = { width: 400 }
const [employee, setEmployee] = useState({
    "fromDate":"2023-01-01",
    "toDate":dayjs().format("YYYY-MM-DD"),
    "empId":empid
  });
  const [biometricTable1,setBiometricTable1]=React.useState([])

  function fetchDataAfterclickingView(){
    setIsLoading(true)
    BiometricServiceModule.getAllBiometricReportAfterClickingView(employee.empId,employee.fromDate,employee.toDate).then((res)=>{
        if(res.status===200){
          setIsLoading(false)
          setBiometricTable1(res.result)
          setEmpId1(employee.empId)
          if(res.result.length==0){
            toast.info("No Records Found for  "+employee.empId+ "  Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
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

////////////////////////////for rep[orting employee]-----------------------------------------------------
function fetchDataAfterclickingView1(){
  setIsLoading(true)
  BiometricServiceModule.getAllBiometricReportAfterClickingView(remEmpId,employee.fromDate,employee.toDate).then((res)=>{
      if(res.status===200){
        setIsLoading(false)
        setBiometricTable1(res.result)
        setEmpId1(employee.empId)
        if(res.result.length==0){
          toast.info("No Records Found for  "+remEmpId+ "  Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
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
    if(remEmpId !==null){
      fetchDataAfterclickingView1()
    }
    else{
      fetchDataAfterclickingView()
    }

  },[])


const handleSerchData=(e)=>{
 if(employee.fromDate.length>0 && employee.toDate.length>0 && remEmpId==null){
fetchDataAfterclickingView(employee.empId,employee.fromDate,employee.toDate)
 }
 else if(employee.fromDate.length>0 && employee.toDate.length>0 && remEmpId !==null){
  fetchDataAfterclickingView1()
   }

 else{
    toast.info("Please Enter a start date ,end date", {
        position: toast.POSITION.TOP_RIGHT
    })
 }
}

const backbutton=useNavigate()
//back
const history=useNavigate()
   const handleGoBack = () =>{
    history(-1);
  };

  return hasAuthority(EMPLOYEE_LEVEL_THIRD_BIOMETRIC_TABLE_TITLE)? (
isLoading?<Loading></Loading>:
    <Box style={SerchingComponetsstyle.firstBox}>
         
             <Box style={SerchingComponetsstyle.SecondBox}>
         <Typography style={SerchingComponetsstyle.typographystyle}>BIO-METRIC REPORT DETAILS</Typography>

         <Grid style={{justifyContent:"center"}}>
            <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle} 
               onClick={handleGoBack}
             startIcon={<ArrowBackIosNewIcon/>}>
           back
            </Button>
            </Grid>

             </Box>

             
   <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
{/*--------------InputFields:-----------FromDate---ToDate---EmpId-------------------------- */}



<form onSubmit={handleSerchData}> 
<Box style={SerchingComponetsstyle.Thirdbox}>
  <Grid container  style={SerchingComponetsstyle.gridContainerStyle}>
  <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >

<TextField InputLabelProps={{ shrink: true }} style={SerchingComponetsstyle.textFieldStyle} type='date' 
value={employee.fromDate}
onChange={(e)=>{setEmployee({ ...employee,fromDate:e.target.value})}} 
label="From Date"></TextField>
       
    </Grid >
    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}  style={SerchingComponetsstyle.griditemstyle}>

<TextField InputLabelProps={{ shrink: true }}  style={SerchingComponetsstyle.textFieldStyle} type='date' value={employee.toDate} 
onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} label="To Date"></TextField>
        
    </Grid >


   
     <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
        <Button value="click" variant='outlined' type='submit' style={SerchingComponetsstyle.searchbuttonstyle} endIcon={<SearchIcon/>}>
        search
            </Button>
            </Grid> 
             
  </Grid>
  
  
  </Box>
  

  </form>

  <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
    <Box style={SerchingComponetsstyle.firstBox}>
    <Box style={SerchingComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.biometricId}
    initialState={{
      sorting: {
        sortModel: [{ field: 'bioDate', sort: 'desc' }],
      },
       ...biometricTable1.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
   pageSizeOptions={[8,15,25,50,75]}

    >
       
    </DataGrid>
   </Box>
   </Box>
   </Box>
  ):<NoAuth></NoAuth>
}

