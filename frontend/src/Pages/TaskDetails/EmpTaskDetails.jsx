import { Autocomplete, Box, Button, Container, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getAllEmployees } from '../../Services/employee-service/EmployeeService'
import { useLocation, useNavigate } from 'react-router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { StatusTable } from './StatusTable';
import { TaskTableSerchingViaSEEI } from './TaskTable';
import { TaskTableSerchingViaViaDateOnly } from './TaskTable';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import { toast } from 'react-toastify';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { EmpTaskTable } from './EmpTaskTable';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import moment from 'moment';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';


export const  EMPLOYEE_TASK_SEARCH_TITLE= " EMPLOYEE_TASK_SEARCH"

export const EmpTaskDetails = (props) => {

  const {state}=useLocation(props.state)
  const[remEmpId,setremEmpId]=useState(state)

  const navigate=useNavigate()
  const[tableData,setTableData]=useState([])

  
const history=useNavigate()
const handleGoBack = () =>{
 history(-1);
};


async  function fetchDatafromReportingEmployee(){
  setIsLoading(true)
      await taskService.getStatusReportByDate(remEmpId,employee.fromDate,employee.toDate).then((res)=>{
         if(res.status===200){
           setTaskTable1(res.result)
           setIsLoading(false)
           if(res.result.length==0){
            toast.info("No Records Found for  "+remEmpId+ "  Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
                position: toast.POSITION.TOP_RIGHT
            })}
         }
         else{
          toast.error(res.message,{position:toast.POSITION.TOP_CENTER})
          setIsLoading(false)
         }
     
        
       }).catch((error)=>{
        toast.error(error.message,{position:toast.POSITION.TOP_CENTER})
        setIsLoading(false)
       })
     }


let emp_id=localStorage.getItem("id")
  const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))


const[isLoading,setIsLoading]=useState(true)

//--------------------fetching all task status -------------------------------------------
const[taskTable1,setTaskTable1]=useState([])

  //------------------------------fetching data with start date end date and emp id -------------------
  async  function fetchData1(){
setIsLoading(true)
    await taskService.getStatusReportByDate(employee.empId,employee.fromDate,employee.toDate).then((res)=>{
       if(res.status===200){
         setTaskTable1(res.result)
         setIsLoading(false)
         if(res.result.length==0){
          toast.info("No Records Found for  "+employee.empId+ "  Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
              position: toast.POSITION.TOP_RIGHT
          })}
       }
       else{
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER})
        setIsLoading(false)
       }
   
      
     }).catch((error)=>{
      toast.error(error.message,{position:toast.POSITION.TOP_CENTER})
      setIsLoading(false)
     })
   }
//---------------------------------------fetching data via start date and Date-----------------------------------------------
async  function fetchData2(){
  setIsLoading(true)
    await taskService.getStatusReportByDateOnly(employee.fromDate,employee.toDate).then((res)=>{
       if(res.status===200){
        setIsLoading(false)
         setTaskTable1(res.result)
         if(res.result.length==0){
          toast.info("No Records Found Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
              position: toast.POSITION.TOP_RIGHT
          })}
       }
       else{
        setIsLoading(false)
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER})
       }
   
      
     }).catch((error)=>{
      setIsLoading(false)
      toast.error(error.message,{position:toast.POSITION.TOP_CENTER})
     })
   }

   const [employee, setEmployee] = useState({
    "fromDate":"2023-01-01",
    "toDate":dayjs().format("YYYY-MM-DD"),
    "empId": emp_id
});


 useEffect(()=>{
  if(remEmpId !==null){
    fetchDatafromReportingEmployee()
  }
  else{
    fetchData1(employee.empId,employee.fromDate,employee.toDate)
  } 

  },[])
    const backbutton=useNavigate()

    



const handleSerchData=(e)=>{
    e.preventDefault()
 

  if(remEmpId==null,employee.fromDate.length>0 && employee.toDate.length>0 ){
fetchData2(employee.empId,employee.fromDate,employee.toDate)
  
  }
  else if(remEmpId !==null,employee.fromDate.length>0 && employee.toDate.length>0 ){
    fetchDatafromReportingEmployee(remEmpId,employee.fromDate,employee.toDate)
      
      }
 
  else{
toast.error("Please enter start date, end Date or empId ",
{position:toast.POSITION.TOP_RIGHT})
   
  }
  
   }
return hasAuthority(EMPLOYEE_TASK_SEARCH_TITLE)? (
        isLoading? <Loading/>:
        <Box style={SerchingComponetsstyle.firstBox}>
                 <Box style={SerchingComponetsstyle.SecondBox}>
             <Typography style={SerchingComponetsstyle.typographystyle}>EMPLOYEE TASK STATUS REPORT</Typography>

             <Grid style={{justifyContent:"center"}}>
             <Button variant='outlined' className='style' style={{marginBottom:"3px",marginTop:"15px",marginRight:"13px"}} 
                startIcon={<AssignmentLateIcon></AssignmentLateIcon>} 
                onClick={()=>{navigate(`/user/daily-report`)}}
                >
                            CREATE TASK 
                </Button>


                <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
                 onClick={handleGoBack}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>                
     <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                
 {/*--------------InputFields:-----------FromDate---ToDate---EmpId-------------------------- */}


 
<form       onSubmit={handleSerchData}> 
 
  <Box style={SerchingComponetsstyle.Thirdbox}>
      <Grid container  style={SerchingComponetsstyle.gridContainerStyle}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >

<TextField InputLabelProps={{ shrink: true }} style={SerchingComponetsstyle.textFieldStyle} type='date' 
 value={employee.fromDate}
  onChange={(e)=>{setEmployee({...employee,fromDate:e.target.value})}} 
  label="From Date"></TextField>
           
        </Grid >
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>

<TextField InputLabelProps={{ shrink: true }} style={SerchingComponetsstyle.textFieldStyle} type='date'
 value={employee.toDate} onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} 
 label="To Date"></TextField>
</Grid>   
       
       
         <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
            <Button value="click" variant='outlined' type='submit' style={SerchingComponetsstyle.searchbuttonstyle} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid> 
                 
      </Grid>
      
     
      </Box>

      </form>

     <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
{/*-----------------------Tabel:---------------------------- */} 

<EmpTaskTable allTask={taskTable1} />
 </Box>
    ):<NoAuth></NoAuth>
}

 