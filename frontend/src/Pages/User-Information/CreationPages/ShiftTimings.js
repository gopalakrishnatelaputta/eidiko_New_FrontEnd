
import { Box,Container,Typography } from '@mui/material';
import {Paper,Grid} from '@mui/material';
import {Checkbox} from '@mui/material';
import {FormControl,FormLabel,FormGroup,FormControlLabel} from '@mui/material';
import {InputLabel} from '@mui/material';
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
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
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { hasAuthority } from '../../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from "../../../Components/HelperComponent/NoAuth";
import { GlobalButton } from '../../../Components/stylecomponent/GlobalButton';
import { ShiftTimingCreationPagesStyle } from './CreationPagesStyle';
import Notification from '../../../Components/HelperComponent/Notification';
import { ShiftHour } from '../../../Components/HelperComponent/HelperText';

export const  USER_CREATE_SHIFT_TIMING_PAGE_TITLE= "SHIFT_TIMING"



export default function ShiftTimings(){
 

  const[toggle,settoggle]=useState(false);
  const[text,settext]=useState( ShiftHour)
  
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


const navigate=useNavigate()
 
    const minute1=["00",15,30,45,60]


    const[checkValue,setCheckValue]=useState([])
    const[startTime,setStartTime]=useState({"startHour":"","startMinute":""})
    const[endTime,setEndTime]=useState({"endHour":"","endMinute":""})
    const getime11=(e)=>{setStartTime({...startTime, [e.target.name]: e.target.value})}
    const getTime12=(e)=>{setEndTime({...endTime, [e.target.name]: e.target.value})}
    const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
    const [endDate,setEndDate]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    const [message,setMessage]=useState("")

      const handlechange=(e)=>{
        const { value, checked } = e.target;

        let arr1=checkValue
        if(checked){
          arr1.push(value)
          setCheckValue(arr1)

        }
        else{
       arr1=arr1.filter((e)=>e!==value)
        setCheckValue(arr1)
        }
      }
    
      const [state, setState] =useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    

      const shiftTimingsHandle=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        let startTime3=startTime.startHour+":"+startTime.startMinute+":"+"00"
        let endTime3=endTime.endHour+":"+endTime.endMinute+":"+"00"


        if(checkValue.length===2){

        userServiceModule.shiftTimingsService(checkValue,startDate,endDate,startTime3,endTime3).then((res)=>{
    
          if(res.status===200 && res.data.statusMessage==='success' ){
            setIsLoading(false)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
              open:true
          })
           // setMessage(res.data.message)
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
      else if(checkValue.length===0){
        setIsLoading(false)

        toast.error("please select  week off",{position:toast.POSITION.TOP_RIGHT})
      }
      else if(checkValue.length===1){
        setIsLoading(false)
        toast.error("You need to select atleast 2 week off",{position:toast.POSITION.TOP_RIGHT})

      }
      else{
        setIsLoading(false)
        toast.error("you can select maximum 2 week off",{position:toast.POSITION.TOP_RIGHT})
      }

      

      }
       //backbutton
 const backbutton=useNavigate()

return hasAuthority(USER_CREATE_SHIFT_TIMING_PAGE_TITLE) ? (
  isLoading ? <Loading/> :
    <Box style={ShiftTimingCreationPagesStyle.firstBox}>

    <Box style={ShiftTimingCreationPagesStyle.secondBox}>
                
                 <Typography  style={ShiftTimingCreationPagesStyle.TypographyStyle}>SHIFT TIMING</Typography>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={ShiftTimingCreationPagesStyle.backButtonStyle} 
                 onClick={()=>{backbutton("/user/employee-shift-timing-data")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
 
 <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>


           <form onSubmit={shiftTimingsHandle}>
                <Box style={ShiftTimingCreationPagesStyle.thirdBoxStyle} >
                <Grid container  gap={2}  style={ShiftTimingCreationPagesStyle.gridContinerStyle}>

                <Grid item xs={12} style={ShiftTimingCreationPagesStyle.gridContinerStyle}>

         <FormControl component="fieldset">     
        <FormLabel component={"center"} >
        <Typography variant='h5' color="#2196F3" >Week off</Typography>
        </FormLabel>  

        <FormGroup id="check-box-data" aria-label="position" row  >
      
        <FormControlLabel
          control={<Checkbox />}
          label="Mon"
          name="weekoff"
          value="2"
          onChange={handlechange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Tue"
          name="weekoff"
          value="3"
          onChange={handlechange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Wed"
          name="weekoff"
          value="4"
          onChange={handlechange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Thur"
          name="weekoff"
          value="5"
          onChange={handlechange}
        />
         <FormControlLabel
          control={<Checkbox />}
          label="Fri"
          name="weekoff"
          value="6"
          onChange={handlechange}
        />
         <FormControlLabel
          control={<Checkbox />}
          label="Sat"
          name="weekoff"
          value="7"
          onChange={handlechange}
        />
         <FormControlLabel
          control={<Checkbox />}
          label="Sun"
          name="weekoff"
          value="1"
          onChange={handlechange}
        />
      </FormGroup>

    </FormControl>
   </Grid>
   {message.length !==0 ? <p style={{ color: "red", fontSize: "19px" }}>{message}</p>:null}

   <Grid item xs={12} style={ShiftTimingCreationPagesStyle.gridItemStyle}>
    <TextField className='outlined-basic-text-box' id="outlined-basic" label="Start Date" variant="outlined" style={ShiftTimingCreationPagesStyle.textFieldStyle} type='date' value={startDate} onChange={(event) =>setstartDate(event.target.value)} />
     </Grid >
    
   
                      
                      {
                        status==="click"?
                        <Grid container>
                        <Grid item xs={12} style={ShiftTimingCreationPagesStyle.gridItemStyle}>
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
                         <Grid item xs={12} style={ShiftTimingCreationPagesStyle.gridItemStyle}>
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>

</Grid> </Grid>
                      }
                    

                   
                  
                  { 
                  visible ?
                  
                     <Grid item xs={12} style={ShiftTimingCreationPagesStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={ShiftTimingCreationPagesStyle.textFieldStyle} type='date'
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }



     <Grid item xs={12} style={ShiftTimingCreationPagesStyle.gridItemStyle}>


<Box style={ShiftTimingCreationPagesStyle.shiftStartAndEndBoxStyle}>

<Typography variant='h6'>Shift Start</Typography>

<Grid container style={ShiftTimingCreationPagesStyle.gridContinerStyle}>
  <Grid item xs={6} style={ShiftTimingCreationPagesStyle.gridItemStyle}> 

   <TextField   onClick={(e)=>{settoggle(!toggle)}} style={ShiftTimingCreationPagesStyle.TextFieldOfShiftStartAndEndBoxStyle} required name="startHour"  value={startTime.startHour} onChange={getime11} label="Hour" type="number" placeholder='Hour Format 24:00'  
        InputProps={{ inputProps: { max:23,min:0} }} ></TextField> 
       
  </Grid>
  <Grid item xs={6} style={ShiftTimingCreationPagesStyle.gridItemStyle}> 

  <FormControl style={ShiftTimingCreationPagesStyle.FormControlOfShiftStartAndEndBoxStyle}>
<InputLabel id="demo-multiple-name-label">Minute</InputLabel>
        <Select 
        value={startTime.startMinute} 
         onChange={getime11}
          labelId="demo-multiple-name-label"
          id="demo-multiple-start"
          name="startMinute"
          label="Minute"
          required
        >
          {minute1.map((minute1) => (
            <MenuItem
              key={minute1}
              value={minute1}
            >
              {minute1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  </Grid>

</Grid>
 
   

   </Box>
   </Grid>
{/*  this grid for shift end time */}

<Grid item xs={12} style={ShiftTimingCreationPagesStyle.gridItemStyle}>
    <Box style={ShiftTimingCreationPagesStyle.shiftStartAndEndBoxStyle}>
      <Typography variant='h6'>Shift End</Typography>
  <Grid container style={ShiftTimingCreationPagesStyle.gridContinerStyle}>
  <Grid item xs={6} style={ShiftTimingCreationPagesStyle.gridItemStyle}> 
  <TextField  onClick={(e)=>{settoggle(!toggle)}}  className='outlined-basic-text-box' id="outlined-basic2"  required name="endHour" value={endTime.endHour} onChange={getTime12} label="Hour" placeholder='Hour Format 24:00'
          type="number"  InputProps={{ inputProps: { max:23,min:0} }} style={ShiftTimingCreationPagesStyle.TextFieldOfShiftStartAndEndBoxStyle}></TextField>
   
</Grid>
<Grid item xs={6} style={ShiftTimingCreationPagesStyle.gridItemStyle}> 
<FormControl style={ShiftTimingCreationPagesStyle.FormControlOfShiftStartAndEndBoxStyle}>

<InputLabel id="demo-multiple-name-label">Minute</InputLabel>
        <Select
        label="Minute"
        required
        name="endMinute"
        value={endTime.endMinute}
          labelId="demo-multiple-name-label"
          id="demo-multiple-end"
          onChange={getTime12} >
          {minute1.map((minute2) => (
            <MenuItem
              key={minute2}
              value={minute2}
            >
              {minute2}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
         
         </Grid>

</Grid>
     
   </Box>
   
    </Grid>
    <Notification toggle={toggle} text={text}></Notification>
    <Grid item xs={12} style={ShiftTimingCreationPagesStyle.gridItemStyle}>
                            <Button  disableElevation type="submit" variant="contained" style={GlobalButton.OperationButton}>Submit</Button>
                        </Grid>
               </Grid>



</Box>
</form>


</Box>
):<NoAuth></NoAuth>


}