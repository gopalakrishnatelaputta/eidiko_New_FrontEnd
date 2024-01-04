import * as React from 'react';
import { 
  Box,
  Grid, 
   Typography,
        } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Button ,TextField} from '@mui/material';
import {  useNavigate } from 'react-router';
import { toast } from 'react-toastify'
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { LeaveServices } from '../../Services/Leave-Service/LeaveServices';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import SearchIcon from '@mui/icons-material/Search';
import {MenuItem} from '@mui/material';
import {InputLabel} from '@mui/material';
import {FormControl} from '@mui/material';
import {Select} from '@mui/material';
import dayjs from 'dayjs';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const columns = [
  { 
    field: 'empId',
   headerName: 'Employee Id', 
   minWidth: 80,
    flex:1.5,
   headerClassName:'table-header'
 
  },
  { 
    field: 'empName',
   headerName: 'Employee Name', 
   minWidth: 210,
    flex:3,
   headerClassName:'table-header'
 
  },
  { 
    field: 'band',
   headerName: 'Band', 
   minWidth: 100,
    flex:1.5,
   headerClassName:'table-header'
 
  },
 
  { 
    field: 'totalLeavesAsPerband',
   headerName: ' Total Leaves', 
   minWidth: 90,
    flex:1.5,
   headerClassName:'table-header',
   renderCell: (params)=>{
    return (
      <Box sx={{backgroundColor:"green",width:"40px",justifyContent:"center",display:"flex",height:"20px",alignContent:"center",alignItems:"center",borderRadius:"10px"}}>
       <Typography sx={{color:"#FFFFFF"}} >{params?.value}</Typography>
     </Box>
    )

   }
 
  },

  { 
    field: 'leavesCount',
   headerName: 'Leaves Count', 
   minWidth: 80,
    flex:1.5,
   headerClassName:'table-header'
 
  },
  { 
    field: 'absentCount',
   headerName: 'Absent Count', 
   minWidth: 90,
    flex:1.5,
   headerClassName:'table-header'
 
  },
  { 
    field: 'total',
   headerName: 'Total', 
   minWidth: 90,
    flex:1.5,
   headerClassName:'table-header'
 
  },
 

];

export const ALL_EMPLOYEE_LEAVES_REPORT_PAGE_TITLE=" ALL_EMPLOYEE_LEAVES_REPORT" 

export default function LeavesReport(props) {

  function initial(){
    let mon1=dayjs().format("MM")
    let mon2=mon1-1;
    let mon3="0"+mon2
    return mon3
  }
  
  const[monthYear,setmonthYear]=useState({"month":initial(),"year":dayjs().format("YYYY")})
    const getime11=(e)=>{setmonthYear({...monthYear, [e.target.name]: e.target.value})}
  const [biometricTable1,setBiometricTable1]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(false)

////////////////////////////--for back button--//////////////////////////////////////////

const[backButoon1,setbackButton1]=useState(false)
const[reload,setreload]=useState(false)
const handlefilter=()=>{
  setbackButton1(true)
}




  function fetchleavesData(){
    setIsLoading(true)
    LeaveServices.getAllEmployeeLeavesStatus().then((res)=>{
        if(res.status===200){
          setIsLoading(false)
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
  function fetchleavesDataViamonthAYear(){

    setIsLoading(true)
    LeaveServices.Employeeleaveserch(monthYear.year,monthYear.month).then((res)=>{
        if(res.status===200){
          setIsLoading(false)
        setBiometricTable1(res.result)
        if(res.result.length==0){
          toast.info("No Records Found  Between the given "+monthYear.month+" and "+monthYear.year+{
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
fetchleavesData()
    setload(false)
    setbackButton1(false)
  },[load,reload])


const handleSerchData=()=>{
  
if(monthYear !==null){
  fetchleavesDataViamonthAYear()
  setbackButton1(true)
}
else{
  toast.error("Please enter month and year ", {
    position: toast.POSITION.TOP_RIGHT
})
}

}



const handleRowClick=(params)=>{
  const employeeDetailsUrl=`../user/employee-spent-after-row-click?empId=${params.row.empId}`;
  window.open(employeeDetailsUrl,'_blank');
  // navigate(`../employee-spent-after-row-click`,{state:params.row.empId})
}



  return hasAuthority(ALL_EMPLOYEE_LEAVES_REPORT_PAGE_TITLE)? ( isLoading?<Loading></Loading>:
    
    <Box
  style={SerchingComponetsstyle.firstBox}
    >

      <Box style={SerchingComponetsstyle.SecondBox}>

         <Typography style={SerchingComponetsstyle.typographystyle}>EMPLOYEES LEAVE REPORT</Typography>

<Box sx={{display:"flex",justifyContent:"flex-end"}}>
<Button variant='outlined' className='style' 
                  style={SerchingComponetsstyle.backbuttonstyle}
                  startIcon={< AccountTreeIcon/>}
                   onClick={()=>{navigate("/user/employee-leave-creation-page" )}}
                  >
                            Create Leaves
                </Button>
                {
  backButoon1 ?<Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
  onClick={()=>{setreload(!reload)}}
  startIcon={<ArrowBackIosNewIcon/>}>
back
 </Button>:null
}

</Box>
         
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
          required
        >
           <MenuItem value="12" >ALL</MenuItem>
          <MenuItem value="00" >Jan</MenuItem>
          <MenuItem value="01" >Feb</MenuItem>
          <MenuItem value="02" >Mar</MenuItem>
          <MenuItem value="03" >April</MenuItem>
          <MenuItem value="04" >May</MenuItem>
          <MenuItem value="05" >June</MenuItem>
          <MenuItem value="06" >July</MenuItem>
          <MenuItem value="07" >Aug</MenuItem>
          <MenuItem value="08" >Sept</MenuItem>
          <MenuItem value="09" >Oct</MenuItem>
          <MenuItem value="10" >Nov</MenuItem>
          <MenuItem value="11" >Dec</MenuItem>
                                      
        </Select>
      </FormControl>

           
        </Grid >
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
        <TextField  style={SerchingComponetsstyle.textFieldStyle} required name="year"  value={monthYear.year} onChange={getime11} label="Year" type="number"  
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
    
onFilterModelChange={handlefilter}
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.empId}
    initialState={{
       ...biometricTable1.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
   pageSizeOptions={[8,15,25,50,75]}
   onRowClick={handleRowClick}s
   slots={{
    toolbar: CustomToolBar,
  }}
    >
       
    </DataGrid>
   </Box>
   </Box>
  ):<NoAuth></NoAuth>
}

