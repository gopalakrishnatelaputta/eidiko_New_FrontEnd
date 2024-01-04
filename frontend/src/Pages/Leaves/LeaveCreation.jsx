
import { Box,TextField,Typography,Paper,Grid,Container, Autocomplete, FormControl, MenuItem, Select, InputLabel} from '@mui/material';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '../../Components/LoadingComponent/Loading';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from "../../Components/HelperComponent/NoAuth";
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { LeaveDataCreationStyle } from './LeavesComponentStyle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { myAxios } from '../../Server/MyAxios';
import { LeaveServices } from '../../Services/Leave-Service/LeaveServices';

export const  LEAVE_DATA_CREATION_PAGE_TITLE= "LEAVE_DATA_CREATION_PAGE_79"



export default function LeavesCreationPage(props){
 const [isloading ,setIsLoading]=useState(false)
  const[Leave,setLeave]=useState({
    "empId":"",
    "leaveDate":dayjs().format("YYYY-MM-DD"),
   "eStatus":"",
   "modifiedBy":localStorage.getItem("id")
  })
const WarningMailHandle=(e)=>{
    e.preventDefault()
    
    setIsLoading(true)
    LeaveServices.EmpLeaveCreation(Leave).then((res)=>{
        if(res.status===200){
           
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Leave  Created Successfully",
                showConfirmButton: false,
                timer: 1500
            })
           setLeave(
            {
              "empId":"",
              "leaveDate":dayjs().format("YYYY-MM-DD"),
             "eStatus":"",
             "modifiedBy":localStorage.getItem("id")
            }
           )
           
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
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            }

        )

    })


}


 //AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();

useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })
    },[records])

    const backbutton=useNavigate()
    return hasAuthority(LEAVE_DATA_CREATION_PAGE_TITLE)?   (
        isloading ? <Loading/> :
        <Box style={  LeaveDataCreationStyle.firstbox}>
          <Box style={ LeaveDataCreationStyle.SecondBox}>
                
                <Typography   style={ LeaveDataCreationStyle.typographyStyle}>Create Leaves</Typography>
                <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={LeaveDataCreationStyle.backbuttonstyle} 
                 onClick={()=>{backbutton(`../All-employees-Leave-Report`)}}
                 startIcon={<ArrowBackIosNewIcon/>}>
                back
                </Button>
                </Grid>
                 </Box>

                 <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>



          <form 
          onSubmit={WarningMailHandle}
          >
            <Box style={LeaveDataCreationStyle.thirdBoxStyle}>
                
            <Grid container  style={LeaveDataCreationStyle.gridContainerStyle}>        
            
              <Grid item xs={12}  style={LeaveDataCreationStyle.gridItemStyle}>
                     <Autocomplete 
             Value={Leave.empId}
             onChange={(e,value)=>{
               if(value==null){

                 return setLeave({...Leave,empId:null})
               }
               let data=value.match("[0-9]*")
              return   setLeave({...Leave,empId:data[0]})

             }}

            style={LeaveDataCreationStyle.textFieldStyle}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                required
                              
                                 {...params} 
                                label='Employee Id'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                type='text'
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                        
                    </Grid>
                    <Grid item xs={12}  style={LeaveDataCreationStyle.gridItemStyle}>
                       
                       <FormControl  style={LeaveDataCreationStyle.FormControlstyle}>
                      <InputLabel id="demo-multiple-name-label">Leave Status</InputLabel>
                        <Select 
                         value={Leave.warningLevel}
                         onChange={(e)=>{setLeave({...Leave,eStatus:e.target.value})}}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-start"
                        name=""
                        label="Leave Status"
                        required 
                        >
                        
                        <MenuItem value="L">LEAVE</MenuItem>
                        <MenuItem  value="A">ABSENT</MenuItem>
                        <MenuItem value="C">COMPENSATORY OFF </MenuItem>
                       </Select>
              </FormControl>
                    </Grid >


            

            <Grid item xs={12}  style={LeaveDataCreationStyle.gridItemStyle}>
                       
            <TextField  InputLabelProps={{ shrink: true }} style={LeaveDataCreationStyle.textFieldStyle}  type='date' value={Leave.leaveDate}
   onChange={(e)=>{setLeave({ ...Leave,leaveDate:e.target.value})}} label="Leave Date"></TextField>
                    </Grid >
                   
                
                
                    <Grid xs={12} sm={12}  style={LeaveDataCreationStyle.gridItemStyle}>
                        <Button type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
            </form>
        <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
    </Box>

               


    ):<NoAuth></NoAuth>


}