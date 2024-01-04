import { Box, Button, Container, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getAllEmployees } from '../../Services/employee-service/EmployeeService'
import { useNavigate } from 'react-router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { TaskTable } from './TaskTable';
import { StatusTable } from './StatusTable';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import { toast } from 'react-toastify';

export const StatusPending = () => {

const [employees, setEmployees] = useState([]);
const[isLoading,setIsLoading]=useState(true)
const textfield1 = { width: 400 }
const button1 = { backgroundColor: "#2196F3", color: "white", width: "150px",height:"50px",
borderRadius: "10px",marginTop:"15px",marginRight:"42px" }

const backbutton=useNavigate()
    useEffect(() => {
        getAllEmployees().then(
            res => {
                if (res.status == 200 && res.statusMessage === 'success') {
                   setIsLoading(false)
                    setEmployees(res.result)
                } else {
                    setIsLoading(false)
                }
            }
        ).catch(err => {
            setIsLoading(false)
        })
    }, []);

//-----------------------------fetching pending reports data-----------------------------------
const [employee, setEmployee] = useState({
    "fromDate":"",
    "toDate":""
});

const [pendingReport,setPendingReport]=useState([])
const [pendingReport1,setPendingReport1]=useState([])
async  function fetchData(){
    taskService.getAllStatusPendingReports().then((res)=>{
      setPendingReport(res.result)
    }).catch((error)=>{
  
    })
  }

  async  function fetchData2(){
    await taskService.serchingStatusPendingReportsViaDates(employee.fromDate,employee.toDate).then((res)=>{
        if(res.data.status===200){
          setPendingReport1(res.data.result)
        }
        else{
          toast.error(res.data.message,{position:toast.POSITION.TOP_CENTER})
        }
       
     }).catch((error)=>{
      setIsLoading(false)
      
     })
   }
  
  useEffect(()=>{
    fetchData()
    fetchData2()
},[employee])










    
   
const[showingSerchData,setShowingSerchData]=useState(false)
const [message,setMessage]=useState("")


const handleSerchData1=(e)=>{
    e.preventDefault()
  if(employee.fromDate.length>0 && employee.toDate.length>0 ){
    setShowingSerchData(true)
  }
  else{
   setMessage("Please enter start date and end Date ")
    setShowingSerchData(false)
  }
  

   }



    return (
        isLoading? <Loading/>:
        <Box sx={{
            height: 200,
            width: '75vw',
            padding: '10px 0px',
         
        }}>
              {/*style={{textAlign:"center",display:"flex",height:"38px",justifyContent:"flex-start"}} */}
                 <Box sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                // marginTop:"10px",marginBottom:"20px"
                marginRight:"30px"
            }}>
             <Typography color={"secondary"}  style={{marginLeft:"35px",fontSize:"26px"}}>STATUS PENDING</Typography>

             <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton("/user/ts")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>

                 {/* <GlobalButton.GlobalDivider/> */}
                
        <Box style={{marginLeft:"25px",width:"95%"}}>
            <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />
            </Box>
                
 {/*--------------InputFields:-----------FromDate---ToDate---EmpId-------------------------- */}

 <form onSubmit={handleSerchData1}>
 {/* <input id="someId" type="hidden" name="submit[SomeValue]" value={hidden} /> */}

  <Box
   
    sx={{height:"100px",display:"flex",width:"77vw"}}
    >
      <Grid container  sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width:"100vw",
            marginLeft:"20px",
            
           
      }}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:"8px",
            padding:"20px"
            
        
        }}style={textfield1} >
            <TextField InputLabelProps={{ shrink: true }} style={{width:"390px"}} type='date' value={employee.fromDate} onChange={(e)=>{setEmployee({ ...employee,fromDate:e.target.value})}} label="From Date"></TextField>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker 
                    onChange={(newValue) => setEmployee({
                        ...employee,fromDate:newValue
                    })} 
                    label="From Date "  
                    defaultValue={dayjs(`${employee.fromDate}`)}
                    className='outlined-basic-text-box'  
                    sx={{display:"flex",width:"350px"}}
                    
                />
            </LocalizationProvider> */}
        </Grid >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:"8px",
            padding:"20px"
            
        
        }} style={textfield1}>

<TextField InputLabelProps={{ shrink: true }}  style={{width:"390px"}} type='date' value={employee.toDate} onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} label="To Date"></TextField>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker 
                    onChange={(newValue) => setEmployee({
                        ...employee,toDate:newValue
                    })} 
                    label="To Date "  
                    defaultValue={dayjs(`${employee.toDate}`)}
                    className='outlined-basic-text-box' 
                    sx={{display:"flex",width:"350px"}}
                />
            </LocalizationProvider> */}
        </Grid >
       
       
         <Grid item xs={12} sm={12} md={3}  lg={3} xl={3} sx={{
            display: 'flex',
            marginTop:"8px",
            justifyContent: 'flex-end',
            padding:"20px"
        }}>
            <Button variant='outlined' type='submit'
             style={{fontWeight:"bold",color:"#2196F3",
             marginRight:"50px",height:"55px",width:"300px"}} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid>        
      </Grid>
      
      </Box>
      {message.length>0 ? <center> <p style={{ color: "red", fontSize: "19px" }}>{message}</p> </center> :null}
      </form>

      
      {/* <Box style={{marginLeft:"25px",marginRight:"33px",width:"95%"}}>
            <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />
            </Box> */}
{/*-----------------------Tabel:---------------------------- */}

     { showingSerchData?null : <StatusTable allTask={pendingReport}/>} 
{ showingSerchData? <StatusTable allTask={pendingReport1}/>: null }

        </Box>
        
        
    )
}
 
