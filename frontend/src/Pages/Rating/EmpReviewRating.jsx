import { Autocomplete, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Rating, Select, Stack, TextField, Typography,} from '@mui/material';
import { styled } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import Swal from 'sweetalert2';
import StarIcon from '@mui/icons-material/Star';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { RatingServiceModule } from '../../Services/Rating-Services/RatingServiceModule';
import { useNavigate } from 'react-router';
import Loading from '../../Components/LoadingComponent/Loading';
import dayjs from 'dayjs';
import { DropDownServices } from '../../Services/DropDownServices/DropDownServices';
import { EmployeeRatingCreationStyle } from './EmployeeRatingStyle';

  
export const REVIEW_RATING_CREATION_PAGE_TITLE="REVIEW_RATING_CREATION"



export const EmpReviewRating = () => {


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
    


  
const [other,setOther]=useState("")

const [other1,setother1]=useState("")

    const[rating,setRating]=useState({
        "empId":"",
        "month":dayjs().format("MM")-1,
        "year":dayjs().format("YYYY"),
        "technology":"",
        "technicalRating":"",
        "communicationRating":"",
        "remarks":"",
        "reviewedBy":"",
        "modifiedBy":localStorage.getItem("id")
    });
   
    const[isloading,setIsLoading]=useState(false)



  const handleOther=(e)=>{
    setOther(e.target.value)
  
}
 async function submitRatingData(rating){
    setIsLoading(true)
if(rating.technicalRating>5 || rating.communicationRating>5){
    setIsLoading(false)
    Swal.fire({
        position: 'center',
        icon: 'info',
        title: "Ratings are limited to a maximum of 5",
        showConfirmButton: false,
        timer: 2000
    })
return
}

    RatingServiceModule.postReviewRating(rating).then(

        res=>{

            if (res.status === 201 && res.statusMessage === 'Success') {
                 setIsLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                // window.location.reload()
                setRating({
                    "empId":"",
                    "month":dayjs().format("MM")-1,
                    "year":dayjs().format("YYYY"),
                    "technology":"",
                    "technicalRating":"",
                    "communicationRating":"",
                    "remarks":"",
                    "reviewedBy":"",
                    "modifiedBy":localStorage.getItem("id")
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
                ).catch((err)=>{
                    setIsLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: err.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })

            }

        }
    )

 }



    const handleSubmit = (event)=>{
        event.preventDefault();

       if(rating.empId==rating.reviewedBy){
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: "Employee id and reviewed by can't be same",
            showConfirmButton: false,
            timer: 2000
        })
        return
    }
    
       else{
         submitRatingData(rating)          
        }

        }
      
                   
    //autocomplete
    const [data, setData]=useState([]);
    const[records,setRecords]=useState();
    useEffect(()=>{
        AutoEmpSearch(records).then((res)=>{
          setData(res.data.result)
        })
          },[records])

   
useEffect(()=>{
    setRating({...rating,technology:other})
},[other])
  



    return hasAuthority(REVIEW_RATING_CREATION_PAGE_TITLE)?  (
        
      isloading?<Loading></Loading>: 
          <Box  style={ EmployeeRatingCreationStyle.firstBox}>
        <Box style={ EmployeeRatingCreationStyle.secondBox}>
             <Typography style={ EmployeeRatingCreationStyle.TypographyStyle}>REVIEW RATING</Typography>
        </Box>
        
            <GlobalButton.GlobalDivider1/>
 {/*---------- ---------------------------------------- */}
    <form onSubmit={handleSubmit}>
            <Box style={EmployeeRatingCreationStyle.thirdBoxStyle}>
                <Grid  container  gap={1.8} style={EmployeeRatingCreationStyle.gridContinerStyle}>
                    <Grid item xs={12} style={EmployeeRatingCreationStyle.gridItemStyle}>
            
                    <Autocomplete 
             Value={rating.empId}
             onChange={(e,value)=>{
               if(value==null){

                 return setRating({...rating,empId:null})
               }
               let data=value.match("[0-9]*")
              return  setRating({...rating,empId:data[0]})

             }}
            sx={{display:"flex"}}
            style={EmployeeRatingCreationStyle.textFieldStyle}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                required
                           
                                 {...params} 
                                label='EmpId'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                             
                                type='text'
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                    </Grid>

                   
<Grid item xs={12}  style={EmployeeRatingCreationStyle.gridItemStyle}> 

<Box style={EmployeeRatingCreationStyle.RatingContainFormControlBoxStyle}>

<Grid container  style={EmployeeRatingCreationStyle.gridContinerStyle}>
    <Grid item xs={6} style={EmployeeRatingCreationStyle.gridItemStyle}>
    <FormControl style={EmployeeRatingCreationStyle.FormControlOfRatingBoxStyle}>
<InputLabel id="demo-multiple-name-label" >Month</InputLabel>
        <Select 
      value={rating.month}
         onChange={(e)=>{setRating({...rating,month:e.target.value})}}
          labelId="demo-multiple-name-label"
          id="demo-multiple-start"
          name="month"
          label="Month"
          required
          
        >
          <MenuItem value="0" >Jan</MenuItem>
          <MenuItem value="1" >Feb</MenuItem>
          <MenuItem value="2" >Mar</MenuItem>
          <MenuItem value="3" >April</MenuItem>
          <MenuItem value="4" >May</MenuItem>
          <MenuItem value="5" >June</MenuItem>
          <MenuItem value="6" >July</MenuItem>
          <MenuItem value="7" >Aug</MenuItem>
          <MenuItem value="8" >Sept</MenuItem>
          <MenuItem value="9" >Oct</MenuItem>
          <MenuItem value="10" >Nov</MenuItem>
          <MenuItem value="11" >Dec</MenuItem>
                                      
        </Select>
      </FormControl>&nbsp;&nbsp;&nbsp;
    </Grid>
    <Grid item xs={6} style={EmployeeRatingCreationStyle.gridItemStyle}>
    <TextField  style={EmployeeRatingCreationStyle.TextFieldOfRatingBoxStyle} required name="year" 
  value={rating.year} onChange={(e)=>{setRating({...rating,year:e.target.value})}}
   label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
</Grid>

</Grid>

</Box>
</Grid>
           
        
<Grid item xs={12}  style={EmployeeRatingCreationStyle.gridItemStyle}> 

<Box style={EmployeeRatingCreationStyle.RatingContainFormControlBoxStyle}>

<Grid container  style={EmployeeRatingCreationStyle.gridContinerStyle}>
    <Grid item xs={6} style={EmployeeRatingCreationStyle.FormControlOfRatingBoxStyle}>

    <TextField style={EmployeeRatingCreationStyle.FormControlOfRatingBoxStyle} required name="Technical Rating" 
                 value={rating.technicalRating} onChange={(e)=>{setRating({...rating,technicalRating:e.target.value})}}
             label="Technical Rating" type="number"  
            ></TextField>
    </Grid>
    <Grid item xs={6} style={EmployeeRatingCreationStyle.gridItemStyle}>
   
    <TextField  style={EmployeeRatingCreationStyle.TextFieldOfRatingBoxStyle} required name="Communication Rating" 
                 value={rating.communicationRating} onChange={(e)=>{setRating({...rating,communicationRating:e.target.value})}}
             label="Communication Rating" type="number"  
            ></TextField>
</Grid>

</Grid>

</Box>
</Grid>
           




                    
                   
          <Grid item xs={12}  style={EmployeeRatingCreationStyle.gridItemStyle}> 
                <FormControl style={EmployeeRatingCreationStyle.FormControlstyle}>
                <InputLabel id="demo-multiple-name-label"  >Select a Team</InputLabel>
                        <Select 
                        value={rating.technology}
                        onChange={(e)=>{setother1(e.target.value);setRating({...rating,technology:e.target.value})}}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-start"
                        name=""
                        label="Select a Team"
                        required 
                        >
                        {
                             locationdrop.map(({skillId,skillName})=>{
                                return(
                                <MenuItem  key={skillId}  value={skillName}>{skillName}</MenuItem>)
                            })
                        }
                       
                        <MenuItem name="isyes" value="Others" >OTHERS</MenuItem>
                       </Select>
                       {
                            rating.technology==="Others"  || other1==="Others"?

                            <Grid item xs={12} style={EmployeeRatingCreationStyle.gridItemStyle}>
                            <TextField value={other} 
                            onChange={handleOther}
                            
                            label="Other" required  placeholder="Enter The Team" variant='outlined' sx={{marginTop:"13px"}}
                            fullWidth style={EmployeeRatingCreationStyle.textFieldStyle}/>
                            </Grid>:null

                        }
                    </FormControl>

                </Grid>
                


{/* ---------------Remarks--------------------- */}
                    <Grid item xs={12} style={EmployeeRatingCreationStyle.gridItemStyle}>
                        <TextField multiline rows={2} style={EmployeeRatingCreationStyle.textFieldStyle}   label="Remarks"
                         className='outlined-basic-text-box'
                                id="outlined-basic" 
                                type='text'
                                onChange={(e,value)=>{setRating({
                                    ...rating,remarks:e.target.value
                                })}}
                                // Value={}
                                > </TextField>
                    </Grid>

{/*------------------ REVIEWED BY------------------ */}
                    <Grid item xs={12} style={EmployeeRatingCreationStyle.gridItemStyle}>
                    <Autocomplete 
             Value={rating.reviewedBy}
             onChange={(e,value)=>{
               if(value==null){

                 return setRating({...rating,reviewedBy:null})
               }
               let data=value.match("[0-9]*")
              return  setRating({...rating,reviewedBy:data[0]})

             }}
             style={EmployeeRatingCreationStyle.textFieldStyle}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                required
                           
                                 {...params} 
                                label='Reviewed By'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                // OptionEqualToValue={employee.empId}
                                type='text'
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                    </Grid>
                    <Grid item xs={12} style={EmployeeRatingCreationStyle.gridItemStyle}>
                 <Button disableElevation style={GlobalButton.OperationButton} type="submit" variant="contained" 
                 color="primary" >submit</Button>
               </Grid>

                </Grid>
                
              
            </Box>
    </form>
    <GlobalButton.GlobalDivider1/>
 </Box>

    ):<NoAuth></NoAuth>
}
