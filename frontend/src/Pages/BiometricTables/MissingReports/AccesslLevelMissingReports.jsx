import * as React from 'react';
import { 
  Box,
  Grid, 
   Typography,
        } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Button ,TextField} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify'
import Loading from "../../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import SearchIcon from '@mui/icons-material/Search';
import { BiometricServiceModule } from '../../../Services/BiometricService/BiometricServiceModule';
import dayjs from 'dayjs';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import { SerchingComponetsstyle } from '../../../Components/stylecomponent/SerchingComponetsStyle';

const columns = [
    { 
        field: 'empId',
       headerName: 'Employee Id', 
       minWidth: 125,
        flex:1.5,
       headerClassName:'table-header'
     
      },  
      { 
        field: 'empName',
       headerName: 'Employee Name', 
       minWidth: 200,
        flex:2.5,
        headerClassName:'table-header',
      },
 
  { 
    field: 'missingDate',
   headerName: 'Missing Date', 
   minWidth: 100,
    flex:1.5,
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
    field: 'missingMonth',
   headerName: 'Missing Month', 
   minWidth: 100,
    flex:1.5,
    headerClassName:'table-header',
    renderCell: (params) => {
      return helpFunction.MonthShowing1(params.formattedValue)
     
     }
   
  },  
  { 
    field: 'missingYear',
   headerName: 'Missing Year', 
   minWidth: 100,
    flex:1.5,
    headerClassName:'table-header',
   
  },  
];


export const ALL_EMPLOYEE_MISSING_REPORT_AFTER_CLICK_PAGE_TITLE=" PARTICULAR_EMPLOYEE_MISSING_REPORT_VIEW" 

export default function AccessLevelMissingReports(props) {

    const {state}=useLocation(props.state)

    const[empId1,setempid1]=useState(state)
    const[empId2,setempid2]=useState(localStorage.getItem("id"))

  const textfield1 = { width: 400 }
  const[monthYear,setmonthYear]=useState({"month":dayjs().format("MM"),"year":dayjs().format("YYYY")})
    const getime11=(e)=>{setmonthYear({...monthYear, [e.target.name]: e.target.value})}
  const [biometricTable1,setBiometricTable1]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(false)


  function fetchleavesData(){
    setIsLoading(true)
    BiometricServiceModule.getBiometricMissingReportForParicularEmployee(monthYear.year,empId1).then((res)=>{
        if(res.status===200){
          setIsLoading(false)
          if(res.result.length==0){
            toast.info("No Records Found  for "+empId1+ "  for given year  "+monthYear.year,{
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
  function fetchleavesData1(){
    setIsLoading(true)
    BiometricServiceModule.getBiometricMissingReportForParicularEmployee(monthYear.year,empId2).then((res)=>{
        if(res.status===200){
          setIsLoading(false)
          if(res.result.length==0){
            toast.info("No Records Found  for "+empId2+ "  for given year  "+monthYear.year,{
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




const [load,setload]=useState(false)
  React.useEffect(()=>{
    if(empId1 !==null){
      fetchleavesData()
    }
    else{
      fetchleavesData1()
    }

    setload(false)
  },[load])


const handleSerchData=()=>{
  
if(monthYear!==null && empId1 !==null){
  fetchleavesData()
}
else if(monthYear!==null && empId2 !==null){
  fetchleavesData1()
}
else{
  toast.error("Please enter month and year ", {
    position: toast.POSITION.TOP_RIGHT
})
}

}


const history=useNavigate()
const handleGoBack = () =>{
    history(-1);
    setload(true)

};

  return hasAuthority( ALL_EMPLOYEE_MISSING_REPORT_AFTER_CLICK_PAGE_TITLE)? ( isLoading?<Loading></Loading>:
    
    <Box style={SerchingComponetsstyle.firstBox}>

<Box style={SerchingComponetsstyle.SecondBox}>
         <Typography style={SerchingComponetsstyle.typographystyle}>EMPLOYEE MISSING REPORT</Typography>


{
  empId1 !==null?
  <Grid style={{justifyContent:"center"}}>
  <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle} 
  onClick={handleGoBack}
  startIcon={<ArrowBackIosNewIcon/>}>
back
 </Button> 
 </Grid>:null
}

        
             </Box>



   <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>


        <form onSubmit={handleSerchData}> 
  <Box style={SerchingComponetsstyle.Thirdbox}>
      <Grid style={SerchingComponetsstyle.gridContainerStyle}>
   
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
 <TextField  style={SerchingComponetsstyle.textFieldStyle} required name="year"  value={monthYear.year} onChange={getime11} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
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



    <Box style={SerchingComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.empBioMissingId}
    initialState={{ sorting: {
      sortModel: [{ field: 'missingDate', sort: 'desc' }],
    },
       ...biometricTable1.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
   pageSizeOptions={[8,15,25,50,75]}
    >
       
    </DataGrid>
   </Box>
   </Box>
  ):<NoAuth></NoAuth>
}

