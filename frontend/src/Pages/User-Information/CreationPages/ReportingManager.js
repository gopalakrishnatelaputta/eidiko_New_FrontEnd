

import Person3Icon from '@mui/icons-material/Person3';
import { Box,TextField,Typography,Paper,Grid,Container, Autocomplete} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import userServiceModule from '../../../Services/user-service/UserService';
import Swal from 'sweetalert2';
import { helpFunction } from '../../../Components/HelperComponent/helpFunction';
import {Divider} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';
import Loading from '../../../Components/LoadingComponent/Loading';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AutoEmpSearch from '../../../Services/AutoEmpSearch/AutoEmpSearch';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from "../../../Components/HelperComponent/NoAuth";
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { CreationPagesStyle } from './CreationPagesStyle';

export const  USER_CREATE_REPORTING_MANAGER_PAGE_TITLE= "REPORTING_MANAGER"

export default function ReportingManager(){
      //------EndDate
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
      //------------



    
    const[empId,setEmpId]=useState("")
    const[managerId,setManagerId]=useState("")
    const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
    const [endDate,setEndDate]=useState("")
    const [isloading ,setIsLoading]=useState(false)
    const navigate=useNavigate()
  


const reportingManagerHandle=(e)=>{
    e.preventDefault()
    
    setIsLoading(true)

    userServiceModule.reportingManager(empId,managerId,startDate,endDate).then((res)=>{
       

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
                title: res.data.message,
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
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            }

        )

    })

}

 //backbutton
 const backbutton=useNavigate()

 //AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();

useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })
    },[records])

    
    return hasAuthority(USER_CREATE_REPORTING_MANAGER_PAGE_TITLE)?   (
        isloading ? <Loading/> :
        <Box style={CreationPagesStyle.firstBox}>
<Box style={CreationPagesStyle.secondBox}>
                
                  <Typography style={CreationPagesStyle.TypographyStyle}>REPORTING MANAGER</Typography>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={CreationPagesStyle.backButtonStyle} 
                 onClick={()=>{backbutton("/user/reporting-manager-data")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>

       <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>

            <form onSubmit={reportingManagerHandle}>

            <Box style={CreationPagesStyle.thirdBoxStyle}>
                <Grid container spacing={1} gap={3}  style={CreationPagesStyle.gridContinerStyle}>

                
                    <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                     <Autocomplete 
             Value={managerId}
             onChange={(e,value)=>{
               if(value==null){

                 return setManagerId(null)
               }
               let data=value.match("[0-9]*")
              return  setManagerId(data[0])

             }}

            style={CreationPagesStyle.textFieldStyle}
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
                   
                    <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                       

              <TextField required value={startDate} onChange={(e)=>{setstartDate(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic1" label="Start Date" variant="outlined" style={CreationPagesStyle.textFieldStyle} type='date'
                                        
                                    />  

                    </Grid >
                    
                      {
                        status==="click"?
                        <Grid container>
                        <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>

                        <Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         
<label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>
                         </Grid>
                         </Grid>
                         :
                         <Grid container style={CreationPagesStyle.gridContinerStyle}>
                         <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
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
                  
                     <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={CreationPagesStyle.textFieldStyle} type='date'
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }
                   
                    <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                        <Button type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>Submit</Button>
                    </Grid>

                </Grid>
            </Box>
            </form>
    </Box>

               


    ):<NoAuth></NoAuth>


}