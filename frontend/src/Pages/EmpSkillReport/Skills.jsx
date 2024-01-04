import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {IconButton} from '@mui/material';
import { getEmpSkillReport } from '../../Services/SkillsReport/SkillsReportService';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import Loading from '../../Components/LoadingComponent/Loading';
import EmployeeSkillUpdateModal from './EmployeeSkillUpdatemodal';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';


export const PARTICULAR_EMPLOYEE_SKILL_REPORT_PAGE_TITLE="PARTICULAR_EMPLOYEE_SKILL_REPORT_907"


function getempnameid(params) {
  return params.row?.empId+" -"+params.row?.empName
}
function getreviewedid(params) {
  return params.row?.modifiedBy+" -"+params.row?.modifiedByName
}


function totalSkilldays(params){
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

function doj(dateofjoining){

  return dayjs(dateofjoining).format("DD/MM/YYYY")
    }


    // NumberOfDaysCalculation
function totalwork(dateofjoining){
  const start = new Date(dateofjoining).getTime();
    const end = new Date().getTime();
    const difference = Math.abs(end - start);

  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return days;
}

export const Skills = (props) => {
const location=useLocation();
const queryParams= new URLSearchParams(location.search);
const param1Value=queryParams.get('empId');
const param2Value=queryParams.get('empName');

const [empId1,setEmpId1]=useState(param1Value)

const[totalDay,setTotalDays]=useState(0)
const [empskilldata1,setempskilldata1]=useState()
const rowhandle1=(params)=>{
  setempskilldata1(params.row)
}

const [dateOfJoining, setDateOfJoining]=useState("");
const {state}=useLocation(props.state)
const[empIdrm,setempidrm]=useState(state)

const[empId2,setempid2]=useState(localStorage.getItem("id"))
const[skillsTable,setSkillsTable]=React.useState([])
 const[isLoading,setIsLoading]=useState(true)
const [reportm,setreportm]=useState(false)
const handleRmOpen=()=>{
  setreportm(true)
}

      function fetchSkillsData(employeeId){
        setIsLoading(true)
        getEmpSkillReport(employeeId).then((res)=>{
          if(res.statusMessage==="Success"){
            setDateOfJoining(res.dateOfJoining)
            let day1=0
            for(let i=0;i<res.result.length;i++){
              if(res.result[i].endDate !==null){
                const start = new Date(res.result[i].startDate).getTime();
                const end = new Date(res.result[i].endDate).getTime();
              
                const difference = Math.abs(end - start);
              
                let days = Math.ceil(difference / (1000 * 60 * 60 * 24));
                day1=day1+days
                }
               
                else{
                  const start = new Date(res.result[i].startDate).getTime();
                  const end = new Date().getTime();
                  const difference = Math.abs(end - start);
                let days = Math.ceil(difference / (1000 * 60 * 60 * 24));
                day1=day1+days
                }
              setTotalDays(day1)
            }
            if(res.result.length==0){
              toast.info("No Records Found  for "+employeeId,{
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
      }
     

      React.useEffect(()=>{
        if(empId1 !==null){
          fetchSkillsData(empId1)
        }
        else if(empIdrm!==null){
          fetchSkillsData(empIdrm)
        }
        else{
          fetchSkillsData(empId2)
        }
      },[reportm])



   const history=useNavigate()
const handleGoBack = () =>{
    history(-1);

};

const columns=[
  {
      // empidwithname
      field: 'empidwithname',
     headerName: 'Employee Name', 
     minWidth: 200,
     flex:2,
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
    valueGetter:totalSkilldays,
   
   },
   
    {
      field: 'edit',
      headerName: 'Edit',
      minWidth: 90,
      flex:1.5,
      headerClassName: 'table-header',
      renderCell: (params) => {
          return (
              <Box sx={{
                  display: 'flex',
                  justifyContent: 'center'
              }}>
                  <IconButton variant="contained" color='error'
                  >
                 <EditOutlinedIcon 
                 onClick={handleRmOpen}
                  color='secondary' sx={{marginRight:"39px"}}/>
                  <Modal
                      sx={{overflow:"scroll"}}
                      open={reportm}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description">
                       <center> 
                        <EmployeeSkillUpdateModal skilldata2={empskilldata1} onClose1={()=>{setreportm(false)}}/>
                      </center>
                  </Modal>
                 </IconButton >
  
              </Box>
              
          );
      }
  }


  
]


    return hasAuthority(PARTICULAR_EMPLOYEE_SKILL_REPORT_PAGE_TITLE) ?(
      isLoading?<Loading></Loading>:
      <Box style={SerchingComponetsstyle.firstBox}>
               
                
                 <Box style={SerchingComponetsstyle.SecondBox}>
                
                  
                {param2Value!==null?
                   <Typography  style={SerchingComponetsstyle.typographystyle}>
                   SKILLS OF <span style={{color:"black"}}>{param2Value}</span></Typography>:<Typography  style={SerchingComponetsstyle.typographystyle}>
                    EMPLOYEE SKILLS </Typography>
                }

                {
                  empIdrm !==null? <Grid style={{justifyContent:"center"}}>
                  <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle} 
                      onClick={handleGoBack}
                      startIcon={<ArrowBackIosNewIcon/>}>
                 back
                     </Button> 
                     </Grid>:null
                }

</Box>

          <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>


          <Box sx={{display:"flex",marginLeft:"15px",marginRight:'15px'}}>
<Grid container style={{display:"flex",justifyContent:'space-between'}}>
<Grid item xs={5.8} style={{display:"flex"}}>
<Typography color="#2196F3">Date of Joining:-<span  style={{color:"black"}}>{doj(dateOfJoining)}</span></Typography>
</Grid>
<Grid item xs={3.1}  style={{display:"flex",justifyContent:"center"}}>
<Typography  color="#2196F3">Total Worked Days:-<span style={{color:"black"}}>{totalwork(dateOfJoining)}</span></Typography>
</Grid>
<Grid item xs={3.1}  style={{display:"flex",justifyContent:"flex-end"}}>
<Typography  color="#2196F3"> Total Skill  Period:-<span style={{color:"black"}}>{totalDay}</span></Typography>
</Grid>
</Grid>
</Box>


         <Box style={SerchingComponetsstyle.DatagridBoxStyle}>
                 <DataGrid
                  rows={skillsTable}
                  columns={columns}
                  getRowId={(skillsTable) => skillsTable.skillId}      
                    initialState={{
                    ...skillsTable.initialState,
                    pagination: { paginationModel: { pageSize: 8 } },
                  }}
                  pageSizeOptions={[8,15,25,50,75]}
                  onRowClick={rowhandle1}
                 />
                 </Box>


          </Box>
    ):<NoAuth></NoAuth>
}
