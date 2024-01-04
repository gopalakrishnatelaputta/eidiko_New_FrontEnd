import { Autocomplete, Grid } from "@mui/material";
import {TextField} from "@mui/material";
import {Box} from "@mui/material";
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import { useEffect, useState } from "react";
import {Typography} from "@mui/material";
import {Container,Paper,Button} from "@mui/material";
import Swal from "sweetalert2";
import { helpFunction } from "../../../Components/HelperComponent/helpFunction";
import {Divider} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from "react-router";
import Loading from "../../../Components/LoadingComponent/Loading";
import AutoEmpSearch from "../../../Services/AutoEmpSearch/AutoEmpSearch";
import { EmployeeAccessLevelService } from "../../../Services/Employee-Access-Level-service/EmployeeAccessService";
import dayjs from "dayjs";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { NoAuth } from "../../../Components/HelperComponent/NoAuth";
import { hasAuthority } from "../../../Services/AccessLevel/AccessLevelService";
import { GlobalButton } from "../../../Components/stylecomponent/GlobalButton";
import { DropDownServices } from "../../../Services/DropDownServices/DropDownServices";
import { AccessLevelCreationPagesStyle } from "./AccessLevelPCreationPagesStyle";


export const  ACCESS_LEVEL_CREATE_WORKING_LOCATION_TITLE= "CREATE_WORKING_LOCATION"

export default  function AccessWorkInfo(props){


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



    const{state}=useLocation()
    const[empId,setEmpId]=useState(state.empId)
    const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
    const [endDate,setEndDate]=useState("")
    const[workingFrom,setWorkingFrom]=useState("")
    const[location,setLocation]=useState("")
   const[isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()

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
    EmployeeAccessLevelService.createWorkingLocationfromProfile(empId,startDate,endDate,workingFrom,location).then((res)=>{
       
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

const backbutton=useNavigate()
 const[managerId,setManagerId]=useState("")
 const [data, setData]=useState([]);
 const[records,setRecords]=useState();
 
 useEffect(()=>{
   AutoEmpSearch(records).then((res)=>{
     setData(res.data.result)
   })
     },[records])



    return hasAuthority(ACCESS_LEVEL_CREATE_WORKING_LOCATION_TITLE)?(
        isLoading ? <Loading/> :
        
<Box style={AccessLevelCreationPagesStyle.firstBox}>


<Box style={AccessLevelCreationPagesStyle.secondBox}>
                
                  <Typography style={AccessLevelCreationPagesStyle.TypographyStyle}>WORKING LOCATION</Typography>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={AccessLevelCreationPagesStyle.backButtonStyle} 
                 onClick={()=>{backbutton(`../employee-workingLocation-via-profile`,{state:{"empId":empId}})}}
                 startIcon={<ArrowBackIosNewIcon/>}>
                 back
                </Button>
                </Grid>
                 </Box>

<GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

<form onSubmit={workInfoHandle}>
                <Box style={AccessLevelCreationPagesStyle.thirdBoxStyle}>
                <Grid container  gap={1.8} style={AccessLevelCreationPagesStyle.gridContinerStyle}>
                <Grid item xs={12} style={AccessLevelCreationPagesStyle.gridItemStyle}>
                        <TextField label="Employee Id" value={empId} disabled style={AccessLevelCreationPagesStyle.textFieldStyle}></TextField>
                       
                        </Grid>

                        <Grid  item xs={12}  style={AccessLevelCreationPagesStyle.gridItemStyle}>
                         <TextField required className='outlined-basic-text-box' id="outlined-basic" label="Start Date" variant="outlined" style={AccessLevelCreationPagesStyle.textFieldStyle} type='date'
                                        value={startDate}
                                        onChange={(event) =>setstartDate(event.target.value)}
                                    />

                        </Grid>
                   
                     {
                        status==="click"?
                        <Grid container>
                        <Grid item xs={12}  style={AccessLevelCreationPagesStyle.gridItemStyle}>
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
                        <Grid item xs={12}  style={AccessLevelCreationPagesStyle.gridItemStyle}>
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
                  
                     <Grid item xs={12}  style={AccessLevelCreationPagesStyle.gridItemStyle}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={AccessLevelCreationPagesStyle.textFieldStyle} type='date'
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }


                      
                    
                        <Grid item xs={12}  style={AccessLevelCreationPagesStyle.gridItemStyle}>
                                <FormControl style={AccessLevelCreationPagesStyle.formcontrolStyle}>
                                    <InputLabel id="demo-simple-select-label">Work Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={wl}
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
                        <Grid item xs={12}  style={AccessLevelCreationPagesStyle.gridItemStyle}>
                         <FormControl style={AccessLevelCreationPagesStyle.formcontrolStyle}>
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

                            <Grid item xs={12}  style={AccessLevelCreationPagesStyle.gridItemStyle}>
                            <TextField value={other} 
                             style={AccessLevelCreationPagesStyle.textFieldStyle}
                            onChange={handleOther}
                            label="Other Location" required  placeholder="Enter Location" variant='outlined' 
                            fullWidth />
                            </Grid>:null

                        }
                    


                        <Grid item xs={12}  style={AccessLevelCreationPagesStyle.gridItemStyle}>
                            <Button  disableElevation type="submit" variant="contained" style={GlobalButton.OperationButton}>Submit</Button>
                        </Grid>

                       </Grid>


                        </Box>
            </form>


</Box>
    ):<NoAuth></NoAuth>



}