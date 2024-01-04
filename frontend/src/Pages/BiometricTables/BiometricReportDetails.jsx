import React, { useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import {IconButton} from '@mui/material';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';
import PreviewIcon from '@mui/icons-material/Preview';
import { BiometricServiceModule } from '../../Services/BiometricService/BiometricServiceModule';
import { toast } from 'react-toastify';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';


const columns = [
   
  
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



export const BIOMETRIC_REPORT_DETAILED_VIEW_PAGE_TITLE="BIOMETRIC_REPORT_DETAILED_VIEW212"




export const BiometricReportDetails = (props) => {


const {state}=useLocation(props.state)
const[bioDetails,setBioDetails]=useState(state.bulkdata)
 const [remEmpId,setremEmpId]=useState(state.remEmpId)
 const handleRowClick=(params)=>{
  backbutton(`../Emp-Bio-Table-Ater-Clicking-View`,{state:remEmpId})
}
  let emp_id=localStorage.getItem("id")

  const [employee, setEmployee] = useState({
    "fromDate":"2023-01-01",
    "toDate":dayjs().format("YYYY-MM-DD"),
    "empId": emp_id
  });
  const textfield1 = { width: 400 }
  
  const history=useNavigate()
  const handleGoBack = () =>{
   history(-1);
  };
    //------------------------------fetching data with start date end date and emp id -------------------
    async  function fetchViaParticularEmpIdData(){
      // setIsLoading(true)
          await BiometricServiceModule.getAllBiometricDataViaEmpIdStartDateEndDate(employee.empId,employee.fromDate,employee.toDate).then((res)=>{
             if(res.status===200){
              // setIsLoading(false)

              if(res.result.length==0){
                toast.info("No Records Found for  "+employee.empId+ "  Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
                    position: toast.POSITION.TOP_RIGHT
                })
            }


               setBioDetails(res.result)
             }
             else{
              // setIsLoading(false)
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            }
        
          }).catch((err)=>{
        
          // setIsLoading(false)
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT
        })
          })
         }


        //  from reporting employee profile------------------------------------
         async  function fetchViaParticularEmpIdData1(){
          // setIsLoading(true)
              await BiometricServiceModule.getAllBiometricDataViaEmpIdStartDateEndDate(remEmpId,employee.fromDate,employee.toDate).then((res)=>{
               
                 if(res.status===200){
                  // setIsLoading(false)
                  if(res.result.length==0){
                    toast.info("No Records Found for  "+remEmpId+"  Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
                   setBioDetails(res.result)
                 }
                 else{
                  // setIsLoading(false)
                  toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                }
            
              }).catch((err)=>{
            
              // setIsLoading(false)
              toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT
            })
              })
             }


  //backbutton
  const backbutton=useNavigate()
  
  const handleSerchData=(e)=>{
    e.preventDefault()
  
  
  if(employee.fromDate.length>0 && employee.toDate.length>0  && remEmpId==null){
    fetchViaParticularEmpIdData()
  }
  else if(employee.fromDate.length>0 && employee.toDate.length>0  && remEmpId !==null){
    fetchViaParticularEmpIdData1()
  }
  
  else{
    toast.error("Please enter start date, end Date ", {
      position: toast.POSITION.TOP_RIGHT
  })
  }
   }

    //----------
  


    return hasAuthority(BIOMETRIC_REPORT_DETAILED_VIEW_PAGE_TITLE)? (
        
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



<form onSubmit={handleSerchData}> 
  <Box
   
  style={SerchingComponetsstyle.Thirdbox}
    >
      <Grid container  style={SerchingComponetsstyle.gridContainerStyle}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>

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
{/*-----------------------Tabel:---------------------------- */} 
<Box style={SerchingComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    onRowClick={handleRowClick}
    rows={bioDetails}
    columns={columns}
    getRowId={(bioDetails)=>bioDetails.biometricReportId}
    initialState={{
      sorting: {
        sortModel: [{ field: 'biometricDate', sort: 'desc' }],
      },
       ...bioDetails.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
 
    >
       
    </DataGrid>
   </Box>

            
        </Box>
    ):
    <NoAuth></NoAuth>
}
