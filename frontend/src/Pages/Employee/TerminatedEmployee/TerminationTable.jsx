import React, { useEffect, useState } from 'react'
import { TerminationTableStyle } from './TerminatedEmployeeFormStyle'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Loading from '../../../Components/LoadingComponent/Loading'
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService'
import { NoAuth } from '../../../Components/HelperComponent/NoAuth'
import moment from 'moment'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton'
import { ResignedEmployee } from '../../../Services/employee-service/EmployeeService'
import CustomModal from '../../../Components/customModal/CustomModal'
import CustomDatagrid from '../../../Components/customDatagrid/CustomDatagrid'
import { toast } from 'react-toastify'
import {IconButton} from '@mui/material';
import { DataGridRowAndcolumnHeight, muiDatagrid_headerclassName } from '../../../Components/stylecomponent/forFirstDiv'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SerchingComponetsstyle } from '../../../Components/stylecomponent/SerchingComponetsStyle'
import TerminatedEmployeeForm from './TerminatedEmployeeForm'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TerminatedEmployeeUpdate from './TerminatedEmployeeUpdate'

function getempnameid(params) {
  return params.row?.empId+" -"+params.row?.empName
}





function getrowId(row){

  return row.resignedId
}

export const ALL_EMPLOYEE_TERMINATION_PAGE_TITLE=" ALL_EMPLOYEE_TERMINATION_765"

export default function TerminationTable() {
  const[termination,setTermination]=useState([])
  const[isLoading,setIsLoading]=useState(false)
  const[backButoon1,setbackButton1]=useState(false)
  const[reload,setreload]=useState(false)
  const [updateRE,setUpdateRE]=useState(false)
  const [updateData,setUpdateData]=useState()
  const handlefilter=()=>{
    setbackButton1(true)
  }
  const handleREUpdate=()=>{
    setUpdateRE(true)
  }
 
const rowhandle1=(params)=>{
  setUpdateData(params.row)
}
  
  const columns = [
    { 
      field: 'empId',
     headerName: 'Employee Name',
     minWidth: 100,
      flex:1.5,
     headerClassName:muiDatagrid_headerclassName,
     valueGetter:getempnameid
     
    },
  
    { 
    field: 'startDate',
     headerName: 'Start Date', 
     minWidth: 120,
      flex:1.5,
     headerClassName:muiDatagrid_headerclassName,
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
  
     
    },
    { 
     field: 'endDate',
     headerName: 'End Date', 
     minWidth: 120,
     flex:1.5,
     headerClassName:muiDatagrid_headerclassName,
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
        field: 'modifiedBy',
       headerName: 'Modified By',
       minWidth: 100,
        flex:1.5,
       headerClassName:muiDatagrid_headerclassName
       
      },
    
    { 
      field: 'modifiedDate',
     headerName: 'Modified Date', 
     minWidth: 120,
      flex:1.5,
     headerClassName:muiDatagrid_headerclassName,
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
  
     
    },
    { 
        field: 'comment',
       headerName: 'Comment',
       minWidth: 150,
        flex:2.0,
       headerClassName:muiDatagrid_headerclassName
       
      },
      {
        field: 'edit',
        headerName: 'Edit',
        minWidth: 90,
        flex:1.0,
        headerClassName: muiDatagrid_headerclassName,
        renderCell: (params) => {
            return (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <IconButton variant="contained" color='error'
                    >
                   <EditOutlinedIcon 
                   onClick={handleREUpdate}
                    color='secondary' sx={{marginRight:"39px"}}/>
                   </IconButton >
    
                </Box>
                
            );
        }
    }
]
function fetchTerminatedEmployee(){
  setIsLoading(true)

  ResignedEmployee.ResigedEmployeeData().then((res)=>{
            if(res.statusMessage==="success"){
                 setIsLoading(false)
                if(res.result.length==0){
                  toast.info("No Records Found ",{
                      position: toast.POSITION.TOP_RIGHT
                  })}
                  setTermination(res.result)
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

const[terminationmodal,setTerminationmodal]=useState(false)
useEffect(()=>{
fetchTerminatedEmployee()
setbackButton1(false)
},[terminationmodal,reload,updateRE])



   


  return hasAuthority(ALL_EMPLOYEE_TERMINATION_PAGE_TITLE)? (
    isLoading ? <Loading/>:
    <Box  sx={SerchingComponetsstyle.firstBox}>
      <Box style={SerchingComponetsstyle.SecondBox}>
        
                  <Typography variant='h6' style={SerchingComponetsstyle.typographystyle}>RESIGNED EMPLOYEES</Typography>
                  <Grid style={{justifyContent:"center"}}>
                  <Button variant='outlined'  
                  startIcon={<IndeterminateCheckBoxIcon/>}  
                  onClick={()=>{setTerminationmodal(!terminationmodal)}}
                  >
                        ADD RESIGNED EMPLOYEE
                </Button>

                <CustomModal modalopen={terminationmodal}  modalclose={()=>{setTerminationmodal(!terminationmodal)}} children={<TerminatedEmployeeForm onclose={()=>{setTerminationmodal(false)}}></TerminatedEmployeeForm>} />

                <CustomModal modalopen={updateRE}  modalclose={()=>{setUpdateRE(!updateRE)}} children={<TerminatedEmployeeUpdate updatedata2={updateData} onClose1={()=>{setUpdateRE(false)}}/>} />

                {
  backButoon1 ?<Button variant='outlined' 
  onClick={()=>{setreload(!reload)}}
  startIcon={<ArrowBackIosNewIcon/>}>
back
 </Button>:null
}

                </Grid>
                 </Box>
                 
                 
             <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

             
                 
                <Box  sx={SerchingComponetsstyle.DatagridBoxStyle}>


                <CustomDatagrid rows={termination} columns={columns} sortingfield={"modifiedDate"} rowclickhandle={rowhandle1} rowId={getrowId} filterchangehandle={handlefilter}/>
                
                 </Box>


        
                 
    </Box>

  ):<NoAuth></NoAuth>
}
