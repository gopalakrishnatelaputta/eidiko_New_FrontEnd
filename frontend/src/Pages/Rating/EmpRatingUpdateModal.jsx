import { Autocomplete, Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { EmployeeReviewRatinglUpdateModalStyle } from './EmployeeRatingStyle'
import Loading from '../../Components/LoadingComponent/Loading'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import Swal from 'sweetalert2'
import { RatingServiceModule } from '../../Services/Rating-Services/RatingServiceModule'
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch'
import { DropDownServices } from '../../Services/DropDownServices/DropDownServices'
import dayjs from 'dayjs'



export const EmpRatingUpdateModal = (props) => {
  const [locationdrop,setlocationdrop]=useState([])
  async function fetchLocation(){
   await DropDownServices.getTeamDrop().then((res)=>{
      setlocationdrop(res.result)
     
  }).catch((err)=>{
  
  })
  }
  
  useEffect(()=>{
      fetchLocation()
  },[])
  
  



    const[isloading,setIsLoading]=useState(false)
    const[ratingId,setratingId]=useState(props.skilldata2.empRatingId);
    const[rating,setRating]=useState({
      "empId":props.skilldata2.empId,
      "month":props.skilldata2.month,
      "year":props.skilldata2.year,
      "technology":props.skilldata2.technology,
      "technicalRating":props.skilldata2.technicalRating,
      "communicationRating":props.skilldata2.communicationRating,
      "remarks":props.skilldata2.remarks,
      "reviewedBy":props.skilldata2.reviewedBy,
      "modifiedBy":localStorage.getItem("id")
  });



  const handleOther=(e)=>{
    setOther(e.target.value)
  
}
let func1=props.onClose1


    async function submitRatingData(rating,id){
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
  
      RatingServiceModule.updateRating(rating,id).then((res)=>{
              if (res.status === 200 && res.statusMessage === 'Success') {
              
                   setIsLoading(false)
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: res.result,
                      showConfirmButton: false,
                      timer: 1500
                  })
            
                  func1()
              }
              else{
                  setIsLoading(false)
                  func1()
                  Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: res.message,
                      showConfirmButton: false,
                      timer: 1500
                  })
                }}).catch((err)=>{
                    func1()
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
       submitRatingData(rating,ratingId)          
      }

      }
 //autocomplete
 const [data, setData]=useState([]);
 const[records,setRecords]=useState();
 const [other,setOther]=useState(props.skilldata2.technology)
 const [other1,setother1]=useState("")


 useEffect(()=>{
     AutoEmpSearch(records).then((res)=>{
       setData(res.data.result)
     })
       },[records])
       useEffect(()=>{
        setRating({...rating,technology:other})
    },[other])

  return (
    isloading?<Loading></Loading>: 

    <Card  style={EmployeeReviewRatinglUpdateModalStyle.FirstBox}>
        <Box style={ EmployeeReviewRatinglUpdateModalStyle.secondBox}>
           <Typography style={ EmployeeReviewRatinglUpdateModalStyle.TypographyStyle}>REVIEW RATING</Typography>
        </Box>
        
            <GlobalButton.GlobalDivider1/>
 {/*---------- ---------------------------------------- */}
    <form onSubmit={handleSubmit}>
            <Box style={EmployeeReviewRatinglUpdateModalStyle.thirdBoxStyle}>
                <Grid  container  gap={1.8} style={EmployeeReviewRatinglUpdateModalStyle.gridContinerStyle}>
                    <Grid item xs={12} style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}>
            
                    
                                <TextField style={EmployeeReviewRatinglUpdateModalStyle.textFieldStyle}
                                required
                              disabled
                              value={rating.empId}
                                //  {...params} 
                                label='Employee Id'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                             
                                type='text'
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />
                    </Grid>

                   
<Grid item xs={12}  style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}> 

<Box style={EmployeeReviewRatinglUpdateModalStyle.RatingContainFormControlBoxStyle}>

<Grid container  style={EmployeeReviewRatinglUpdateModalStyle.gridContinerStyle}>
    <Grid item xs={6} style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}>
    <FormControl style={EmployeeReviewRatinglUpdateModalStyle.FormControlOfRatingBoxStyle}>
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
    <Grid item xs={6} style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}>
    <TextField  style={EmployeeReviewRatinglUpdateModalStyle.TextFieldOfRatingBoxStyle} required name="year" 
  value={rating.year} onChange={(e)=>{setRating({...rating,year:e.target.value})}}
   label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
</Grid>

</Grid>

</Box>
</Grid>
           
<Grid item xs={12}  style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}> 

<Box style={EmployeeReviewRatinglUpdateModalStyle.RatingContainFormControlBoxStyle}>

<Grid container  style={EmployeeReviewRatinglUpdateModalStyle.gridContinerStyle}>
    <Grid item xs={6} style={EmployeeReviewRatinglUpdateModalStyle.FormControlOfRatingBoxStyle}>
    <TextField  style={EmployeeReviewRatinglUpdateModalStyle.FormControlOfRatingBoxStyle} required name="Technical Rating" 
                 value={rating.technicalRating} onChange={(e)=>{setRating({...rating,technicalRating:e.target.value})}}
             label="Technical Rating" type="number"  
            ></TextField>

    </Grid>
    <Grid item xs={6} style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}>
   
    <TextField  style={EmployeeReviewRatinglUpdateModalStyle.TextFieldOfRatingBoxStyle} required name="Communication Rating" 
                 value={rating.communicationRating} onChange={(e)=>{setRating({...rating,communicationRating:e.target.value})}}
             label="Communication Rating" type="number"  
            ></TextField>
</Grid>

</Grid>

</Box>
</Grid> 
      
                    
                   
          <Grid item xs={12}  style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}> 
                <FormControl style={EmployeeReviewRatinglUpdateModalStyle.formcontrolStyle}>
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

                            <Grid item xs={12} style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}>
                            <TextField value={other} 
                            onChange={handleOther}
                            
                            label="Other" required  placeholder="Enter The Team" variant='outlined' sx={{marginTop:"13px"}}
                            fullWidth style={EmployeeReviewRatinglUpdateModalStyle.textFieldStyle}/>
                            </Grid>:null

                        }
                    </FormControl>

                </Grid>
                


                   


                   

{/* ---------------Remarks--------------------- */}
                    <Grid item xs={12} style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}>
                        <TextField multiline rows={2} style={EmployeeReviewRatinglUpdateModalStyle.textFieldStyle}   label="Remarks"
                         className='outlined-basic-text-box'
                                id="outlined-basic" 
                                type='text'
                                onChange={(e,value)=>{setRating({
                                    ...rating,remarks:e.target.value
                                })}}
                                value={rating.remarks}
                                > </TextField>
                    </Grid>

{/*------------------ REVIEWED BY------------------ */}
                    <Grid item xs={12} style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}>
                    <Autocomplete 
                    defaultValue={rating.reviewedBy}
             Value={rating.reviewedBy}
             onChange={(e,value)=>{
               if(value==null){

                 return setRating({...rating,reviewedBy:null})
               }
               let data=value.match("[0-9]*")
              return  setRating({...rating,reviewedBy:data[0]})

             }}
             style={EmployeeReviewRatinglUpdateModalStyle.textFieldStyle}
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
                    <Grid item xs={12} style={EmployeeReviewRatinglUpdateModalStyle.gridItemStyle}>
                    <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>UPDATE</Button>

<Button  disableElevation  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
               </Grid>

                </Grid>
                
              
            </Box>
    </form>
    <GlobalButton.GlobalDivider1/>
 

    </Card>
  )
}
