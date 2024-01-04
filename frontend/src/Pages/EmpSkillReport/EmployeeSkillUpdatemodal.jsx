import { Autocomplete, Box, Button, Card, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { UpdateEmployeeSkillReport, createSkillsReport } from '../../Services/SkillsReport/SkillsReportService';
import Loading from '../../Components/LoadingComponent/Loading';
import { useNavigate } from 'react-router';
import { DropDownServices } from '../../Services/DropDownServices/DropDownServices';
import { EmployeeSkillUpdateModalStyle } from './EmployeeSkillReportStyle';
import { TeamName } from '../../Components/HelperComponent/HelperText';
import Notification from '../../Components/HelperComponent/Notification';



export default function EmployeeSkillUpdateModal(props) {


const [skilldata3,setskilldata3]=useState(props.skilldata2)
let func1=props.onClose1
const textfield1 = { width: 400 }
const[isLoading,setIsLoading]=useState(false)
 
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


    const [employee, setEmployee] = useState({
        "empId": skilldata3.empId,
        "startDate": skilldata3.startDate,
        "endDate": skilldata3.endDate,
        "working": skilldata3.working,
        "skills": skilldata3.skills,
        "team": skilldata3.team,
       // "modifiedBy":localStorage.getItem("id"),
         
    });
    const [other,setOther]=useState("")
    const [other1,setother1]=useState("")
    const[company,setCompany]=useState("Eidiko Systems Integrators")
    const[company1,setCompany1]=useState("")
    const handleOther=(e)=>{
        setOther(e.target.value)
      
    }
    useEffect(()=>{
        setEmployee({...employee,skills:other})
    },[other])
    useEffect(()=>{
        setEmployee({...employee,team:company})
        if(employee.working==="Project" || employee.working==="T&M" || employee.working==="Shadow"){
            setEmployee({...employee,team:skilldata3.team}) 
        }
    },[company,company1])

const [skillId,setskillId]=useState(skilldata3.skillId)


    const handleSubmit=(event)=>{
        event.preventDefault();
         setIsLoading(true)
         if(employee.endDate !==null){
            if(new Date(employee.startDate)>new Date(employee.endDate)){
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: "End Date Should Be Greater than Start Date",
                    showConfirmButton: false,
                    timer: 1500
                   
                })
                setIsLoading(false)
                return
             }
         }
        UpdateEmployeeSkillReport(skillId,employee).then(
            res => {
                 if (res.status === 201 && res.statusMessage === "Success") {
                      setIsLoading(false)
                     Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: res.message,
                         showConfirmButton: false,
                         timer: 1500
                     })
                     func1()
                 } 
                 else {
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
                 func1()
             }
         )
         .catch(err => {
            func1()
              setIsLoading(false)
             Swal.fire(
                 {
 
                     position: 'center',
                     icon: 'error',
                     title: err.response.data.message,
                     showConfirmButton: false,
                     timer: 1500
                 }
 
             )
         })

         setCompany("Eidiko Systems Integrators")
         setCompany1("")
         setother1("")
         setOther("")
    }
const history=useNavigate()
    const handleGoBack = () =>{
        history(-1);

    };

    const[toggle,settoggle]=useState(false);
    const[text,settext]=useState(TeamName)


  return (
    isLoading?<Loading></Loading>:

    <Card style={EmployeeSkillUpdateModalStyle.FirstBox}>

       <Box style={EmployeeSkillUpdateModalStyle.secondBox}>
        
       <center> <Typography  style={EmployeeSkillUpdateModalStyle.TypographyStyle}>UPDATE SKILL</Typography></center>
            </Box>

            <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>


                    <form onSubmit={handleSubmit}>

                        <Box  style={EmployeeSkillUpdateModalStyle.thirdBoxStyle}>

                            <Grid container  gap={1.8}  style={EmployeeSkillUpdateModalStyle.gridContinerStyle}>


                            <Grid item xs={12}  style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
                     <TextField label="employee Id" value={employee.empId}  style={EmployeeSkillUpdateModalStyle.textFieldStyle} disabled></TextField>
                        
                    </Grid>
 <Grid item xs={12}  style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
 <FormControl  style={EmployeeSkillUpdateModalStyle.formcontrolStyle}  required name="Skills" >
            <InputLabel  id="demo-multiple-name-label" >Working </InputLabel>
            <Select 
              value={employee.working}
              onChange={(e)=>{setEmployee({
                ...employee,working:e.target.value})}}
              labelId="demo-multiple-name-label"
              id="demo-multiple-start"
              label="Woking"
            >
               <MenuItem value="Training">Training</MenuItem>
                <MenuItem  value="Project">Project</MenuItem>
                <MenuItem value="T&M">T & M</MenuItem>
                <MenuItem value="Shadow">Shadow</MenuItem>
            </Select>
           
         </FormControl>

 </Grid>
                                        
            {
                            employee.working==="Training"  || company1==="Training"?

                            <Grid item xs={12} style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
                            <TextField value={company} 
                            onChange={(e)=>{setCompany(e.target.value)}}
                            label="Company Name" required   variant='outlined' sx={{marginTop:"13px"}}
                            fullWidth style={EmployeeSkillUpdateModalStyle.textFieldStyle}/>
                            </Grid> : <Grid item xs={12} style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
                                           
                                            <TextField 
                                          
                                          style={EmployeeSkillUpdateModalStyle.textFieldStyle}
                                            required
                                            value={employee.team}
                                            label="Company"
                                            placeholder='Company Name'
                                            className='outlined-basic-text-box'
                                            id="outlined-basic"
                                            onClick={(e)=>{settoggle(!toggle)}}

                                            type='text'
                                            onChange={(event)=>setEmployee({

                                                ...employee,team:event.target.value

                                            })}></TextField>

                                         </Grid>

                        }

<Notification toggle={toggle} text={text}></Notification>



                                         <Grid item xs={12}  style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
 <FormControl  style={EmployeeSkillUpdateModalStyle.formcontrolStyle}  required name="Skills" >
            <InputLabel  id="demo-multiple-name-label" >Skills </InputLabel>
            <Select 
              value={employee.skills}
              onChange={(e)=>{setother1(e.target.value);setEmployee({
                ...employee,skills:e.target.value

            })}}
              labelId="demo-multiple-name-label"
              id="demo-multiple-start"
              label="Skills"
            >
                      {
                             locationdrop.map(({skillId,skillName})=>{
                                return(
                                <MenuItem  key={skillId}  value={skillName}>{skillName}</MenuItem>)
                               
                            })
                            
                        }
                         <MenuItem  key="Others"  value="Others">Others</MenuItem>

            </Select>
         </FormControl>
                                         </Grid>
                                         {
                            employee.skills==="Others"  || other1==="Others"?

                            <Grid item xs={12}  style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
                            <TextField value={other} 
                            onChange={handleOther}
                            label="Other Skills" required  placeholder="Enter Skils" variant='outlined' sx={{marginTop:"13px"}}
                            fullWidth   style={EmployeeSkillUpdateModalStyle.textFieldStyle}/>
                            </Grid>:null

                        }

                                       
                                    <Grid item xs={12}  style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
                                    

                                    <TextField InputLabelProps={{ shrink: true }}  
                                    required className='outlined-basic-text-box' id="outlined-basic" label=" Start Date" variant="outlined"   style={EmployeeSkillUpdateModalStyle.textFieldStyle} type='date'
                                        value={employee.startDate}
                                        onChange={(event) => setEmployee({
                                            ...employee, startDate: event.target.value
                                        })}
                                    />

                                </Grid >

                                <Grid item xs={12}  style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
                                    

                                    <TextField InputLabelProps={{ shrink: true }}  
                                   className='outlined-basic-text-box' id="outlined-basic" 
                                    label=" End Date" variant="outlined"  style={EmployeeSkillUpdateModalStyle.textFieldStyle} type='date'
                                        value={employee.endDate}
                                        onChange={(event) => setEmployee({
                                            ...employee, endDate: event.target.value
                                        })}
                                    />

                                </Grid >

                                <Grid item xs={12}  style={EmployeeSkillUpdateModalStyle.gridItemStyle}>
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>UPDATE</Button>

                        <Button  disableElevation  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
                    </Grid>
                   





                            </Grid>



                        </Box>

                    </form>

                
            <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
           
    </Card> )
}

