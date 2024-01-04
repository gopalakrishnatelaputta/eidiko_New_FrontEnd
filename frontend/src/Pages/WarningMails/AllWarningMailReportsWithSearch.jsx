import { Autocomplete, Box, Button, Grid ,TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { toast } from 'react-toastify';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { WarningMailServices } from '../../Services/WarningMailServices/WarningMailServices';
import { useNavigate } from 'react-router';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle'; 
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const columns = [
    { 
      field: 'emp_id',
     headerName: 'Employee Id', 
     minWidth: 100,
      flex:1.5,
     headerClassName:'table-header'
   
    },
    { 
        field: 'emp_NAME',
       headerName: 'Employee Name', 
       minWidth: 220,
        flex:2.5,
       headerClassName:'table-header'
     
      },
      { 
        field: 'total_warnings_received',
       headerName: 'Total Warnings', 
       minWidth: 125,
        flex:1.5,
       headerClassName:'table-header'
     
      },
]




export const   ACCESS_LEVEL_WARNING_MAIL_SEARCH_GIVEN_DATES_PAGE_TITLE= "ACCESS_LEVEL_WARNING_MAIL_SEARCH_GIVEN_DATES"


export const AllWarningMailReportsWithSearch = () => {

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
const [employee, setEmployee] = useState({
  "fromDate":"2023-01-01",
  "toDate":dayjs().format("YYYY-MM-DD"),
  "empId": ""
});
const[backButoon1,setbackButton1]=useState(false)
const[reload,setreload]=useState(false)
const handlefilter=()=>{
  setbackButton1(true)
}


const[biometricTable1,setbiometricTable1]=useState([])

async  function fetchData(){
  setIsLoading(true)
   await WarningMailServices.getAllCautionMailReportForemployees(employee.fromDate,employee.toDate).then((res)=>{
    
    if(res.status===200){
      setbiometricTable1(res.result)
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
  
async  function fetchData2(){
  setIsLoading(true)
   await WarningMailServices.getCautionMailReportForparticularemployee(employee.empId,employee.fromDate,employee.toDate).then((res)=>{
    let arr1=[]
   
    if(res.status===200 && res.result !==null){
      arr1.push(res.result)
      if(arr1.length>0){
        setbiometricTable1(arr1)
      }
      setIsLoading(false)
    }
    else if(res.status===200 && res.result==null){
      toast.info("No Data Associated with this employee "+employee.empId,{position:toast.POSITION.TOP_RIGHT})
    
      setbiometricTable1(arr1)
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
  const navigate=useNavigate()

  const handleRowClick=(params)=>{
   const employeeDetailsUrl=`../user/particular-employees-warning-mails?empId=${params.row.emp_id}&empName=${params.row.emp_NAME}`;
   window.open(employeeDetailsUrl, '_blank'); 
   // navigate(`../particular-employees-warning-mails`,{state:params.row.emp_id})
  }




useEffect(()=>{ 
fetchData()
setStatus(false)
setbackButton1(false)
},[status,reload])


const handleSerchData=(e)=>{
    e.preventDefault()
 

  if(employee.empId.length>0 && employee.fromDate.length>0 && employee.toDate.length>0 ){
    fetchData2()
     setEmployee({...employee,empId:""}) 
     setbackButton1(true)
  }
  else if(employee.empId.length==0 && employee.fromDate.length>0 && employee.toDate.length>0){
    fetchData()
    setbackButton1(true)
  }
  else{
toast.error("Please enter start date, end Date or empId ",{position:toast.POSITION.TOP_RIGHT})
  
  }
  
   }
    

    return hasAuthority( ACCESS_LEVEL_WARNING_MAIL_SEARCH_GIVEN_DATES_PAGE_TITLE) ?(
        isLoading? <Loading/>:
        <Box style={SerchingComponetsstyle.firstBox}>
             
                 <Box style={SerchingComponetsstyle.SecondBox}>
             <Typography color={"secondary"}  style={{marginLeft:"10px",fontSize:"21px",marginTop:"20px"}}>ALL EMPLOYEES WARNING</Typography>

             {
  backButoon1 ?<Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
  onClick={()=>{setreload(!reload);setEmployee({
    "fromDate":"2023-01-01",
    "toDate":dayjs().format("YYYY-MM-DD"),
    "empId": ""
  })}}
  startIcon={<ArrowBackIosNewIcon/>}>
back
 </Button>:null
}
                 </Box>   
     <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
                



<form onSubmit={handleSerchData}> 


 
  <Box style={SerchingComponetsstyle.Thirdbox}>
      <Grid container  style={SerchingComponetsstyle.gridContainerStyle}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>

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

            sx={{display:"flex"}}
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
<Box style={SerchingComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    onFilterModelChange={handlefilter}
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.emp_id}
    initialState={{
      sorting: {
        sortModel: [{ field: 'total_warnings_received', sort: 'desc' }],
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

 