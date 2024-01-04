import { Autocomplete, Box, Button, Container, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { TaskTable } from './TaskTable';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import { toast } from 'react-toastify';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import moment from 'moment';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';

export const  ACCESS_LEVEL_TASK_STATUS_TITLE= " ACCESS_LEVEL_TASK_STATUS"


export const TaskStatus = () => {

//AutoComplete
    const [data, setData]=useState([]);
 const[records,setRecords]=useState();
const [status,setStatus]=useState(false)
 useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })

    },[records])
    

const[isLoading,setIsLoading]=useState(true)

  
//--------------------fetching all task status -------------------------------------------
const[taskTable,setTaskTable]=useState([])
const[taskTable1,setTaskTable1]=useState([])
const[taskTable2,setTaskTable2]=useState([])

async  function fetchData(){
  setIsLoading(true)
   await taskService.getAllStatusReport().then((res)=>{
    if(res.status===200){
      setTaskTable(res.result)
      setIsLoading(false)
    }
    else{
      setIsLoading(false)
      toast.error(res.message,{position:toast.POSITION.TOP_RIGHT})
    }
    }).catch((error)=>{
      setIsLoading(false)
      toast.error(error.message,{position:toast.POSITION.TOP_RIGHT})
    })
  }

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
        setIsLoading(false)
        toast.error(res.message,{position:toast.POSITION.TOP_RIGHT})
       }
   
      
     }).catch((error)=>{
      setIsLoading(false)
      toast.error(error.message,{position:toast.POSITION.TOP_RIGHT})
     })
   }
//---------------------------------------fetching data via start date and Date-----------------------------------------------
async  function fetchData2(){
  setIsLoading(true)
    await taskService.getStatusReportByDateOnly(employee.fromDate,employee.toDate).then((res)=>{
       if(res.status===200){
         setTaskTable2(res.result)
         setIsLoading(false)
         if(res.result.length==0){
          toast.info("No Records Found for  "+employee.empId+ "  Between the given dates "+moment(employee.fromDate).format("DD/MM/YYYY")+"   "+moment(employee.toDate).format("DD/MM/YYYY") ,{
              position: toast.POSITION.TOP_RIGHT
          })}
       }
       else{
        setIsLoading(false)
        toast.error(res.message,{position:toast.POSITION.TOP_RIGHT})
       }
   
      
     }).catch((error)=>{
      setIsLoading(false)
      toast.error(error.message,{position:toast.POSITION.TOP_RIGHT})
     })
   }

   const [employee, setEmployee] = useState({
    "fromDate":"2023-01-01",
    "toDate":dayjs().format("YYYY-MM-DD"),
    "empId": ""
});

const[showingSerchData,setShowingSerchData]=useState(false)
const [message,setMessage]=useState("")
const [dateSearch,setDateSearch]=useState(false)

useEffect(()=>{ 
fetchData()
setStatus(false)
},[status])
    const backbutton=useNavigate()

    



const handleSerchData=(e)=>{
    e.preventDefault()
 

  if(employee.empId.length>0 && employee.fromDate.length>0 && employee.toDate.length>0 ){
    
    setShowingSerchData(true)
    setDateSearch(false)
    
      fetchData1()
    
    setEmployee({...employee,empId:""})
  
  }
  else if(employee.fromDate.length>0 && employee.toDate.length>0 && employee.empId.length===0){
    
    setDateSearch(true)
    setShowingSerchData(false)
      fetchData2()
  }

  else{
toast.error("Please enter start date, end Date or empId ",{position:toast.POSITION.TOP_RIGHT})
    setShowingSerchData(false)
    setDateSearch(false)
  }
  
   }
    



    return hasAuthority(ACCESS_LEVEL_TASK_STATUS_TITLE) ?(
        isLoading? <Loading/>:
        <Box style={SerchingComponetsstyle.firstBox}>
             
                 <Box style={SerchingComponetsstyle.SecondBox}>
             <Typography style={SerchingComponetsstyle.typographystyle}>TASK STATUS</Typography>

             <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle} 
                 onClick={()=>{ setDateSearch(false);setShowingSerchData(false) ;setStatus(true);backbutton("/user/ts")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
                
     <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                
 {/*--------------InputFields:-----------FromDate---ToDate---EmpId-------------------------- */}



<form onSubmit={handleSerchData}> 


 
  <Box style={SerchingComponetsstyle.Thirdbox}>
      <Grid container style={SerchingComponetsstyle.gridContainerStyle}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >

<TextField InputLabelProps={{ shrink: true }} 
 style={SerchingComponetsstyle.textFieldStyle} type='date' 
 value={employee.fromDate}
  onChange={(e)=>{setEmployee({ ...employee,fromDate:e.target.value})}} 
  label="From Date"></TextField>
           
        </Grid >
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>

<TextField InputLabelProps={{ shrink: true }}  style={SerchingComponetsstyle.textFieldStyle} type='date' value={employee.toDate} onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} label="To Date"></TextField>
</Grid>   
        <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
            
            <Autocomplete 
               Value={employee.empId}
               onChange={(e,value)=>{
                 if(value==null){

                   return setEmployee({...employee,empId:""})
                 }
                 let data=value.match("[0-9]*")
                return setEmployee({...employee,empId:data[0]})

               }}

           style={SerchingComponetsstyle.textFieldStyle}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                
                                 {...params} 
                                label='Employee Id(Optional)'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                              
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />}
            />
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
    
{showingSerchData || dateSearch?null : <TaskTable allTask={taskTable} />}
{showingSerchData?<TaskTable allTask={taskTable1} />:null}
{dateSearch ? <TaskTable allTask={taskTable2} />:null }


        </Box>
    ):<NoAuth></NoAuth>
}

 