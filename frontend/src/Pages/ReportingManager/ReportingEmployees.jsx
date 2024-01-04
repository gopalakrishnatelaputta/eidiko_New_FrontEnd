
import { Autocomplete, Box, Button, Container, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import PreviewIcon from '@mui/icons-material/Preview';
import { getAllEmployees, getReportedEmployees} from '../../Services/employee-service/EmployeeService';
import Swal from 'sweetalert2';
import { deleteEmployeeService } from '../../Services/employee-service/EmployeeService';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Loading from '../../Components/LoadingComponent/Loading';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import SearchIcon from '@mui/icons-material/Search';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';
import dayjs from 'dayjs';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { Link } from 'react-router-dom';
import { loci } from './ReportingEmpProfile';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar';

 export const REPORTED_EMPLOYEES_PAGE_TITLE="REPORTING_EMPLOYEES"
 export const REPORTING_EMPLOYEE_SHOW_EMP_ID="REPORTING_EMPLOYEE_EMP"




 function getIdName(params) {
    return params.row?.empId+" -"+params.row.empName
  }
  
 function getmanagerIdName(params) {
    return params.row?.managerId+" -"+params.row.managerName
  }



 


 


export const ReportingEmployees = (props) => {
    const location = useLocation();

    const[backButoon1,setbackButton1]=useState(false)
    const[reload,setreload]=useState(false)
    const handlefilter=()=>{
      setbackButton1(true)
    }
   
//AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();
const [status,setStatus]=useState(false)
useEffect(()=>{
 AutoEmpSearch(records).then((res)=>{
   setData(res.data.result)
 })

   },[records])

   
    const textfield1 = { width: 400 }
        const [employee, setEmployee] = useState({
        "fromDate":helpFunction.DateReturnForDataFetch(),
        "toDate": dayjs().format("YYYY-MM-DD"),
        "empId": localStorage.getItem("id")
    });
const [managerId,setmanagerid]=useState()


    const{state}=useLocation(props.state)
    const[isLoading,setIsLoading]=useState(false)
    
    
    const history=useNavigate();
    const handleGoBack = () =>{
        history(-1);
        setload(true)
    };
  
const [emp1,setemp1]=useState()

    const fetchEmployee=()=>{

        setIsLoading(true)
        getReportedEmployees(employee.empId,employee.fromDate,employee.toDate).then(
          
            res => {
                
                if (res.status == 200 && res.statusMessage === 'success') {
                   setIsLoading(false)
                   if(res.result.length==0){
                    toast.info("No one is reporting to "+employee.empId+"-"+res.managerName, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                   }
                    setEmployees(res.result)
                   setemp1(res.managerName)
                   setmanagerid(res.managerId)
                } else {
                    setIsLoading(false)
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                   
                }
    
            }
        ).catch(err => {
            setIsLoading(false)
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            
        })
     }
  
     const fetchEmployeeviaEmpId=()=>{
        setIsLoading(true)
         getReportedEmployees(empId2,employee.fromDate,employee.toDate).then(
            
            res => {
             
                
                if (res.status == 200 && res.statusMessage === 'success') {
                   setIsLoading(false)
                   if(res.result.length==0){
                    toast.info("No one is reporting to "+empId2+"-"+res.managerName, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                   }
                    setEmployees(res.result)
                    setemp1(res.managerName)
                    setmanagerid(res.managerId)
                } else {
                    setIsLoading(false)
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                   
                }
    
            }
        ).catch(err => {
            setIsLoading(false)
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            
        })
     }


const [empId2,setEmpId2]=useState(state)

const[load,setload]=useState(false)

    const [employees, setEmployees] = useState([]);
    const[empId,setEmpId]=useState()



    useEffect(() => {
      if(empId2 !==null){
        fetchEmployeeviaEmpId(empId2)
        setload(false)
        setbackButton1(false)
      }else {
        fetchEmployee()
        setload(false)
        setbackButton1(false)
      }
        

    }, [reload]);

    

    const handleRowClick = (params) => {
       
        const employeeDetailsUrl = `../user/report-emp?empId=${params.row.empId}&managerId=${managerId}`; // Replace with the URL or route for employee details page
             window.open(employeeDetailsUrl, '_blank');
       
        // navigate(`../report-emp` ,{state:{empId:params.row.empId,managerId:managerId}})
        //  window.open(`../report-emp`,'_blank')
    };
   
const handleSerchData=()=>{

if(employee !==null){
     fetchEmployee()
     setbackButton1(true)
}
else{
    toast.error("Please enter start date, end Date or empId ",{position:toast.POSITION.TOP_RIGHT})
   
  
}


    }

    const columns = [
       
        {
            field: 'EmployeeName',
            headerName: 'Employee Name',
            minWidth: 220,
            flex:2.5,
            headerClassName: 'table-header',
            valueGetter: getIdName
    
        },
        
        { 
            field: 'ManagerName',
             headerName: 'Manager Name', 
             minWidth: 210,
              flex:2.5,
             headerClassName:'table-header',
             valueGetter: getmanagerIdName
            },
           
            { 
                field: 'startDate',
               headerName: 'Start Date', 
               minWidth: 120,
                flex:1.5,
               headerClassName:'table-header',
               valueFormatter: params => 
               {
                let enddate=""
                if(params?.value!==null){
                 enddate=moment(params?.value).format("DD/MM/YYYY")
                return enddate
                }
             else{
               return null
             }
               }
            
              },
              { 
                field: 'endDate',
               headerName: 'End Date', 
               minWidth: 120,
                flex:1.5,
               headerClassName:'table-header',
               valueFormatter: params => 
               {
                let enddate=""
                if(params?.value!==null){
                 enddate=moment(params?.value).format("DD/MM/YYYY")
                return enddate
                }
             else{
               return null
             }
               }
            
              },
           
        {
            field: 'actions',
            headerName: 'View',
            minWidth: 80,
            flex:1.5,
            headerClassName: 'table-header',
            renderCell: (params) => {
                return(
               
               <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
               
                >
                    <IconButton variant="contained" color='error'>
                   <PreviewIcon  color='secondary' sx={{marginRight:"39px"}}/>
                  
                   </IconButton >
        
                </Box>
                )
            }
        }
    ];
    
    return hasAuthority(REPORTED_EMPLOYEES_PAGE_TITLE)? (
        isLoading?<Loading/>:
            <Box style={SerchingComponetsstyle.firstBox}>
             <Box style={SerchingComponetsstyle.SecondBox}>
                  <Typography  style={SerchingComponetsstyle.typographystyle}>REPORTING EMPLOYEES OF <span style={{color:"black",fontSize:"27px"}}>{emp1}</span> </Typography>
                 
                  {
  backButoon1 ?<Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
  onClick={()=>{setreload(!reload);setEmployee({
    "fromDate":helpFunction.DateReturnForDataFetch(),
    "toDate": dayjs().format("YYYY-MM-DD"),
    "empId": localStorage.getItem("id")
})}}
  startIcon={<ArrowBackIosNewIcon/>}>
back
 </Button>:<Grid style={{justifyContent:"center"}}>
                  <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
                    onClick={handleGoBack}
                    startIcon={<ArrowBackIosNewIcon/>}>
               back
                   </Button> 
          </Grid>
}
                  

                 </Box>
         
        <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

<form onSubmit={handleSerchData}> 


 
<Box style={SerchingComponetsstyle.Thirdbox}
  >
    <Grid container  style={SerchingComponetsstyle.gridContainerStyle}>
    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >

<TextField InputLabelProps={{ shrink: true }} style={SerchingComponetsstyle.textFieldStyle} type='date' 
value={employee.fromDate}
onChange={(e)=>{setEmployee({ ...employee,fromDate:e.target.value})}} 
label="From Date"></TextField>
         
      </Grid >
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>

<TextField InputLabelProps={{ shrink: true }} style={SerchingComponetsstyle.textFieldStyle} type='date' value={employee.toDate} onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} label="To Date"></TextField>
</Grid>   
     

{
    hasAuthority( REPORTING_EMPLOYEE_SHOW_EMP_ID)? <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
        
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
    </Grid >:null
}





     
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
                    rows={employees}
                    columns={columns}
                    onFilterModelChange={handlefilter}
                    getRowId={(employees) => employees.reportingManagerId}
                    initialState={{
                        ...employees.initialState,
                        pagination: { paginationModel: { pageSize: 8 } },
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
