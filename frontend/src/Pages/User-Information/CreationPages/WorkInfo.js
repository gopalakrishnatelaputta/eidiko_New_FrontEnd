import { Autocomplete, Grid } from "@mui/material";
import {TextField} from "@mui/material";
import { LocalizationProvider,TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {Box} from "@mui/material";
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import { useEffect, useState } from "react";
import {Typography} from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import {Container,Paper,Button} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import userServiceModule from "../../../Services/user-service/UserService";
import Swal from "sweetalert2";
import { helpFunction } from "../../../Components/HelperComponent/helpFunction";
import {Divider} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router";
import Loading from "../../../Components/LoadingComponent/Loading";
import AutoEmpSearch from "../../../Services/AutoEmpSearch/AutoEmpSearch";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { hasAuthority } from "../../../Services/AccessLevel/AccessLevelService";
import { NoAuth } from "../../../Components/HelperComponent/NoAuth";
import { GlobalButton } from "../../../Components/stylecomponent/GlobalButton";
import { DropDownServices } from "../../../Services/DropDownServices/DropDownServices";
import { CreationPagesStyle } from "./CreationPagesStyle";


export const  USER_CREATE_WORKING_LOCATION_PAGE_TITLE= "WORKING_LOCATION"



export default  function WorkInfo(){

 const [locationdrop,setlocationdrop]=useState([])
function fetchLocation(){
DropDownServices.getClientLocation().then((res)=>{
    setlocationdrop(res.result)
   
}).catch((err)=>{

})
}

useEffect(()=>{
    fetchLocation()
},[])

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
    const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
    const [endDate,setEndDate]=useState("")
    const[workingFrom,setWorkingFrom]=useState("")
    const[location,setLocation]=useState("")
   const[isLoading,setIsLoading]=useState(false)

   const [other,setOther]=useState("")
   const [other1,setother1]=useState("")
   const handleOther=(e)=>{
       setOther(e.target.value)
   }
   useEffect(()=>{
   setLocation(other)
},[other])


    
const workinFromHandle=(e)=>{
    setWorkingFrom(e.target.value)
}
    
   const workInfoHandle=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(endDate)
    userServiceModule.workingLocation(empId,startDate,endDate1,workingFrom,location).then((res)=>{
       
        if(res.status===201 && res.statusMessage==='success' ){
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
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            }

        )
    })
setLocation("")
   } 

//backbutton
const backbutton=useNavigate()
 //AutoComplete
 const[managerId,setManagerId]=useState("")
 const [data, setData]=useState([]);
 const[records,setRecords]=useState();
 
 useEffect(()=>{
   AutoEmpSearch(records).then((res)=>{
     setData(res.data.result)
   })
     },[records])




    return hasAuthority(USER_CREATE_WORKING_LOCATION_PAGE_TITLE)? (
        isLoading ? <Loading/> :
        
<Box style={CreationPagesStyle.firstBox}>


<Box style={CreationPagesStyle.secondBox}>
               
                  <Typography  style={CreationPagesStyle.TypographyStyle}>WORKING LOCATION</Typography>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={CreationPagesStyle.backButtonStyle} 
                 onClick={()=>{backbutton("/user/employee-work-location-data")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
<GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>

     <form onSubmit={workInfoHandle}>
                <Box style={CreationPagesStyle.thirdBoxStyle}>
                <Grid container spacing={1} gap={3} style={CreationPagesStyle.gridContinerStyle}>
                

                        <Grid  item xs={12} style={CreationPagesStyle.gridItemStyle}>
                         <TextField required className='outlined-basic-text-box' id="outlined-basic" label="Start Date" variant="outlined" style={CreationPagesStyle.textFieldStyle} type='date'
                                        value={startDate}
                                        onChange={(event) =>setstartDate(event.target.value)}
                                    />

                        </Grid>

                       
                      {
                        status==="click"?
                       <Grid container style={CreationPagesStyle.gridContinerStyle}>
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
                         <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>

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
                                <FormControl style={CreationPagesStyle.formcontrolStyle}>
                                    <InputLabel id="demo-simple-select-label">Work Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="WorkLocation"
                                        name="workingfrom"
                                      onChange={workinFromHandle}
                                      value={workingFrom}

                                    >
                                        <MenuItem value="CLIENT_LOCATION" >CLIENT_LOCATION</MenuItem>
                                        <MenuItem   value="WFO">WFO</MenuItem>
                                        <MenuItem   value="WFH">WFH</MenuItem>
                                    </Select>
                                </FormControl>
                        </Grid>

                         {workingFrom==="CLIENT_LOCATION" ? 
                        <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>

                <FormControl style={CreationPagesStyle.formcontrolStyle}>
                                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Location"
                                        name="loccation"
                                      onChange={(e)=>{setother1(e.target.value);setLocation(e.target.value)}}
                                      value={location}
                                    >
                                        {
                                            locationdrop.map(({clientLocationId,location})=>{
                                                return(
                                                <MenuItem  key={clientLocationId}  value={location}>{location}</MenuItem>)
                                            })
                                        }
                                         <MenuItem  key="Others"  value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>

        
                        </Grid>

                        :null
 
                        }
                             
                             {
                            location==="Others"  || other1==="Others"?

                            <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                            <TextField value={other} 
                            onChange={handleOther}
                            label="Other Location" required  placeholder="Enter Location" variant='outlined'
                            style={CreationPagesStyle.textFieldStyle}/>
                            </Grid>:null

                        }

                        <Grid item xs={12} style={CreationPagesStyle.gridItemStyle}>
                            <Button  disableElevation type="submit" variant="contained" style={GlobalButton.OperationButton}>Submit</Button>
                        </Grid>

                       </Grid>


                        </Box>
            </form>


</Box>
    ):<NoAuth></NoAuth>



}