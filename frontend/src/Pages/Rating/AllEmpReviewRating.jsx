import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import dayjs from 'dayjs'
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { RatingServiceModule } from '../../Services/Rating-Services/RatingServiceModule';
import { toast } from 'react-toastify';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import Loading from '../../Components/LoadingComponent/Loading';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function getempnameid(params) {
  return params.row?.empId+" -"+params.row?.empName
}
function getreviewedid(params) {
  return params.row?.reviewedBy+" -"+params.row?.reviewedByName
}


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
]




export const ALL_EMPLOYEE_REVIEW_RATING_SYSTEM_PAGE_TITLE=" ALL_EMPLOYEE_REVIEW_RATING_21"

export const AllEmpReviewRating = () => {

function initial(){
  let mon1=dayjs().format("MM")
  let mon2=mon1-1;
  let mon3="0"+mon2
  return mon3
}

const[backButoon1,setbackButton1]=useState(false)
const[reload,setreload]=useState(false)
const handlefilter=()=>{
  setbackButton1(true)
}

    const[isloading, setIsLoading ]=useState(false)
    const[monthYear,setmonthYear]=useState({"month":"12","year":dayjs().format("YYYY")})
    const getime11=(e)=>{setmonthYear({...monthYear, [e.target.name]: e.target.value})}
    const [allReview,setAllReview]=React.useState([])
    const navigate=useNavigate()

    function fetchAllEmpRatingsYearly(year){
         setIsLoading(true)
         //setmonthYear({...monthYear,month:initial()})

        RatingServiceModule.getAllEmpRatingYearly(year).then((res)=>{
            if(res.status===200){
                 setIsLoading(false)
                if(res.result.length==0){
                  toast.info("No Records Found  for  given year  "+monthYear.year,{
                      position: toast.POSITION.TOP_RIGHT
                  })}
                  setAllReview(res.result)
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

    function fetchMonthlyYearlyRating(){
        //setmonthYear({...monthYear,month:initial()})
         setIsLoading(true)
        RatingServiceModule.getAllEmpRatingMonthly(monthYear.month,monthYear.year).then((res)=>{
            if(res.status===200){
                 setIsLoading(false)
                setAllReview(res.result)
              if(res.result.length==0){
                toast.info("No Records Found  Between the given month "+monthYear.month+" and year  "+monthYear.year,{
                    position: toast.POSITION.TOP_RIGHT
                })}
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

    const [load,setLoad]=useState(false)
    React.useEffect(()=>{
         fetchAllEmpRatingsYearly(monthYear.year)
// fetchMonthlyYearlyRating()
setbackButton1(false)
        setLoad(false)
    },[load,reload])


    const handleSerchData=()=>{

        if(monthYear.month.length>0 && monthYear.month !=="12"){
            fetchMonthlyYearlyRating()
            setbackButton1(true)
          }
          else if(monthYear.month=="12" ){
            setbackButton1(true)
            fetchAllEmpRatingsYearly(monthYear.year)
          }
          else{
            toast.error("Please enter month and year ", {
              position: toast.POSITION.TOP_RIGHT
          })
          }
        
    }


    const handleRowClick=(params)=>{
      const employeeDetailsUrl=`../user/Employee-detailed-review-rating-table?empId=${params.row.empId}&empName=${params.row.empName}`;
      window.open(employeeDetailsUrl,'_blank');     
      // navigate(`../Employee-detailed-review-rating-table`,{state:params.row.empId})
    }
    return hasAuthority( ALL_EMPLOYEE_REVIEW_RATING_SYSTEM_PAGE_TITLE)? (
      isloading?<Loading></Loading>:
        <Box style={SerchingComponetsstyle.firstBox}>
            <Box style={SerchingComponetsstyle.SecondBox}>
         <Typography style={SerchingComponetsstyle.typographystyle}>
            ALL  EMPLOYEE REVIEW RATINGS</Typography>
            {
  backButoon1 ?<Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
  onClick={()=>{setreload(!reload);setmonthYear({"month":initial(),"year":dayjs().format("YYYY")})}}
  startIcon={<ArrowBackIosNewIcon/>}>
back
 </Button>:null
}
             </Box>
<GlobalButton.GlobalDivider/>

<form onSubmit={handleSerchData}>

    <Box   style={SerchingComponetsstyle.Thirdbox}>
      
<Grid container style={SerchingComponetsstyle.gridContainerStyle}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >
<FormControl style={SerchingComponetsstyle.FormControlstyle}>
<InputLabel id="demo-multiple-name-label">Month</InputLabel>
        <Select 
       value={monthYear.month}
         onChange={getime11}
          labelId="demo-multiple-name-label"
          id="demo-multiple-start"
          name="month"
          label="Month"
        >
          <MenuItem value="12">All</MenuItem>
          <MenuItem value="00" >Jan</MenuItem>
          <MenuItem value="01" >Feb</MenuItem>
          <MenuItem value="02" >Mar</MenuItem>
          <MenuItem value="03" >April</MenuItem>
          <MenuItem value="04" >May</MenuItem>
          <MenuItem value="05" >June</MenuItem>
          <MenuItem value="06" >July</MenuItem>
          <MenuItem value="07" >Aug</MenuItem>
          <MenuItem value="08" >Sept</MenuItem>
          <MenuItem value="09" >Oct</MenuItem>
          <MenuItem value="10" >Nov</MenuItem>
          <MenuItem value="11" >Dec</MenuItem>
                                      
        </Select>
      </FormControl>

           
        </Grid >
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
 <TextField  style={{marginLeft:"20px",width:300,minWidth:"90px"}} required name="year"  value={monthYear.year} onChange={getime11} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }}></TextField>
        </Grid >


       
         <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
            <Button value="click" variant='outlined' type='submit'
            style={SerchingComponetsstyle.searchbuttonstyle} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid> 
                 
      </Grid>

    </Box>
</form>

<GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>


<Box style={SerchingComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    onFilterModelChange={handlefilter}
    rows={allReview}
    columns={columns}
    getRowId={(allReview)=>allReview.empRatingId}
    initialState={{
       ...allReview.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
   pageSizeOptions={[8,15,25,50,75]}
    onRowClick={handleRowClick}
    slots={{
      toolbar: CustomToolBar,
    }}
    >
       
    </DataGrid>
   </Box>

        
        </Box>
    ):<NoAuth></NoAuth>
}
