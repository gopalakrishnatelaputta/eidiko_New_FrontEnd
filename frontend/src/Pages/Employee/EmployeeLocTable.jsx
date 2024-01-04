import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { CREATE_EMPLOYEE_PAGE_TITLE } from './CreateEmployee';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { DataGrid } from '@mui/x-data-grid';
import { getEmpDataByLoc } from '../../Services/employee-service/EmployeeService';
import { toast } from 'react-toastify';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import { FaUserPlus } from 'react-icons/fa'
import Loading from '../../Components/LoadingComponent/Loading';
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar';
import { baseUrl } from '../../Server/baseUrl';


const columns = [
    {
        field: 'empId',
        headerName: 'Emp Id',
        minWidth: 100,
        flex:1.5,
        headerClassName: 'table-header',
        renderCell: (params) => {
            return (

                <Box sx={{display: 'flex',justifyContent: 'space-around',width:"100vw"}}>

                    <div style={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                    <Typography>{params.row.empId}</Typography>
                    </div>

                    <div style={{height:"50px",width:"50px",borderRadius:"50%"}}>
                        <img src={`${baseUrl}/employee/load-profile-pic/${params.row.empId}`} style={{height:"50px",width:"50px",borderRadius:"50%"}}></img>
                    </div>

                </Box>
            )
        }

    },
    {
        field: 'empName',
        headerName:'Name',
        label: 'Name',
        minWidth: 170,
        flex:1.8,
        headerClassName: 'table-header',
    },
    {
        field: 'emailId',
        headerName:'Email',
        label: 'Email',
        minWidth: 220,
        flex:2.5,
        headerClassName: 'table-header',
    },
    {
        field: 'dateOfJoining',
        headerName:'Date Of Joining',
        label: 'Date Of Joining',
        minWidth: 110,
        flex:1.5,
        headerClassName: 'table-header',
        valueFormatter: params => 
        moment(params?.value).format("DD/MM/YYYY"),
    },
    {
        field: 'contactNo',
        label: 'Contact',
        minWidth: 150,
        flex:2,
        headerName:'Contact',
        headerClassName: 'table-header',
    },
    {
        field: 'location',
        label: 'Location',
        minWidth: 100,
        flex:1,
        headerName:'Location',
        headerClassName: 'table-header',
    },
    {
        field: 'workingfrom',
        label: 'Work-Loc    ',
        minWidth: 100,
        flex:1,
        headerName:'Working From',
        headerClassName: 'table-header',
    },
   
];

export default function EmployeeLocTable(props) {
    const navigate = useNavigate();
    const handleRowClick = (params) => {
        const employeeDetailsUrl=`../user/${params.id}`;
        window.open(employeeDetailsUrl, '_blank');
        // navigate(`../${params.id}`)
    };
let data=props.location
const [isLoading,setIsLoading]=useState(false)
    const [location,setlocation]=useState([])
    useEffect(()=>{
setlocation(data)
    },[data])

const backbutton=useNavigate()

    return (
        isLoading?<Loading></Loading>:

        <Box sx={{
            height: 400,
            width: 'auto',
        }}>
        
                
                             
            <Box style={{height:"70vh",width:"auto",marginLeft:"10px",marginRight:"10px",marginTop:"10px"}}>
                <DataGrid sx={{
                   
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },
                    
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer'
                    }
                }}
                rows={location}
                    columns={columns}
                    onFilterModelChange={props.handlefilter1(true)}
                    pageSize={8}
                    getRowId={(loc) => loc.empId}
                    rowsPerpageOptions={[8,15,25,50,75]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 8 } },
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
       
    )
}
