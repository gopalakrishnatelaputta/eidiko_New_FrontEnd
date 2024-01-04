

import Person3Icon from '@mui/icons-material/Person3';
import { Box,TextField,Typography,Paper,Grid,Container, Autocomplete} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import {Divider} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from 'react-router';
import Loading from '../../../Components/LoadingComponent/Loading';
import AutoEmpSearch from '../../../Services/AutoEmpSearch/AutoEmpSearch';
import { EmployeeAccessLevelService } from '../../../Services/Employee-Access-Level-service/EmployeeAccessService';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { NoAuth } from '../../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { AccessLevelCreationPagesStyle } from './AccessLevelPCreationPagesStyle';


export const  ACCESS_LEVEL_CREATE_REPORTING_MANAGER_TITLE= "CREATE_REPORTING_MANAGER"

export default function AccessReportingManager(props){
    const{state}=useLocation(props.state)
    const[empId,setEmpId]=useState(state.empId)
    const[managerId,setManagerId]=useState("")
    const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
    const [endDate,setEndDate]=useState("")
    const [isloading ,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const[visible,setVisible]=useState(false);
    const[status,setStatus]=useState("click")
    const handlelerButton=(e)=>{
  if(status==="click"){
   setVisible(true)
    setStatus("")
  }
  else if(status!==1){
  setVisible(false)
   setStatus("click")
  }
    }

const reportingManagerHandle=(e)=>{
    e.preventDefault()
    
    setIsLoading(true)
  
    EmployeeAccessLevelService.CreateReportingManagerFromProfile(empId,managerId,startDate,endDate).then((res)=>{
        if(res.status===201 && res.statusMessage==='success'){
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
            })
           
        }
        else{
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
            }
            )
        }

    }).catch((error)=>{
        setIsLoading(false)
        Swal.fire(
            {
                position: 'center',
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 1500
            }

        )

    })

}

 const backbutton=useNavigate()

const [data, setData]=useState([]);
const[records,setRecords]=useState();

useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })
    },[records])

    
    return hasAuthority(ACCESS_LEVEL_CREATE_REPORTING_MANAGER_TITLE)?(
        isloading ? <Loading/> :
        <Box style={AccessLevelCreationPagesStyle.firstBox}>
        <Box style={AccessLevelCreationPagesStyle.secondBox}>
                
                  <Typography style={AccessLevelCreationPagesStyle.TypographyStyle}>REPORTING MANAGER</Typography>

                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={AccessLevelCreationPagesStyle.backButtonStyle} 
                 onClick={()=>{backbutton(`../employee-reportingManager-via-profile`,{state:{"empId":empId}})}}
                 startIcon={<ArrowBackIosNewIcon/>}>
                back
                </Button>
                </Grid>
                 </Box>

        <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

            <form onSubmit={reportingManagerHandle}>

            <Box style={AccessLevelCreationPagesStyle.thirdBoxStyle}>
                <Grid container  gap={1.8} style={AccessLevelCreationPagesStyle.gridContinerStyle}>

                    <Grid item xs={12} style={AccessLevelCreationPagesStyle.gridItemStyle}>
                    <TextField label="Employee Id" value={empId} disabled style={AccessLevelCreationPagesStyle.textFieldStyle}></TextField>
                    
                    
                    </Grid>
                    <Grid item xs={12} style={AccessLevelCreationPagesStyle.gridItemStyle}>
  <Autocomplete 

Value={managerId}
onChange={(e,value)=>{
  if(value==null){

    return setManagerId("")
  }
  let data=value.match("[0-9]*")
 return  setManagerId(data[0])

}}
           style={AccessLevelCreationPagesStyle.textFieldStyle}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                               
                                required
                                
                                 {...params} 
                                label='ManagerId'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                
                                type='text'
                             
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                       
                    </Grid>
                   
                    <Grid item style={AccessLevelCreationPagesStyle.gridItemStyle}>
                       
              <TextField InputLabelProps={{shrink:true}} required value={startDate} onChange={(e)=>{setstartDate(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic1" label="Start Date" variant="outlined" style={AccessLevelCreationPagesStyle.textFieldStyle} type='date'
                                        />  
</Grid>
                      
                      {
                        status==="click"?
                        <Grid container>
                        <Grid item xs={12} style={AccessLevelCreationPagesStyle.gridItemStyle}>
                        <Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         
<label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>
                         </Grid>
                         </Grid>

                         :
                         <Grid container>
                        <Grid item xs={12} style={AccessLevelCreationPagesStyle.gridItemStyle}>
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         
<label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>
                         </Grid>
                         </Grid>

                      }

                   
               
                  { 
                  visible ?
                  
                     <Grid item xs={12} style={AccessLevelCreationPagesStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={AccessLevelCreationPagesStyle.textFieldStyle} type='date'
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }                   
                  

                   
                   
                    <Grid item xs={12} style={AccessLevelCreationPagesStyle.gridItemStyle}>
                        <Button type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton} >Submit</Button>
                    </Grid>

                </Grid>
            </Box>
            </form>
    </Box>

               


    ):<NoAuth></NoAuth>



}