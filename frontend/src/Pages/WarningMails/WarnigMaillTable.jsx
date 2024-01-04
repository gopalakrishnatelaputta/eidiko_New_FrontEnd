import * as React from 'react';
import { 
  Box,
  Card,
  Grid, 
   IconButton, 
   Modal, 
   Typography,
        } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Button ,TextField} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify'
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import SearchIcon from '@mui/icons-material/Search';
import { WarningMailServices } from '../../Services/WarningMailServices/WarningMailServices';
import dayjs from 'dayjs';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import PreviewIcon from '@mui/icons-material/Preview';
import { Description } from '@mui/icons-material';
import WarningMailElaborate from './WarningMailElaborate';


function getempnameid(params) {
  return params.row?.empId+" -"+params.row?.empName
}
function getreviewedid(params) {
  return params.row?.warnedBy+" -"+params.row?.warnedByName
}



export const PARTICULAR_EMPLOYEE_WARNING_MAILS_PAGE_TITLE=" PARTICULAR_EMPLOYEE_WARNING_MAILS" 

export default function ParticularWarningMail(props) {
  const location=useLocation();
const queryParams= new URLSearchParams(location.search);
const param1Value=queryParams.get('empId');
const param2Value=queryParams.get('empName');

const {state}=useLocation(props.state)
    const [empId1,setEmpId1]=useState(param1Value)


    // const[empId1,setempid1]=useState(state)
    const[empId2,setempid2]=useState(localStorage.getItem("id"))

  const[monthYear,setmonthYear]=useState({"month":dayjs().format("MM"),"year":dayjs().format("YYYY")})
    const getime11=(e)=>{setmonthYear({...monthYear, [e.target.name]: e.target.value})}
  const [biometricTable1,setBiometricTable1]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(false)


  function fetchleavesData(){
    setIsLoading(true)
    WarningMailServices.getwarninmailsviaempid(empId1).then((res)=>{
        if(res.message==="success"){
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
   WarningMailServices.getwarninmailsviaempid(empId2).then((res)=>{
        if(res.message==="success"){
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


const[description,setDescription]=useState(false)
const[rowdata,setrowdata]=useState([])
const handlerow=(params)=>{
setrowdata(params.row)
}






const columns = [
  { 
    field: 'empIdwithname',
   headerName: 'Employee Name', 
   minWidth: 200,
    flex:2,
   headerClassName:'table-header',
   valueGetter:getempnameid
 
  },
  { 
    field: 'title',
   headerName: 'Title', 
   minWidth: 120,
    flex:1.7,
   headerClassName:'table-header'
 
  },
  { 
    field: 'description',
   headerName: 'Description', 
   minWidth: 120,
    flex:1.7,
   headerClassName:'table-header',
 
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
    field: 'warningDate',
   headerName: 'Warning Date', 
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
    field: 'severityLevel',
   headerName: 'Severity', 
   minWidth: 100,
    flex:1.5,
   headerClassName:'table-header'
 
  },
  { 
    field: 'warningLevel',
   headerName: 'Warning Level', 
   minWidth: 100,
    flex:1.5,
   headerClassName:'table-header'
 
  },
  { 
    field: 'warnedBy',
   headerName: 'Warned By', 
   minWidth: 200,
    flex:2.5,
   headerClassName:'table-header',
   valueGetter:getreviewedid
 
  },
  { 
    field: 'View',
   headerName: 'View', 
   minWidth: 70,
    flex:1,
   headerClassName:'table-header',
   renderCell:(params)=>{

    return(
      <>
      <Box onClick={()=>{setDescription(!description)}} sx={{
        display: 'flex',
        justifyContent: 'center'}}>

        <IconButton variant="contained" color='error'>
            <PreviewIcon color='secondary' sx={{ marginRight: "39px" }} />
        </IconButton >

    </Box>

      <Modal  open={description} sx={{overflow:"scroll"}} onClick={()=>{setDescription(!description)}}>
    
     
        <WarningMailElaborate rowdata={rowdata} onClose1={()=>{setDescription(false)}}></WarningMailElaborate>
        
      
      </Modal>

    </>
    )
   }
 
  },
 
  

];












  return hasAuthority(PARTICULAR_EMPLOYEE_WARNING_MAILS_PAGE_TITLE)? ( isLoading?<Loading></Loading>:
    
    <Box style={SerchingComponetsstyle.firstBox}>

<Box style={SerchingComponetsstyle.SecondBox}>

  {
    param2Value!==null?<Typography style={SerchingComponetsstyle.typographystyle}> WARNING REPORTS OF <span style={{color:"black"}}>{param2Value}</span></Typography>: <Typography style={SerchingComponetsstyle.typographystyle}>EMPLOYEE WARNING REPORTS</Typography>
  }
        

             </Box>
   <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

        <form onSubmit={handleSerchData}> 
  <Box
   
   style={SerchingComponetsstyle.Thirdbox}
    >
      <Grid style={SerchingComponetsstyle.gridContainerStyle}>
 
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
 <TextField  style={SerchingComponetsstyle.textFieldStyle} required name="year"  value={monthYear.year} onChange={getime11} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
        </Grid >


       
         <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
            <Button value="click" variant='outlined' type='submit'
               style={SerchingComponetsstyle.searchbuttonstyle}  endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid> 
                 
      </Grid>
      
      
      </Box>
      
      </form>
   <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
    <Box style={SerchingComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    onRowClick={handlerow}
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.warningMailId}
    initialState={{
      sorting: {
        sortModel: [{ field: 'warningDate', sort: 'desc' }],
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

