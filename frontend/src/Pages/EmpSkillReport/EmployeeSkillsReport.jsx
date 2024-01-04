import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {IconButton} from '@mui/material';
import { deleteSkill, getAllEmpSkillReport, getAllEmpSkillReportWithoutParameter, getEmpSkillReport } from '../../Services/SkillsReport/SkillsReportService';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import Loading from '../../Components/LoadingComponent/Loading';
import { DropDownServices } from '../../Services/DropDownServices/DropDownServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Swal from 'sweetalert2';
import { Delete } from '@mui/icons-material';

export const ALL_EMPLOYEES_SKILL_REPORT_PAGE_TITLE="PARTICULAR_EMPLOYEE_SKILL_REPORT_97"

// for cing name and id
function getempnameid(params) {
  return params.row?.empId+" -"+params.row?.empName
}
function getreviewedid(params) {
  return params.row?.modifiedBy+" -"+params.row?.modifiedByName
}

function totalSkilldays(params){
  //console.log(params.row.endDate);
  if(params.row.endDate !==null){
    const start = new Date(params.row.startDate).getTime();
  const end = new Date(params.row.endDate).getTime();

  const difference = Math.abs(end - start);

  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return days;
  }
 
  else{
    const start = new Date(params.row.startDate).getTime();
    const end = new Date().getTime();
    const difference = Math.abs(end - start);

  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return days;
  }

}





export const EmployeeSkillsReport = (props) => {
  //
  const onButtonClick = (e, row, action) => {
    e.stopPropagation();
    e.preventDefault();
    if (action === 'delete') {
          
        Swal.fire({
            icon: "warning",
            iconColor:"#d50000",
            title: 'Do you want to delete this ' + row.skillId,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#d50000'
  
            
        })
  
        .then((result) => {
            if (result.isConfirmed) {
              deleteSkill(row.skillId).then((res)=>{
                
                    if(res.status===200){
                        Swal.fire('Deleted!', '', 'success')
                        window.location.reload()
                    }
                    else{
                        Swal.fire("Review  doesn't exist",'',"error")
                    }
                })
                
            }
        })
    }
  };


  //

  const[backButoon1,setbackButton1]=useState(false)
  const[reload,setreload]=useState(false)
  const handlefilter=()=>{
    setbackButton1(true)
  }
  

 
   //empid getting
const handleRow=(params)=>{
  const employeeDetailsUrl=`../user/employee-skills-report?empId=${params.row.empId}&empName=${params.row.empName}`;
  window.open(employeeDetailsUrl, '_blank');
  // navigate(`../employee-skills-report`,{state:params.row.empId})
}
    const[skillsTable,setSkillsTable]=React.useState([])
     const[isLoading,setIsLoading]=useState(true)
    const navigate=useNavigate()
   //AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();
const [status,setStatus]=useState(false)
useEffect(()=>{
 AutoEmpSearch(records).then((res)=>{
   setData(res.data.result)
 })

   },[records])   
      
   const [locationdrop,setlocationdrop]=useState([])
   function fetchLocation(){
   DropDownServices.getTeamDrop().then((res)=>{
       setlocationdrop(res.result)
      
   }).catch((err)=>{
   
   })
   }
   
   useEffect(()=>{
       fetchLocation()
   },[])
   

// ----------------API-------------------
const[skills,setSkills]=useState({"skill":"All","working":"All"})
const[empId12,setEmpId12]=useState("")

useEffect(() => {
  fetchEmployeewithotparams()
  setbackButton1(false)
}, [reload]);

const fetchEmployee=(java,training)=>{
   setIsLoading(true)
  getAllEmpSkillReport(java,training).then(
    
      res => {   
          if (res.status == 200) {
              setIsLoading(false)
             if(res.result.length==0){
              toast.info("No data associated with this field "+java+" and "+training, {
                  position: toast.POSITION.TOP_RIGHT
              });
             }
              setSkillsTable(res.result)
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

const fetchEmployeewithotparams=()=>{
  setIsLoading(true)
  getAllEmpSkillReportWithoutParameter().then(
   
     res => {   
         if (res.status == 200) {
             setIsLoading(false)
            if(res.result.length==0){
             toast.info("No data found ", {
                 position: toast.POSITION.TOP_RIGHT
             });
            }
             setSkillsTable(res.result)
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

function fetchSkillsDataviaEmpid(empId){
 // setSkills({...skills,skill:"",working:""})

  setIsLoading(true)
  getEmpSkillReport(empId).then((res)=>{
    
    if(res.statusMessage==="Success"){
      if(res.result.length==0){
        toast.info("No Records Found  for "+empId,{
          position: toast.POSITION.TOP_RIGHT
      })}
      setSkillsTable(res.result)
      setIsLoading(false)
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
  setEmpId12("")
}


const handleSearchData=()=>{

  if(skills !==null && empId12.length==0){
      fetchEmployee(skills.skill,skills.working)
      setbackButton1(true)
  }
  else if(empId12.length>0){
    fetchSkillsDataviaEmpid(empId12)
    setbackButton1(true)
  }
  else{
      toast.error("Please enter skills and training ",{position:toast.POSITION.TOP_RIGHT})
    
    
  }
  
      }

      const columns=[
        {
            // empidwithname
            field: 'empidwithname',
           headerName: 'Employee Name', 
           minWidth: 200,
           flex:2.5,
           headerClassName:'table-header',
           valueGetter:getempnameid
        
          },
          {
            field: 'working',
           headerName: 'Working', 
           minWidth: 120,
           flex:1.5,
           headerClassName:'table-header'
        
          },
          {
            field: 'skills',
           headerName: 'Skills', 
           minWidth: 120,
           flex:1.5,
           headerClassName:'table-header'
        
          },
          {
            field: 'team',
           headerName: 'Team', 
           minWidth: 120,
           flex:1.5,
           headerClassName:'table-header'
        
          },
         
          { 
            field: 'startDate',
           headerName: 'Start Date',
           minWidth: 120,
           flex:1.5,
           headerClassName:'table-header',
           valueFormatter: params => 
           moment(params?.value).format("DD/MM/YYYY"),
           
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
               field: 'TotalNoOfDays',
              headerName: 'Skill Period(days)', 
              minWidth: 150,
             flex:1.5,
              headerClassName:'table-header',
             valueGetter:totalSkilldays
          
            },
      
      
      
            //
            {
              field: 'delete',
              headerName: 'Delete',
              minWidth: 80,
              flex:1.5,
              headerClassName: 'table-header',
              renderCell: (params) => {
      
                  return(
                      <Box sx={{
                           display: 'flex',
                           justifyContent: 'center'
                      }}>
                          <IconButton variant="contained" color='error'
                               onClick={(e) =>{ onButtonClick(e, params.row, 'delete')}}
                          ><Delete /></IconButton >
      
                      </Box>
                  )
                    } 
        }
      
            //
      ]


    return hasAuthority(ALL_EMPLOYEES_SKILL_REPORT_PAGE_TITLE)? (
      isLoading?<Loading></Loading>:
      <Box style={SerchingComponetsstyle.firstBox}>
              
                 <Box style={SerchingComponetsstyle.SecondBox}>
                
                  <Typography  style={SerchingComponetsstyle.typographystyle}>
                  ALL EMPLOYEES SKILLS </Typography>

                  <Grid style={{justifyContent:"center"}}>
                  <Button variant='outlined' className='style' 
                  style={{marginTop:"15px",marginRight:"9px"}} 
                  startIcon={<AcUnitIcon/>} onClick={()=>{navigate("/user/Skill-creation-via-reporting-manager")}} >
                            create skill
                </Button>

                {
  backButoon1 ?<Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
  onClick={()=>{setreload(!reload);setSkills({"skill":"All","working":"All"})}}
  startIcon={<ArrowBackIosNewIcon/>}>
back
 </Button>:null
}
                </Grid>


    </Box>
                 
          <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

 {/*--------------InputFields:------------------------------------ */}
<form onSubmit={handleSearchData}>

    <Box style={SerchingComponetsstyle.Thirdbox} >


    <Grid container style={SerchingComponetsstyle.gridContainerStyle}>

    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >
         <FormControl style={SerchingComponetsstyle.FormControlstyle} required name="Skills" >
            <InputLabel  id="demo-multiple-name-label" >Skills </InputLabel>
            <Select 
              value={skills.skill}
              onChange={(e)=>{setSkills({...skills,skill:e.target.value})}}
              labelId="demo-multiple-name-label"
              id="demo-multiple-start"
              label="Skills"
            >
                <MenuItem  key="All"  value="All">All</MenuItem>
                      {
                             locationdrop.map(({skillId,skillName})=>{
                                return(
                                <MenuItem  key={skillId}  value={skillName}>{skillName}</MenuItem>)
                               
                            })
                            
                        }
                       

            </Select>
         </FormControl>

         </Grid>

         <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >
        <FormControl style={SerchingComponetsstyle.FormControlstyle}  required name="Skills" >
            <InputLabel  id="demo-multiple-name-label" >Working </InputLabel>
            <Select 
              value={skills.working}
              onChange={(e)=>{setSkills({...skills,working:e.target.value})}}
              labelId="demo-multiple-name-label"
              id="demo-multiple-start"
              // name="month"
              label="Woking"
            >
              <MenuItem value="All">All</MenuItem>
               <MenuItem value="training">Training</MenuItem>
                <MenuItem  value="project">Project</MenuItem>
                <MenuItem value="T&M">T & M</MenuItem>
                <MenuItem value="Shadow">Shadow</MenuItem>
            </Select>
           
         </FormControl>

    </Grid>



        {/* <Box>
          <Grid container>
            <Grid item xs={12}>
            <center style={{marginTop:"10px"}}><Typography color="#2196F3" variant='h5'>OR</Typography></center>
            </Grid>

          </Grid>
        </Box> */}

        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >
        <center style={{marginRight:"10px",marginTop:"10px"}}><Typography color="#2196F3" variant='h5'>OR</Typography></center>
         <Autocomplete 
           Value={empId12}
           onChange={(e,value)=>{
             if(value==null){

               return setEmpId12("")
             }
             let data=value.match("[0-9]*")
            return setEmpId12(data[0])

           }}

        style={SerchingComponetsstyle.textFieldStyle}
        options={data.map((skills)=>skills.empId+"  ("+skills.userName+")")}
                            renderInput={(params)=> 
                            <TextField
                            
                             {...params} 
                            label='Employee Id'
                            className='outlined-basic-text-box'
                            id="outlined-basic" 
                          
                        onKeyUp={(e)=>{setRecords(e.target.value)}}
                        />}
        />
</Grid>
<Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >
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
                  rows={skillsTable}
                  columns={columns}
                  getRowId={(skillsTable) => skillsTable.skillId}      
                    initialState={{
                    ...skillsTable.initialState,
                    pagination: { paginationModel: { pageSize: 8 } },
                  }}
                  onRowClick={handleRow}
                  pageSizeOptions={[8,15,25,50,75]}
                  slots={{
                    toolbar: CustomToolBar,
                  }}
                 />


                 </Box>
              
</Box>
         
    ):<NoAuth></NoAuth>
}
