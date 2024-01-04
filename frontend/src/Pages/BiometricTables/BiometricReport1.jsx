import React, { useEffect, useState } from 'react'
import "./BiometricReport1.css"
import { Box, Button, Card, Divider, Grid, TextField, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import { BiometricServiceModule } from '../../Services/BiometricService/BiometricServiceModule'
import dayjs from 'dayjs'
import Loading from '../../Components/LoadingComponent/Loading'
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService'
import { NoAuth } from '../../Components/HelperComponent/NoAuth'
import moment from 'moment'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle'



export const EMPLOYEE_BIOMETRIC_STATUS_FIRST_PAGE_TITLE="EMPLOYEE_BIOMETRIC_STATUS71"


export const BiometricReport1 = (props) => {
    const[bioDetails,setBioDetails]=useState()
    const navigate=useNavigate()

const {state}=useLocation(props.state)
const[remEmpId,setremEmpId]=useState(state)


    //------------------------------fetching data with start date end date and emp id -------------------
async  function fetchViaParticularEmpIdData(empId,startdate,endate){
setIsLoading(true)
  await BiometricServiceModule.getAllBiometricDataViaEmpIdStartDateEndDate(empId,startdate,endate).then((res)=>{
     if(res.status===200){
   
       setBioDetails(res.result)
     }
     else{
   
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
    })
    }

  }).catch((err)=>{

//   setIsLoading(false)
  toast.error(err.message, {
    position: toast.POSITION.TOP_RIGHT
})
  })
 
 }

//--------------

  
 const history=useNavigate();
const[biometricReportViaYear,setBiometricReportViaYear]=useState()
const [empId,setEmpId]=useState(localStorage.getItem("id"))

const[monthYear,setmonthYear]=useState(dayjs().format("YYYY"))
const[isLoading,setIsLoading]=useState(false)
const textfield1 = { width: 400 }

let showEmpId=localStorage.getItem("id")


  async  function fetchViaParticularEmpIdData(){
        setIsLoading(true)
      await  BiometricServiceModule.getBiometricReportViaYear(empId,monthYear).then((res)=>{
        
            if(res.status===200){
                if(res.result.length==0){
                    toast.info("No record found for given year "+monthYear ,{
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
              setIsLoading(false)
              setBiometricReportViaYear(res.result)
            }
            else{
              setIsLoading(false)
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            }
        
          }).catch((err)=>{
        
          setIsLoading(false)
          })
      }

//from reporting manager page data fetching-------------------------------------------------------------------------------------------------
async  function fetchdatafromreportingmanagerpage(){
    setIsLoading(true)
  await  BiometricServiceModule.getBiometricReportViaYear(remEmpId,monthYear).then((res)=>{
        if(res.status===200){
            if(res.result.length==0){
                toast.info("No record found for given year "+monthYear ,{
                    position: toast.POSITION.TOP_RIGHT
                })
            }
          setIsLoading(false)
          setBiometricReportViaYear(res.result)
        }
        else{
          setIsLoading(false)
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT
        })
        }
    
      }).catch((err)=>{
    
      setIsLoading(false)
      })
  }


      useEffect(()=>{
    
        if(remEmpId !==null){
            fetchdatafromreportingmanagerpage()
        }
        else{
            fetchViaParticularEmpIdData()
        }
       
            },[]) 
 
            
    const handleSerchData=()=>{
  
        if(remEmpId==null){
            fetchViaParticularEmpIdData()
        }
        else if(remEmpId !==null){
            fetchdatafromreportingmanagerpage()
        }
        else{
          toast.error("Please enter month and year ", {
            position: toast.POSITION.TOP_RIGHT
        })
        }
        }
    const handleGoBack = () =>{
        history(-1);

    };

async function getDataAccoringToParameter(empId1,startdate,enddate){
    await BiometricServiceModule.getAllBiometricDataViaEmpIdStartDateEndDate(empId1,startdate,enddate).then((res)=>{
        if(res.status===200){
            if(res.result.length==0){
                toast.info("No Records Found for  "+empId1+ "  Between the given dates "+moment(startdate).format("DD/MM/YYYY")+"   "+moment(enddate).format("DD/MM/YYYY") ,{
                    position: toast.POSITION.TOP_RIGHT
                })}
          navigate(`../biometric-report-details`,{state:{bulkdata:res.result,remEmpId:remEmpId}})
      }
        
        else{
      
         toast.error(res.message, {
           position: toast.POSITION.TOP_RIGHT
       })
       }
   
     }).catch((err)=>{
   
  
     toast.error(err.message, {
       position: toast.POSITION.TOP_RIGHT
   })
     })    
}





const  handleOnClickMonth= async (month)=>{

if(remEmpId==null){
    let empId1=localStorage.getItem("id")
    if(month==="01"){
        let startdate=biometricReportViaYear[0]?.year+"-"+month+"-"+"01"
        let enddate=biometricReportViaYear[0]?.year+"-"+month+"-"+"31"
        if(startdate !==null && enddate !==null){
            getDataAccoringToParameter(empId1,startdate,enddate)
        }
      
        }
        
         else if(month==="02"){
               
        let startdate1=biometricReportViaYear[1]?.year+"-"+month+"-"+"01"
        let enddate1=biometricReportViaYear[1]?.year+"-"+month+"-"+"28"
        if(startdate1 !==null && enddate1 !==null){
            getDataAccoringToParameter(empId1,startdate1,enddate1)
        }
            }
            else if(month==="03"){
               
                let startdate1=biometricReportViaYear[2]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[2]?.year+"-"+month+"-"+"31"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                    }
        else if(month==="04"){
               
                let startdate1=biometricReportViaYear[3]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[3]?.year+"-"+month+"-"+"30"
                
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                    }
        else if(month==="05"){
        
            let startdate1=biometricReportViaYear[4]?.year+"-"+month+"-"+"01"
            let enddate1=biometricReportViaYear[4]?.year+"-"+month+"-"+"31"
            
            if(startdate1 !==null && enddate1 !==null){
                getDataAccoringToParameter(empId1,startdate1,enddate1)
            }
                } 
        else if(month==="06"){
        
            let startdate1=biometricReportViaYear[5]?.year+"-"+month+"-"+"01"
            let enddate1=biometricReportViaYear[5]?.year+"-"+month+"-"+"30"
            if(startdate1 !==null && enddate1 !==null){
                getDataAccoringToParameter(empId1,startdate1,enddate1)
            }
             
                } 
             else if(month==="07"){
               
                    let startdate1=biometricReportViaYear[6]?.year+"-"+month+"-"+"01"
                    let enddate1=biometricReportViaYear[6]?.year+"-"+month+"-"+"31"
                    if(startdate1 !==null && enddate1 !==null){
                        getDataAccoringToParameter(empId1,startdate1,enddate1)
                    }
                        } 
            else if(month==="08"){
        
                let startdate1=biometricReportViaYear[7]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[7]?.year+"-"+month+"-"+"31"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                 
                    } 
            else if(month==="09"){
        
                let startdate1=biometricReportViaYear[8]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[8]?.year+"-"+month+"-"+"30"
                
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                    } 
            else if(month==="10"){
        
                let startdate1=biometricReportViaYear[9]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[9]?.year+"-"+month+"-"+"31"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                  
                    } 
            else if(month==="11"){
        
                let startdate1=biometricReportViaYear[10]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[10]?.year+"-"+month+"-"+"30"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                   
                    }
            else if(month==="12"){
        
                let startdate1=biometricReportViaYear[11]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[11]?.year+"-"+month+"-"+"31"
                
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                    }
}
else{
    let empId1=remEmpId

    if(month==="01"){
        let startdate=biometricReportViaYear[0]?.year+"-"+month+"-"+"01"
        let enddate=biometricReportViaYear[0]?.year+"-"+month+"-"+"31"
        if(startdate !==null && enddate !==null){
            getDataAccoringToParameter(empId1,startdate,enddate)
        }
        }
        
         else if(month==="02"){
               
        let startdate1=biometricReportViaYear[1]?.year+"-"+month+"-"+"01"
        let enddate1=biometricReportViaYear[1]?.year+"-"+month+"-"+"28"
        if(startdate1 !==null && enddate1 !==null){
            getDataAccoringToParameter(empId1,startdate1,enddate1)
        }
            }
            else if(month==="03"){
               
                let startdate1=biometricReportViaYear[2]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[2]?.year+"-"+month+"-"+"31"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                    }
        else if(month==="04"){
               
                let startdate1=biometricReportViaYear[3]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[3]?.year+"-"+month+"-"+"30"
                
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                    }
        else if(month==="05"){
        
            let startdate1=biometricReportViaYear[4]?.year+"-"+month+"-"+"01"
            let enddate1=biometricReportViaYear[4]?.year+"-"+month+"-"+"31"
            if(startdate1 !==null && enddate1 !==null){
                getDataAccoringToParameter(empId1,startdate1,enddate1)
            }
               
                } 
        else if(month==="06"){
        
            let startdate1=biometricReportViaYear[5]?.year+"-"+month+"-"+"01"
            let enddate1=biometricReportViaYear[5]?.year+"-"+month+"-"+"30"
            if(startdate1 !==null && enddate1 !==null){
                getDataAccoringToParameter(empId1,startdate1,enddate1)
            }
               
                } 
             else if(month==="07"){
               
                    let startdate1=biometricReportViaYear[6]?.year+"-"+month+"-"+"01"
                    let enddate1=biometricReportViaYear[6]?.year+"-"+month+"-"+"31"
                    if(startdate1 !==null && enddate1 !==null){
                        getDataAccoringToParameter(empId1,startdate1,enddate1)
                    }
                     
                        } 
            else if(month==="08"){
        
                let startdate1=biometricReportViaYear[7]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[7]?.year+"-"+month+"-"+"31"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
             
                    } 
            else if(month==="09"){
        
                let startdate1=biometricReportViaYear[8]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[8]?.year+"-"+month+"-"+"30"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                  
                    } 
            else if(month==="10"){
        
                let startdate1=biometricReportViaYear[9]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[9]?.year+"-"+month+"-"+"31"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                 
                    } 
            else if(month==="11"){
        
                let startdate1=biometricReportViaYear[10]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[10]?.year+"-"+month+"-"+"30"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                 
                    }
            else if(month==="12"){
        
                let startdate1=biometricReportViaYear[11]?.year+"-"+month+"-"+"01"
                let enddate1=biometricReportViaYear[11]?.year+"-"+month+"-"+"31"
                if(startdate1 !==null && enddate1 !==null){
                    getDataAccoringToParameter(empId1,startdate1,enddate1)
                }
                
                    }
}


}
return hasAuthority(EMPLOYEE_BIOMETRIC_STATUS_FIRST_PAGE_TITLE)? (
        isLoading?<Loading></Loading>:
        <Box sx={SerchingComponetsstyle.firstBox}>

            <Box sx={SerchingComponetsstyle.SecondBox}>
                
                  <Typography variant='h6' style={SerchingComponetsstyle.typographystyle}>BIOMETRIC REPORT</Typography>
                  
                  <Button variant='outlined' 
                    onClick={handleGoBack}
                    startIcon={<ArrowBackIosNewIcon/>}>
               back
                   </Button> 
                   
                 </Box>
                 <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
{/* ------------------------------------------------- */}
            <form onSubmit={handleSerchData}> 
           

        <Box sx={SerchingComponetsstyle.Thirdbox}>
                
                  <Typography  style={SerchingComponetsstyle.typographystyle}>
                    Employee Id:
               <span style={{color:"black",}}>{showEmpId }</span></Typography>



    <TextField style={SerchingComponetsstyle.textFieldStyle}  size='small' required name="year" 
  value={monthYear} onChange={(e)=>{setmonthYear(e.target.value)}} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000}}}></TextField>

                 <Button value="click" variant='outlined' type='submit'
            style={SerchingComponetsstyle.searchbuttonstyle} endIcon={<SearchIcon/>}>
           search
                </Button> 
                   
                 </Box>
 </form>

 <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
{/* --------------------------------------------------------- */}

<Box sx={{flexGrow:1}}>
        <Grid container spacing={0} sx={{
            margin: '10px 0px',
           
        }}>
       
        {
            biometricReportViaYear==undefined?null:biometricReportViaYear[0]==null?null:
            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3}onClick={()=>{handleOnClickMonth("01")}} style={{cursor:"pointer"}}>
        
        <Grid className="card card-margin">
            <Grid className="card-body pt-0">
                <Grid className="widget-49">
                    <Grid className="widget-49-title-wrapper">
                        <Grid className="widget-49-date-primary">
                        <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[0]?.year}</span><br/>
                            <span className="widget-49-date-month">Jan</span>
                        </Grid>
                       
                    </Grid>
                   
                    <table className="table">
        <tbody> 
            <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[0]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[0]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[0]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[0]?.avg_working_hours?.slice(0,6)}</td>
            </tr>
               
            </tbody>
        </table>
        <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                </Grid>
            </Grid>
        </Grid>
       
    </Grid>
        }
        {
                        biometricReportViaYear==undefined?null:biometricReportViaYear[1]==null?null:
                        <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("02")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                 
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[1]?.year}</span><br/>
                                    <span className="widget-49-date-month">Feb</span>
                                </Grid>
                               
                            </Grid>
    
                            <table className="table">
                <tbody>
                <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[1]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[1]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[1]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[1]?.avg_working_hours.slice(0,6)}</td>
            </tr>
                       
                    </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>
                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid> 

            
        }
    
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[2]==null?null:
                            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("03")}} style={{cursor:"pointer"}}>
        
                            <Grid className="card card-margin">
                                <Grid className="card-body pt-0">
                                    <Grid className="widget-49">
                                        <Grid className="widget-49-title-wrapper">
                                            <Grid className="widget-49-date-primary">
                                            <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[2]?.year}</span><br/>
                                                <span className="widget-49-date-month" id="march">March</span>
                                            </Grid>
                                           
                                        </Grid>
                                        <table className="table">
                            <tbody>
                            <tr>
                            <th >No-Late</th>
                            <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[2]?.no_late_count}</td>
                        </tr>
                        <tr>
                            <th >Late-Count</th>
                            <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[2]?.is_late_count}</td>
                        </tr>
                        <tr>
                            <th >Very Late-Count</th>
                            <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[2]?.very_late_count}</td>
                        </tr>
                        <tr>
                            <th >Avg. Working</th>
                            <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[2]?.avg_working_hours.slice(0,6)}</td>
                        </tr>
                                   
                                </tbody>
                            </table>
                            <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>
            
                                    </Grid>
                                </Grid>
                            </Grid>
                           
                        </Grid>

            }
           
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[3]==null?null:
                            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("04")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[3]?.year}</span><br/>
                                    <span className="widget-49-date-month">April</span>
                                </Grid>
                               
                            </Grid>
                            <table className="table">
                <tbody>
                <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[3]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[3]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[3]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[3]?.avg_working_hours.slice(0,6)}</td>
            </tr>
                       
                    </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid>

            }
            
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[4]==null?null:
                            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("05")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[4]?.year}</span><br/>
                                    <span className="widget-49-date-month">May</span>
                                </Grid>
                               
                            </Grid>
                            <table className="table">
                <tbody>
                <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[4]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[4]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[4]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[4]?.avg_working_hours.slice(0,6)}</td>
            </tr>
                       
                    </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid>

            }
            
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[5]==null?null:
                            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("06")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[5]?.year}</span><br/>
                                    <span className="widget-49-date-month">Jun</span>
                                </Grid>
                               
                            </Grid>
                            <table className="table">
                <tbody>
                <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[5]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[5]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[5]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[5]?.avg_working_hours.slice(0,6)}</td>
            </tr>
                       
                    </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid>

            }
            
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[6]==null?null:
                            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("07")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[6]?.year}</span><br/>
                                    <span className="widget-49-date-month">Jul</span>
                                </Grid>
                               
                            </Grid>
                            <table className="table">
                <tbody>
                <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[6]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[6]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[6]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[6]?.avg_working_hours.slice(0,6)}</td>
            </tr>
                       
                    </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid>

            }
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[7]==null?null:
                            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("08")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[7]?.year}</span><br/>
                                    <span className="widget-49-date-month">Aug</span>
                                </Grid>
                               
                            </Grid>
                            <table className="table">
                <tbody>
                <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[7]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[7]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[7]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[7]?.avg_working_hours.slice(0,6)}</td>
            </tr>
                       
                    </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid>

            }
            
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[8]==null?null:
                            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("09")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[8]?.year}</span><br/>
                                    <span className="widget-49-date-month">Sep</span>
                                </Grid>
                               
                            </Grid>
                            <table className="table">
                <tbody>
                <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[8]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[8]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[8]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[8]?.avg_working_hours.slice(0,6)}</td>
            </tr>
                       
                    </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid>

            }
            
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[9]==null?null:
                            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("10")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[9]?.year}</span><br/>
                                    <span className="widget-49-date-month">oct</span>
                                </Grid>
                               
                            </Grid>
                            <table className="table">
                <tbody> <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[9]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[9]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[9]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[9]?.avg_working_hours.slice(0,6)}</td>
            </tr>
            </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid>

            }
            
            {
            biometricReportViaYear==undefined?null:biometricReportViaYear[10]==null?null:
            <Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("11")}} style={{cursor:"pointer"}}>
        
                <Grid className="card card-margin">
                    <Grid className="card-body pt-0">
                        <Grid className="widget-49">
                            <Grid className="widget-49-title-wrapper">
                                <Grid className="widget-49-date-primary">
                                <span className="card-title" id='year' >{biometricReportViaYear==undefined? null :biometricReportViaYear[10]?.year}</span><br/>
                                    <span className="widget-49-date-month">Nov</span>
                                </Grid>
                               
                            </Grid>
                            <table className="table">
                <tbody> <tr>
                <th >No-Late</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[10]?.no_late_count}</td>
            </tr>
            <tr>
                <th >Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[10]?.is_late_count}</td>
            </tr>
            <tr>
                <th >Very Late-Count</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[10]?.very_late_count}</td>
            </tr>
            <tr>
                <th >Avg. Working</th>
                <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[10]?.avg_working_hours.slice(0,6)}</td>
            </tr>
                       
                    </tbody>
                </table>
                <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                        </Grid>
                    </Grid>
                </Grid>
               
            </Grid>

            }
            
            {
                            biometricReportViaYear==undefined?null:biometricReportViaYear[11]==null?null:
<Grid item  xs={12} sm={12} md={3} lg={3} xl={3} onClick={()=>{handleOnClickMonth("12")}} style={{cursor:"pointer"}}>
        
        <Grid className="card card-margin">
            <Grid className="card-body pt-0">
                <Grid className="widget-49">
                    <Grid className="widget-49-title-wrapper">
                        <Grid className="widget-49-date-primary">
                        <span className="card-title" id='year'>{biometricReportViaYear==undefined? null :biometricReportViaYear[11]?.year}</span><br/>
                            <span className="widget-49-date-month">Dec</span>
                        </Grid>
                       
                    </Grid>
                    <table className="table">
        <tbody>
           
        <tr>
        <th >No-Late</th>
        <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[11]?.no_late_count}</td>
    </tr>
    <tr>
        <th >Late-Count</th>
        <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[11]?.is_late_count}</td>
    </tr>
    <tr>
        <th >Very Late-Count</th>
        <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[11]?.very_late_count}</td>
    </tr>
    <tr>
        <th >Avg. Working</th>
        <td>{biometricReportViaYear==undefined? null :biometricReportViaYear[11]?.avg_working_hours.slice(0,6)}</td>
    </tr>   
            </tbody>
        </table>
        <Typography style={{color:"purple",marginLeft:"15px",marginTop:"20px", display:"block",cursor:"pointer"}}className="btn btn-sm btn-flash-border-primary"></Typography>

                </Grid>
            </Grid>
        </Grid>
       
    </Grid>
            }
            

        
            
        </Grid>
       
        </Box>
        </Box>
    ):<NoAuth></NoAuth>
}
