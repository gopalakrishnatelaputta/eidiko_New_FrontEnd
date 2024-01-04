import { useEffect, useState } from "react"
import Loading from "../../Components/LoadingComponent/Loading"
import { Box, Button, Card, CardContent, Chip, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { GlobalButton } from "../../Components/stylecomponent/GlobalButton"
import { EmployeeAccessLevelGivenService } from "../../Services/EmployeeAccessLevelGivenService/EmployeeAccesslevelGivenService"
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { toast } from "react-toastify"
import { DropDownServices } from "../../Services/DropDownServices/DropDownServices"

export function AccessDeleteModal(props){

    const [locationdrop,setlocationdrop]=useState([])
    function fetchLocation(){
    DropDownServices.getAccessLevelDrop().then((res)=>{
        setlocationdrop(res.result)
       
    }).catch((err)=>{
    
    })
    }
    
    useEffect(()=>{
        fetchLocation()
    },[])
    let func1=props.onClose1
    const [authorities,setauthorities]=useState(props.DeleteData.authorities)
    const [access,setAccess]=useState({"empId":props.DeleteData.empId,"accessLvlId":""})

    const WarningMailHandle=(e)=>{
        e.preventDefault()
         setIsLoading(true)
       
         EmployeeAccessLevelGivenService.CreateAccessLevel(access).then((res)=>{

             if(res.status===200 && res.statusMessage==='success'){
                 setIsLoading(false)
                 toast.success(res.message,{
                    position: toast.POSITION.TOP_CENTER
                })
               setAccess({"empId":"","accessLvlId":""})
                func1()
             }
             else{
                 setIsLoading(false)
                 func1()
                 toast.error(res.message,{
                    position: toast.POSITION.TOP_CENTER
                })
             }
       
         }).catch((error)=>{
             setIsLoading(false)
             func1()
             toast.error(error.message,{
                position: toast.POSITION.TOP_CENTER
            })
       
         })
       
       }

    

    const [isLoading,setIsLoading]=useState(false)
    const [employeedata,setemployeedata]=useState({
        "empId":props.DeleteData.empId,
        "empName":props.DeleteData.empName,
    })

    const [button2,setbutton2]=useState(true)

    const handleDelete=(value,action)=>{
        setIsLoading(true)
        if (action === 'delete') {
            swal.fire({
                icon: "warning",
                iconColor:"#d50000",
                title: 'Do you want to delete this role ' + value,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                confirmButtonColor: '#2196F3',
                cancelButtonColor: '#d50000'
    
               
            })
    
            .then((result) => {
                setIsLoading(false)
                if (result.isConfirmed) {
                    EmployeeAccessLevelGivenService.DeleteAccesslevel(employeedata.empId,value).then((res)=>{
                        setIsLoading(false)
                        if(res.status===200){
                            swal.fire('Employee role is successfully removed', '', 'success')
                            setIsLoading(false)
                        }
                        else{
                            swal.fire("Employee role doesn't exist",'',"error")
                            setIsLoading(false)
                        }
                    })
                    
                }
            })
        
          
}

}






  return (isLoading?<Loading/>:
     
    <Card style={{ maxWidth: 400, padding: "13px 5px", margin: "0 auto" ,marginTop:"150px"}}>
                                <CardContent>


              
                                    <center>
                                        <Typography style={{fontSize:"25px"}} color="primary">Access Level</Typography>
                                        <GlobalButton.GlobalDivider/>
                                    <form onSubmit={ WarningMailHandle}>
                                    
                                        <Grid container spacing={1} >
                                            <Grid item xs={12} sx={{justifyContent:"center",display:"flex"}}>
                                            <TextField  type="number" label="Employee Id" required disabled variant='outlined'  value={employeedata.empId} style={{width:"350px",marginTop:"15px"}}></TextField>
                                            </Grid>
                                            <Grid item xs={12} sx={{justifyContent:"center",display:"flex"}}>
                                            <TextField  type="text" label="Employee Name" required disabled variant='outlined'  value={employeedata.empName} style={{width:"350px",marginTop:"15px"}}></TextField>
                                            </Grid>



                                            <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>

<FormControl sx={{display:'flex',width:350}}>
                                    <InputLabel id="demo-simple-select-label">Access Level</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="AccessLevel"
                                        name="AccessLevel"
                                      onChange={(e)=>{setAccess({...access,accessLvlId:e.target.value})}}
                                      value={access.accessLvlId}
                                    >
                                        {
                                            locationdrop.map(({accessLvlId,accessLvlName})=>{
                                                return(
                                                <MenuItem  key={accessLvlId}  value={accessLvlName}>{accessLvlName}</MenuItem>)
                                            })
                                        }
                                    </Select>
                                </FormControl>


                </Grid>


                                           
                                            <Grid item xs={12} sx={{display:'flex',
                                            justifyContent:'center',
                                            alignItems:'center'
                                        }}>
                                                <Button     sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained"
                                                 style={GlobalButton.OperationButton}>UPDATE</Button>

                                                <Button  disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained' 
                                                 style={GlobalButton.HaltButton}>Cancel</Button>
                                            </Grid>
                                            
                                          
                                        </Grid>
                                        </form>
                                        <GlobalButton.GlobalDivider/>
                                        <Grid item xs={12} sx={{justifyContent:"center",display:"flex",marginTop:"15px",marginBottom:"15px"}}>
                                            <Stack direction="row" spacing={1}>
                                          {
                                            authorities.map(({authority})=>{
                                                return(
                                                <Chip  key={authority} value={authority} label={authority}  onDelete={()=>handleDelete(authority,"delete")}></Chip>)
                                            })
                                          }

                                            </Stack>
    
                
                                            </Grid>
                                            <GlobalButton.GlobalDivider/>

                                    </center>
                                </CardContent>
    </Card>

)

}