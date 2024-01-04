import * as React from 'react';
import { 
  Box,
  FormControl,
  Grid, 
   InputLabel, 
   MenuItem, 
   Modal, 
   Select,
   Typography,

        } from "@mui/material";
import { DataGrid, jaJP } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import {  useNavigate } from 'react-router';
import Person4Icon from '@mui/icons-material/Person4';
import {IconButton} from '@mui/material';
import { toast } from 'react-toastify'
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { NoAuth } from '../../Components/HelperComponent/NoAuth';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { DropDownServices } from '../../Services/DropDownServices/DropDownServices';
import SearchIcon from '@mui/icons-material/Search';
import { EmployeeAccessLevelGivenService } from '../../Services/EmployeeAccessLevelGivenService/EmployeeAccesslevelGivenService';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { AccessDeleteModal } from './AccessDeleteModal';
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const ath=(authorities)=>{
  let a=[];
  for(let i=0;i<authorities.length;i++){
      a.push(authorities[i].authority);
  }
  return a.join(",");
}

export  const ACCESS_LEVEL_GIVEN_TABLE_PAGE_TITLE=" ACCESS_LEVEL_GIVEN_23"

export default function EmpAccess(){

const [reportm,setreportm]=useState(false)
const handleRmOpen=()=>{
  setreportm(true)
}


  const [locationdrop,setlocationdrop]=useState([])

    function fetchLocation(){
    DropDownServices.getAccessLevelDrop().then((res)=>{
        setlocationdrop(res.result)
       
    }).catch((err)=>{
    
    })
    }
    
    React.useEffect(()=>{
        fetchLocation()
    },[])
      //--------
      const[DeleteData, setDeleteData]=useState()
const [accessTable,setAccessTable]=React.useState([])
const[isLoading,setIsLoading]=useState(false)
const navigate=useNavigate()
const textfield1 = { width: 400 }
const [access,setAccess]=useState({"empId":"","access":1001})

      function fetchAcceslevelData(access){
        setIsLoading(true)
       EmployeeAccessLevelGivenService.getAllEmployeeAcessLevel(access).then((res)=>{
      if (res.status===200 && res.statusMessage==="success"){
        setIsLoading(false)

              if(res.result.length==0){
                toast.info("No Records Found  for  given access  "+access,{
                    position: toast.POSITION.TOP_RIGHT
                })}

                setAccessTable(res.result)
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
   
const[backButoon1,setbackButton1]=useState(false)
const[reload,setreload]=useState(false)
const handlefilter=()=>{
  setbackButton1(true)
}


React.useEffect(()=>{
fetchAcceslevelData(access.access)
setbackButton1(false)
},[reportm,reload])

const handleSerchData=()=>{

if(access !==null){
  setbackButton1(true)
  fetchAcceslevelData(access.access)
}
}

const columns = [
 
  { 
    field: 'empId',
   headerName: 'Emp Id', 
   minWidth: 100,
    flex:1,
   headerClassName:'table-header'
 
  },
  { 
    field: 'empName',
   headerName: 'Emp Name', 
   minWidth: 200,
    flex:2,
   headerClassName:'table-header'
   
  },
  {
    field:'authorities',
    headerName:'Authorities',
    minWidth:295,
    flex:3,
    headerClassName:'table-header',
    renderCell:(params)=>{
      return ath(params.formattedValue)}

},
  {
    field: 'edit',
    headerName: 'Action',
    minWidth: 119,
    flex:1,
    headerClassName: 'table-header',
    renderCell: (params) => {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
         
            >
              
                <IconButton variant="contained" color='secondary'>
                  <ModeEditIcon    onClick={handleRmOpen} ></ModeEditIcon>
            
            <Modal
                sx={{overflow:"scroll"}}
                open={reportm}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                   <AccessDeleteModal DeleteData={DeleteData} onClose1={()=>{setreportm(false)}}></AccessDeleteModal>
            </Modal>
                </IconButton >

            </Box>
        );
    }
}
];


const handleRow=(params)=>{
  setDeleteData(params.row)
}


  return hasAuthority( ACCESS_LEVEL_GIVEN_TABLE_PAGE_TITLE)? (  
      isLoading ?<Loading/>:
      <Box style={SerchingComponetsstyle.firstBox}>

<Box style={SerchingComponetsstyle.SecondBox}>
         <Typography style={SerchingComponetsstyle.typographystyle}>Emloyees Access</Typography>
         <Grid style={{justifyContent:"center"}}>
                  <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
                startIcon={<Person4Icon></Person4Icon>} 
                onClick={()=>{navigate(`/user/Employee-access-creation-page`)}} >
                            Create Access
                </Button>
{
  backButoon1 ?<Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
  onClick={()=>{setreload(!reload);setAccess({...access,access:"1001"})}}
  startIcon={<ArrowBackIosNewIcon/>}>
back
 </Button>:null
}

                

                </Grid>
        
             </Box>



   <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>


        <form onSubmit={handleSerchData}> 
     <Box
     style={SerchingComponetsstyle.Thirdbox}
    >
      <Grid container  style={SerchingComponetsstyle.gridContainerStyle}>
    
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>

<FormControl style={SerchingComponetsstyle.FormControlstyle}>
                                    <InputLabel id="demo-simple-select-label">Access Level</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="AccessLevel"
                                        name="AccessLevel"
                                      onChange={(e)=>{setAccess({...access,access:e.target.value})}}
                                      value={access.access}
                                    >
                                      <MenuItem id="all" value="0000">All</MenuItem>
                                        {
                                            locationdrop.map(({accessLvlId,accessLvlName})=>{
                                                return(
                                                <MenuItem  key={accessLvlId}  value={accessLvlName}>{accessLvlName}</MenuItem>)
                                            })
                                        }
                                    </Select>
                                </FormControl>
        </Grid >
         <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle}>
            <Button value="click" variant='outlined' type='submit'
            style={SerchingComponetsstyle.searchbuttonstyle} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid> 
                 
      </Grid>
      </Box>
      <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>
      </form>

     
  
    <Box style={SerchingComponetsstyle.DatagridBoxStyle}>
    <DataGrid
    onFilterModelChange={handlefilter}
     rows={accessTable}
     columns={columns} 
   
     getRowId={(accessTable) => accessTable.empId}    
       initialState={{sorting: {
        sortModel: [{ field: 'empId', sort: 'asec' }],
      },
         ...accessTable.initialState,
       pagination: { paginationModel: { pageSize: 8} },
       
     }}
      onRowClick={handleRow}
     pageSizeOptions={[8,15,25,50,75]}

    >
       
    </DataGrid>
   </Box>
   </Box>
  ):<NoAuth></NoAuth>
}