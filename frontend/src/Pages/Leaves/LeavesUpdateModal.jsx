import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Loading from "../../Components/LoadingComponent/Loading";
import { GlobalButton } from "../../Components/stylecomponent/GlobalButton";
import { LeaveDataCreationStyle } from "./LeavesComponentStyle";
import dayjs from "dayjs";
import { useState } from "react";
import { LeaveServices } from "../../Services/Leave-Service/LeaveServices";
import Swal from "sweetalert2";




export default function LeavesupdateModal(props){
    
    const func1=props.onClose
    const [isLoading,setIsLoading]=useState(false)
const [leaveStatusId,setLeaveStatusId]=useState(props.UpdateLeave.leaveStatusId)
    const[Leave,setLeave]=useState({
        "empId":props.UpdateLeave.empId,
        "leaveDate":props.UpdateLeave.leaveDate,
       "eStatus":props.UpdateLeave.estatus,
      })
      console.log(Leave);
const UpdateLeaveHandle=(e)=>{
  e.preventDefault()
    
  setIsLoading(true)
  LeaveServices.EmpLeaveUpdation(Leave,leaveStatusId).then((res)=>{
      if(res.status===200){
         
          setIsLoading(false)
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Leaves Data Updated Successfully",
              showConfirmButton: false,
              timer: 1500
          })
    
         func1()
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
          func1()
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
      func1()
  })

}

return(
    isLoading?<Loading/>:
    <Card style={LeaveDataCreationStyle.CardStyle}>
    <CardContent>
        <center>
        <Grid>
             <Typography style={LeaveDataCreationStyle.typographyStyle} >
             UPDATE LEAVES
             </Typography>
        </Grid>
        </center>
        <GlobalButton.GlobalDivider1/>
        <form onSubmit={UpdateLeaveHandle}>
          <Box style={LeaveDataCreationStyle.thirdBoxStyle}>
          <Grid container  style={LeaveDataCreationStyle.gridContainerStyle}> 
          
          <Grid item xs={12}  style={LeaveDataCreationStyle.gridItemStyle}>
            <TextField  style={LeaveDataCreationStyle.textFieldStyle} type="text" value={Leave.empId} label="EmployeeId" disabled>  

            </TextField>
          </Grid>


          <Grid item xs={12}  style={LeaveDataCreationStyle.gridItemStyle}>
                       
                       <FormControl  style={LeaveDataCreationStyle.FormControlstyle}>
                      <InputLabel id="demo-multiple-name-label">Leave Status</InputLabel>
                        <Select 
                         value={Leave.eStatus}
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
                    
        <Button  disableElevation sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} >UPDATE</Button>
     <Button  disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose}  variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                                                  
                    </Grid>



          </Grid>


            </Box>
</form>
</CardContent>
            </Card>
)

}