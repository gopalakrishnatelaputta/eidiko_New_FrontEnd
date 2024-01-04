import * as React from 'react';
import { 
  Box,
  Grid, 
   Typography,
        } from "@mui/material";

import { DataGrid } from '@mui/x-data-grid';
import { Button ,TextField} from '@mui/material';
import { Navigate, useNavigate } from 'react-router';
import {IconButton} from '@mui/material';
import { toast } from 'react-toastify'
import Loading from "../../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PreviewIcon from '@mui/icons-material/Preview';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import SearchIcon from '@mui/icons-material/Search';
import {MenuItem} from '@mui/material';
import {InputLabel} from '@mui/material';
import {FormControl} from '@mui/material';
import {Select} from '@mui/material';
import { BiometricServiceModule } from '../../../Services/BiometricService/BiometricServiceModule';
import dayjs from 'dayjs';
import { SerchingComponetsstyle } from '../../../Components/stylecomponent/SerchingComponetsStyle';
import { CustomToolBar } from '../../../Components/DataGridDataDownload/CustomToolBar';

const columns = [
  { 
    field: 'emp_id',
   headerName: 'Employee Id', 
   minWidth: 80,
    flex:1.5,
   headerClassName:'table-header'
 
  },
  { 
    field: 'emp_name',
   headerName: 'Employee Name', 
   minWidth: 210,
    flex:2,
   headerClassName:'table-header'
 
  },
  { 
    field: 'total_missing_reports',
   headerName: 'Missing Reports', 
   minWidth: 150,
    flex:1.5,
   headerClassName:'table-header'
 
  },
  {
    field: 'View',
    headerName: 'View',
    minWidth: 90,
    flex:1.5,
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

export const ALL_EMPLOYEE_MISSING_REPORT_PAGE_TITLE=" ALL_EMPLOYEE_MISSING_REPORT" 

export default function AccessLevelMissingReportSearch(props) {

  const textfield1 = { width: 400 }
  const[monthYear,setmonthYear]=useState({"month":dayjs().format("MM"),"year":dayjs().format("YYYY")})
    const getime11=(e)=>{setmonthYear({...monthYear, [e.target.name]: e.target.value})}
  const [biometricTable1,setBiometricTable1]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(false)


  function fetchleavesData(year){
    setIsLoading(true)
    //setmonthYear({...monthYear,month:dayjs().format("MM")})
    BiometricServiceModule.getBiometricMissingReportYearly(year).then((res)=>{
        if(res.status===200){
          setIsLoading(false)
          if(res.result.length==0){
            toast.info("No Records Found  for  given year  "+monthYear.year,{
                position: toast.POSITION.TOP_RIGHT
            })}
        setBiometricTable1(res.result)
        }
        else{
          setIsLoading(false)
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT
        })
        }
    
      }).catch((err)=>{
    
      setIsLoading(false)
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT
    })
      })

  }
  function fetchMissingDataViamonthAYear(year,month){

    //setmonthYear({...monthYear,month:dayjs().format("MM")})
    setIsLoading(true)
    BiometricServiceModule.getBiometricMissingReportMonthly(year,month).then((res)=>{
        if(res.status===200){
          setIsLoading(false)
        setBiometricTable1(res.result)
        if(res.result.length==0){
          toast.info("No Records Found  Between the given month "+monthYear.month+" and year  "+monthYear.year,{
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
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT
    })
      })

  }

const [load,setload]=useState(false)
  React.useEffect(()=>{
    fetchMissingDataViamonthAYear(monthYear.year,monthYear.month)
    setload(false)
  },[load])


const handleSerchData=()=>{
  
if(monthYear.month !=="ALL"){
  fetchMissingDataViamonthAYear(monthYear.year,monthYear.month)
}
else if(monthYear.month=="ALL"){
  fetchleavesData(monthYear.year)
}
else{
  toast.error("Please enter month and year ", {
    position: toast.POSITION.TOP_RIGHT
})
}


}



const handleRowClick=(params)=>{
  navigate(`../employee-biometric-detailed-missing-reports`,{state:params.row.emp_id})
}

  return hasAuthority(ALL_EMPLOYEE_MISSING_REPORT_PAGE_TITLE)? ( isLoading?<Loading></Loading>:
    
    <Box style={SerchingComponetsstyle.firstBox}>

<Box style={SerchingComponetsstyle.SecondBox}>
         <Typography style={SerchingComponetsstyle.typographystyle}> MSSING BIOMETRIC REPORT</Typography>

         <Grid style={{justifyContent:"center"}}>
         <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle} 
                    onClick={()=>{setload(true);setmonthYear({...monthYear,month:dayjs().format("MM"),year:dayjs().format("YYYY")})}}
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
      <Grid container style={SerchingComponetsstyle.gridContainerStyle}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >

<FormControl style={SerchingComponetsstyle.FormControlstyle}>
<InputLabel id="demo-multiple-name-label">Month</InputLabel>
        <Select 
      value={monthYear.month}
         onChange={getime11}
          labelId="demo-multiple-name-label"
          id="demo-multiple-start"
          name="month"
          label="Month"
        >
           <MenuItem value="ALL" >ALL</MenuItem>
          <MenuItem value="01" >Jan</MenuItem>
          <MenuItem value="02" >Feb</MenuItem>
          <MenuItem value="03" >Mar</MenuItem>
          <MenuItem value="04" >April</MenuItem>
          <MenuItem value="05" >May</MenuItem>
          <MenuItem value="06" >June</MenuItem>
          <MenuItem value="07" >July</MenuItem>
          <MenuItem value="08" >Aug</MenuItem>
          <MenuItem value="09" >Sept</MenuItem>
          <MenuItem value="10" >Oct</MenuItem>
          <MenuItem value="11" >Nov</MenuItem>
          <MenuItem value="12" >Dec</MenuItem>
                                      
        </Select>
      </FormControl>
 
        </Grid >
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
 <TextField style={SerchingComponetsstyle.textFieldStyle} required name="year"  value={monthYear.year} onChange={getime11} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
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
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.emp_id}
    initialState={{
      sorting: {
        sortModel: [{ field: 'total_missing_reports', sort: 'desc' }],
      },
       ...biometricTable1.initialState,
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
  ):<NoAuth></NoAuth>
}

