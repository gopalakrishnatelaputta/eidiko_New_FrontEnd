import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { RatingServiceModule } from '../../Services/Rating-Services/RatingServiceModule';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Loading from "../../Components/LoadingComponent/Loading"
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import { EMPLOYEE_DELETE_BUTTON } from '../Employee/Employees';
import {Delete } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import PreviewIcon from '@mui/icons-material/Preview';
import { EmpRatingUpdateModal } from './EmpRatingUpdateModal';
import Swal from 'sweetalert2';



function getempnameid(params) {
  return params.row?.empId+" -"+params.row?.empName
}
function getreviewedid(params) {
  return params.row?.reviewedBy+" -"+params.row?.reviewedByName
}








export const PARTUCULAR_EMPLOYEE_REVIEW_RATING_TABLE_TITLE="PARTUCULAR_EMPLOYEE_REVIEW_RATING_1"
export const EMPLOYEE_RATING_EDIT_DELETE_OPTION_PAGE_TITLE="EMPLOYEE_RATING_EDIT_DELETE_44"


export const EmpReviewModule = (props) => {
 

  const columns=[
    { 
        field: 'empidwithname',
       headerName: 'Employee Name', 
       minWidth: 200,
        flex:2.5,
       headerClassName:'table-header',
       valueGetter:getempnameid
     
      },  
      { 
        field: 'month',
       headerName: 'Month', 
       minWidth: 90,
        flex:1,
        headerClassName:'table-header',
        renderCell: (params) => {
      return helpFunction.MonthShowing2(params.formattedValue)
     
     }
      },
      { 
        field: 'year',
       headerName: 'Year', 
       width: 200,
        flex:1,
        headerClassName:'table-header',
      },
      { 
        field: 'technology',
       headerName: 'Technology', 
       minWidth: 150,
        flex:1.5,
        headerClassName:'table-header',
      },
      { 
        field: 'technicalRating',
       headerName: 'Technical Rating', 
       minWidth: 90,
        flex:1,
        headerClassName:'table-header',
      },
      { 
        field: 'communicationRating',
       headerName: 'Communication Rating', 
       minWidth: 90,
        flex:1,
        headerClassName:'table-header',
      },
      { 
        field: 'remarks',
       headerName: 'Remarks', 
       minWidth: 120,
        flex:1.5,
        headerClassName:'table-header',
      },
      { 
        field: 'reviewedBywithname',
       headerName: 'Review By', 
       minWidth: 200,
        flex:2.5,
        headerClassName:'table-header',
        valueGetter:getreviewedid
      },
      {
        field: 'edit',
        headerName: 'Edit',
        minWidth: 90,
        flex:1.5,
        headerClassName: 'table-header',
        renderCell: (params) => {


            return hasAuthority(EMPLOYEE_RATING_EDIT_DELETE_OPTION_PAGE_TITLE) ?(
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <IconButton variant="contained" color='error'
                    >
                   <EditOutlinedIcon 
                   onClick={handleRmOpen}
                    color='secondary' sx={{marginRight:"39px"}}/>
                    <Modal
                        sx={{overflow:"scroll"}}
                        open={reviewM}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description">
                          <center> 
                       <EmpRatingUpdateModal skilldata2={empRatingData} onClose1={()=>{setReviewM(false)}}/>
                        </center>
                    </Modal>
                   </IconButton >
    
                </Box>
                
            ):null
        }
    },
      {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 80,
        flex:1.5,
        headerClassName: 'table-header',
        renderCell: (params) => {

            return hasAuthority(EMPLOYEE_RATING_EDIT_DELETE_OPTION_PAGE_TITLE)?
             (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <IconButton variant="contained" color='error'
                         onClick={(e) =>{ onButtonClick(e, params.row, 'delete')}}
                    ><Delete /></IconButton >

                </Box>
            ):null
              }   
    },
    



]
const[empRatingData,setEmpRatingData]=useState()
const rowHandle =(params)=>{
  setEmpRatingData(params.row)
}
const [empskilldata1,setempskilldata1]=useState()

  const [reviewM,setReviewM]=useState(false)
const handleRmOpen=()=>{
  setReviewM(true)

}
const [reportm,setreportm]=useState(false)
  const location=useLocation();
const queryParams= new URLSearchParams(location.search);
const param1Value=queryParams.get('empId');
const param2Value=queryParams.get('empName');
const {state}=useLocation(props.state)
const [empId1,setEmpId1]=useState(param1Value)

    const[monthYear,setmonthYear]=useState({"month":dayjs().format("MM"),"year":dayjs().format("YYYY")})
    const getime11=(e)=>{setmonthYear({...monthYear, [e.target.name]: e.target.value})}
    const [empReview,setEmpReview]=React.useState([])


// const[empId1,setEmpId1]=useState(state)
const[empId2,setempid2]=useState(localStorage.getItem("id"))

const[isloading,setIsLoading]=useState(false)


    function fetchEmpReviewData(){
setIsLoading(true)
      RatingServiceModule.getEmpReviewRating(empId1,monthYear.year).then((res)=>{
        if(res.status===200){
           setIsLoading(false)
          if(res.result.length==0){
            toast.info("No Records Found  for "+empId1+ "  for given year  "+monthYear.year,{
                position: toast.POSITION.TOP_RIGHT
            })}
            setEmpReview(res.result)
        }
        else{
           setIsLoading(false)
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT
        })
        }
    
      }).catch((err)=>{
    
       setIsLoading(false)
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT
    })
    
      })

        
    }

  function fetchEmpReviewData1(){
    setIsLoading(true)
    RatingServiceModule.getEmpReviewRating(empId2,monthYear.year).then((res)=>{
      if(res.status===200){
         setIsLoading(false)
        if(res.result.length==0){
          toast.info("No Records Found  for "+empId2+ "  for given year  "+monthYear.year,{
              position: toast.POSITION.TOP_RIGHT
          })}
          setEmpReview(res.result)
      }
      else{
         setIsLoading(false)
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT
      })
      }
  
    }).catch((err)=>{
  
    setIsLoading(false)
    toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT
    })
  })
  }





const[load,setLoad]=useState(false)

const history=useNavigate()
const handleGoBack = () =>{
history(-1);
setLoad(true)
}
  
    React.useEffect(()=>{
      if(empId1!==null){
        fetchEmpReviewData()
      }
      else{
        fetchEmpReviewData1()
      }
      setLoad(false)
    },[load,reviewM])
    
     const handleSerchData=()=>{
      if(monthYear!==null && empId1!==null){
        fetchEmpReviewData()
      }
      else if(monthYear!==null && empId2 !==null){
        fetchEmpReviewData1()
      }
      else{
        toast.error("Please Enter Month and Year",{
          position:toast.POSITION.TOP_RIGHT
        })
      }
     }

 ////////////////////////////////////////////for deletion///////////////////////////////////////////
 
 const onButtonClick = (e, row, action) => {
  e.stopPropagation();
  e.preventDefault();
  if (action === 'delete') {
        
      Swal.fire({
          icon: "warning",
          iconColor:"#d50000",
          title: 'Do you want to delete this ' + row.empRatingId,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          confirmButtonColor: '#2196F3',
          cancelButtonColor: '#d50000'

          
      })

      .then((result) => {
          if (result.isConfirmed) {
              RatingServiceModule.deleterating(row.empRatingId).then((res)=>{
              
                  if(res.status===200){
                      Swal.fire('Deleted!', '', 'success')
                      window.location.reload()
                  }
                  else{
                      Swal.fire("Review  doesn't exist",'',"error")
                  }
              })
              
          }
      })
  }
};
  

const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
  edit: hasAuthority(EMPLOYEE_RATING_EDIT_DELETE_OPTION_PAGE_TITLE),
  actions:hasAuthority(EMPLOYEE_RATING_EDIT_DELETE_OPTION_PAGE_TITLE) ,
});






    return hasAuthority(PARTUCULAR_EMPLOYEE_REVIEW_RATING_TABLE_TITLE)? ( isloading?<Loading></Loading>:
        
        <Box style={SerchingComponetsstyle.firstBox}>
             <Box style={SerchingComponetsstyle.SecondBox}>

{
   param2Value!==null? <Typography style={SerchingComponetsstyle.typographystyle}>REVIEW'S OF <span style={{color:"black"}}>{ param2Value}</span></Typography>
: <Typography style={SerchingComponetsstyle.typographystyle}> EMPLOYEE REVIEW</Typography>
  }
               
                
            </Box>
            <GlobalButton.GlobalDivider/>

{/* -------------------------------------------------- */}
            <form onSubmit={handleSerchData}>
                <Box style={SerchingComponetsstyle.Thirdbox}>
                <Grid container style={SerchingComponetsstyle.gridContainerStyle}>
        <Grid item xs={6} style={{display:"flex"}}>
 <TextField  style={SerchingComponetsstyle.textFieldStyle} required name="year"  value={monthYear.year} onChange={getime11} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
        </Grid >


       
         <Grid item xs={6} style={{display:"flex",justifyContent:"flex-end"}} >
            <Button value="click" variant='outlined' type='submit'
                 style={SerchingComponetsstyle.searchbuttonstyle}  endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid> 
                 
      </Grid>

                </Box>
            </form>
        
<GlobalButton.GlobalDivider/>
{/* -------------------------------------------------------------- */}
<Box style={SerchingComponetsstyle.DatagridBoxStyle}>
<DataGrid
columnVisibilityModel={columnVisibilityModel}
 rows={empReview}
 columns={columns}
 getRowId={(empReview)=>empReview.empRatingId}
initialState={{ sorting:{
    sortModel:[{ field: 'month', sort:'desc'}],
},
  ...empReview.initialState,
  pagination:{paginationModel: { pageSize: 8} },  
}}
pageSizeOptions={[8,15,25,50,75]}
onRowClick={rowHandle}
 >

 </DataGrid>
</Box>


        </Box>
    ):<NoAuth></NoAuth>

}
