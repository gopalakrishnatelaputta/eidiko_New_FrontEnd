import * as React from 'react';
// import './em.css'
import { 
  Box,
  Grid, 
   Paper,
   Typography,
        } from "@mui/material";
import {FcBusinessman} from "react-icons/fc";
import { DataGrid } from '@mui/x-data-grid';
import { Button ,TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Navigate, useNavigate } from 'react-router';
import {Divider} from '@mui/material';
import {Container} from '@mui/material';
import Person4Icon from '@mui/icons-material/Person4';
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify'
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PreviewIcon from '@mui/icons-material/Preview';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import SearchIcon from '@mui/icons-material/Search';
import {MenuItem} from '@mui/material';
import {InputLabel} from '@mui/material';
import {FormControl} from '@mui/material';
import {Select} from '@mui/material';
import dayjs from 'dayjs';
import { WarningMailServices } from '../../Services/WarningMailServices/WarningMailServices';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';

const columns = [
  { 
    field: 'empId',
   headerName: 'Employee Id', 
   minWidth: 80,
    flex:1.5,
   headerClassName:'table-header'
 
  },
  { 
    field: 'title',
   headerName: 'Title', 
   minWidth: 180,
    flex:2,
   headerClassName:'table-header'
 
  },
  { 
    field: 'description',
   headerName: 'Description', 
   minWidth: 200,
    flex:2,
   headerClassName:'table-header'
 
  },
  { 
    field: 'sentDate',
   headerName: 'Sent Date', 
   minWidth: 120,
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
    field: 'warnedBy',
   headerName: 'Warned By', 
   minWidth: 120,
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

export const ALL_EMPLOYEE_WARNING_MAILS_PAGE_TITLE=" ALL_EMPLOYEE_WARNING_MAILS" 

export default function WarningMailSerach(props) {

  const textfield1 = { width: 400 }

  const[monthYear,setmonthYear]=useState({"month":dayjs().format("MM"),"year":dayjs().format("YYYY")})

  const getime11=(e)=>{setmonthYear({...monthYear, [e.target.name]: e.target.value})}
  const [biometricTable1,setBiometricTable1]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(false)


  function fetchWarningMail(year){
    setIsLoading(true)
    setmonthYear({...monthYear,month:dayjs().format("MM")})

    WarningMailServices.getwarninmailsviayear(year).then((res)=>{
        if(res.message==="success"){
          setIsLoading(false)
          if(res.result.length==0){
            toast.info("No Records Found  for  given year  "+year,{
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

  function fetchWarningmailDataViamonthAYear(){

    setmonthYear({...monthYear,month:dayjs().format("MM")})
    setIsLoading(true)
    WarningMailServices.getwarninmailsviayearandmonth(monthYear.year,monthYear.month).then((res)=>{
   
        if(res.message==="success"){
         
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
    fetchWarningmailDataViamonthAYear()
   // fetchWarningMail(monthYear.year)
    setload(false)
  },[load])


const handleSerchData=()=>{
  
if(monthYear.month !==null && monthYear.month !==dayjs().format("MM")){
  fetchWarningmailDataViamonthAYear()
}
else if(monthYear.year !==null && monthYear.month==dayjs().format("MM")){

  fetchWarningMail(monthYear.year)
}
else{
  toast.error("Please enter month and year ", {
    position: toast.POSITION.TOP_RIGHT
})
}


}



const handleRowClick=(params)=>{
  navigate(`../particular-employees-warning-mails`,{state:params.row.empId})
}



  return hasAuthority(ALL_EMPLOYEE_WARNING_MAILS_PAGE_TITLE)? ( isLoading?<Loading></Loading>:
    
    <Box sx={{
        height: 200,
        width: 'auto',
        padding: '10px 0px',
    }}>

<Box sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
            // marginTop:"10px",marginBottom:"20px"
            marginRight:"30px"
        }}>
         <Typography variant='h3' color={"secondary"} style={{marginLeft:"15px",fontSize:"24px",marginTop:"20px"}}> WARNING REPORTS</Typography>

         <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                    onClick={()=>{setload(true);setmonthYear({...monthYear,month:dayjs().format("MM"),year:dayjs().format("YYYY")})}}
                    startIcon={<ArrowBackIosNewIcon/>}>
               back
                   </Button> 
             </Box>



   <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>


        <form onSubmit={handleSerchData}> 
{/* <input type='hidden' value={hidden} onChange={(e)=>{sethidden("click")}}></input> */}
  <Box
   
    sx={{height:"100px",display:"flex",width:"auto"}}
    >
      <Grid container  sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width:"100vw",
            
           
      }}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            padding:"20px"
            
        
        }}style={textfield1} >
<FormControl sx={ {width: 300 ,minWidth:"90px"}}>
<InputLabel id="demo-multiple-name-label">Month</InputLabel>
        <Select 
      value={monthYear.month}
         onChange={getime11}
          labelId="demo-multiple-name-label"
          id="demo-multiple-start"
          name="month"
          label="Month"
        >
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
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            padding:"20px"
            
        
        }} style={textfield1}>
 <TextField  style={{marginLeft:"20px",width:300,minWidth:"90px"}} required name="year"  value={monthYear.year} onChange={getime11} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
        </Grid >


       
         <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            padding:"20px"
        }}>
            <Button value="click" variant='outlined' type='submit'
             sx={{justifyContent:"center",display:"flex",width:"300px",minWidth:"90px"}} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid> 
                 
      </Grid>
      
      
      </Box>
      
      </form>

     
   <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>



    <Box style={{height:"64.6vh",width:"98.7%",marginLeft:"10px",marginTop:"10px"}}>
    <DataGrid
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.warningMailId}
    initialState={{
       ...biometricTable1.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
   pageSizeOptions={[8,15,25,50,75]}
    // onRowClick={handleRowClick}

    >
       
    </DataGrid>
   </Box>
   </Box>
  ):<NoAuth></NoAuth>
}

