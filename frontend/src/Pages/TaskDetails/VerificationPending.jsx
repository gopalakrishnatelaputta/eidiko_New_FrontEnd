import { Box, Button,TextField, Typography,Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { VerificationTable } from './VerificationTable';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import { toast } from 'react-toastify';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import moment from 'moment';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';

export const  ACCESS_LEVEL_VERIFICATION_PENDING_TABLE_TITLE= " VERIFICATION_PENDING_TABLE_1"

export const VerificationPending = () => {

const[isLoading,setIsLoading]=useState(true)
const[load,setload]=useState(false)
    const [employee, setEmployee] = useState({
        "fromDate":"2023-01-01",
        "toDate":dayjs().format("YYYY-MM-DD"),
    });
     const backbutton=useNavigate()
//---------------------data fetching----------------------------------------

const [VerificationTable1,setVerificationTable1]=useState([])
const [VerificationTable2,setVerificationTable2]=useState([])


async  function fetchData(){
  setIsLoading(true)
    taskService.getAllVerificationPendingReports().then((res)=>{
      
      if(res.status===200){
        setIsLoading(false)
        setVerificationTable1(res.result)
      }
      else{
        setIsLoading(false)
        toast.error(res.message,{position:toast.POSITION.TOP_CENTER})
      }
    }).catch((error)=>{
      setIsLoading(false)
      toast.error(error.response.data.message,
        {
            position: toast.POSITION.TOP_RIGHT
          }
        )
    })
  }
  
  async  function fetchData2(){
    setIsLoading(true)
    await taskService.serchingVerificationPendingReports(employee.fromDate,employee.toDate).then((res)=>{
      
      if(res.status===200){
        setIsLoading(false)
        setVerificationTable2(res.result)
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
      toast.error(error.response.data.message,
        {
            position: toast.POSITION.TOP_RIGHT
          }
        )
    })
  }
  const[showingSerchData,setShowingSerchData]=useState(false)
  const [message,setMessage]=useState("")

useEffect(()=>{
   fetchData()
   setload(false)
},[load])




const handleSerchData2=(e)=>{
    e.preventDefault()
  if(employee.fromDate.length>0 && employee.toDate.length>0 ){
    setShowingSerchData(true)
    fetchData2()
  }
  else{
   setMessage("Please enter start date and end Date ")
    setShowingSerchData(false)
  }
  

   }





    return hasAuthority(ACCESS_LEVEL_VERIFICATION_PENDING_TABLE_TITLE)? (
        isLoading? <Loading/>:
        <Box style={SerchingComponetsstyle.firstBox}>
             
                 <Box style={SerchingComponetsstyle.SecondBox}>
             <Typography style={SerchingComponetsstyle.typographystyle}>VERIFICATION PENDING</Typography>

             <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
                 onClick={()=>{setShowingSerchData(false);setload(true);backbutton("/user/vp")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
                
       <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
 {/*--------------InputFields:-----------FromDate---ToDate---EmpId-------------------------- */}
 <form onSubmit={handleSerchData2}>

  <Box style={SerchingComponetsstyle.Thirdbox} >
      <Grid container style={SerchingComponetsstyle.gridContainerStyle}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >
             <TextField InputLabelProps={{ shrink: true }} style={SerchingComponetsstyle.textFieldStyle} type='date' value={employee.fromDate} onChange={(e)=>{setEmployee({ ...employee,fromDate:e.target.value})}} label="From Date"></TextField>
           
        </Grid >
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
            
<TextField InputLabelProps={{ shrink: true }} style={SerchingComponetsstyle.textFieldStyle} type='date' value={employee.toDate} onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} label="To Date"></TextField>
          
        </Grid >
       
         <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
            <Button variant='outlined' type='submit'
         style={SerchingComponetsstyle.searchbuttonstyle} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid>        
      </Grid>
      
      </Box>
      </form>
      <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
{/*-----------------------Tabel:---------------------------- */}
      {showingSerchData?null :<VerificationTable allTask={VerificationTable1}/>} 

{showingSerchData?<VerificationTable allTask={VerificationTable2}/>:null}
        </Box>


    ):<NoAuth></NoAuth>
}
 