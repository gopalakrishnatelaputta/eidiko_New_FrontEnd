import { Autocomplete, Box, Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import { DropDownServices } from '../../Services/DropDownServices/DropDownServices'
import Loading from '../../Components/LoadingComponent/Loading'
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch'
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService'
import { NoAuth } from '../../Components/HelperComponent/NoAuth'
import { useNavigate } from 'react-router'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { EmployeeAccessLevelGivenService } from '../../Services/EmployeeAccessLevelGivenService/EmployeeAccesslevelGivenService'
import Swal from 'sweetalert2'


export const EMPLOYEE_ACCESS_CREATION_PAGE_TITLE=" EMPLOYEE_ACCESS_CREATION_89"

export const EmpAccessModal = (props) => {
 //AutoComplete
 const [data, setData]=useState([]);
 const[records,setRecords]=useState();
 
 useEffect(()=>{
   AutoEmpSearch(records).then((res)=>{
     setData(res.data.result)
   })
     },[records])

     
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
    
    const textfield1={width: 400}
   const [access,setAccess]=useState({"empId":"","accessLvlId":""})
   const [isloading ,setIsLoading]=useState(false)
   const history=useNavigate();
    const handleGoBack = () =>{
        history(-1);
    };

const WarningMailHandle=(e)=>{
 e.preventDefault()
  setIsLoading(true)

  EmployeeAccessLevelGivenService.CreateAccessLevel(access).then((res)=>{
      if(res.status===200 && res.statusMessage==='success'){
          setIsLoading(false)
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
          })
        setAccess({"empId":"","accessLvlId":""})
         
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


    return hasAuthority(EMPLOYEE_ACCESS_CREATION_PAGE_TITLE)? (
    
        isloading ? <Loading/> :
        <Box style={{backgroundColor:"#FFFFFF",height:"92vh"}}>
<Box sx={{display:"flex",
                 justifyContent:"space-between",alignContent:"center"}}>
                
                  <Typography color={"secondary"}  style={{marginLeft:"10px",fontSize:"21px",marginTop:"20px"}}>Employee Access</Typography>
                  <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"15px",marginRight:"10px"}} 
                    onClick={handleGoBack}
                    startIcon={<ArrowBackIosNewIcon/>}>
               back
                   </Button> 
                 </Box>

       <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
       <Container style={{padding:"20px"}}>
            <form onSubmit={WarningMailHandle}>
            <Paper elevation={0} style={{width:"auto"}} sx={{display:"flex",justifyContent:"center"}}>

            
            <Box sx={{ flexFlow: 1 }}>
                <Grid container spacing={0} gap={1.8}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>

                
              <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                     <Autocomplete 
             Value={access.empId}
             onChange={(e,value)=>{
               if(value==null){

                 return setAccess({...access,empId:null})
               }
               let data=value.match("[0-9]*")
              return   setAccess({...access,empId:data[0]})

             }}

              

            sx={{display:"flex",marginTop:"15px"}}
            style={textfield1}
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

                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>

<FormControl sx={{display:'flex',width:400}}>
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
                }}
                >
                        <Button type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>Submit</Button>
                    </Grid>

</Grid>
  </Box>
</Paper>
     </form>
</Container>

</Box>
    ):<NoAuth></NoAuth>
}
