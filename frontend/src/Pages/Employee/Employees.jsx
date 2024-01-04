
import { Box, Button, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { getAllEmployees, getEmpDataByLoc } from '../../Services/employee-service/EmployeeService'
import { toast } from 'react-toastify'
import './employee.css'
import { Navigate, useNavigate } from 'react-router'
import { Create, Delete } from '@mui/icons-material'
import Swal from 'sweetalert2';
import Groups2Icon from '@mui/icons-material/Groups2';
import { Grid } from '@mui/material'
import Loading from "../../Components/LoadingComponent/Loading";
import moment from 'moment/moment'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { deleteEmployeeService } from '../../Services/employee-service/EmployeeService'
import { NoAuth } from '../../Components/HelperComponent/NoAuth'
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService'
import { CREATE_EMPLOYEE_PAGE_TITLE } from './CreateEmployee'
import PreviewIcon from '@mui/icons-material/Preview';
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import SearchIcon from '@mui/icons-material/Search';
import EmployeeLocTable from './EmployeeLocTable'
import { SerchingComponetsstyle } from '../../Components/stylecomponent/SerchingComponetsStyle'
import { CustomToolBar } from '../../Components/DataGridDataDownload/CustomToolBar'
import { baseUrl } from '../../Server/baseUrl'


export const EMPLOYEE_TABLE_PAGE_TITLE = "EMPLOYEE_TABLE"
export const EMPLOYEE_DELETE_BUTTON = "DELETE_BUTTON"

const Employees = () => {
    const [backButoon1, setbackButton1] = useState(false)
    const [reload, setreload] = useState(false)
    const handlefilter = () => {
        setbackButton1(true)
    }

    const handlefilter1 = (data) => {
        setbackButton1(data)
    }


    const fetchEmployee = () => {

        setIsLoading(true)
        getAllEmployees().then(

            res => {
                if (res.status == 200 && res.statusMessage === 'success') {
                    setIsLoading(false)
                    setEmployees(res.result)
                } else {
                    setIsLoading(false)
                }

            }
        ).catch(err => {
            setIsLoading(false)
        })
    }


    const [employees, setEmployees] = useState([]);

    const [isLoading, setIsLoading] = useState(true)
    const [empId, setEmpId] = useState()

    useEffect(() => {

        fetchEmployee()
        setbackButton1(false)

    }, [reload]);

    const navigate = useNavigate();
    const NavigateCreateEmployee = () => {
        navigate('../create-employee')
    }
    const handleRowClick = (params) => {

        const employeeDetailsUrl = `../user/${params.id}`;
        window.open(employeeDetailsUrl, '_blank');
        // navigate(`../${params.id}`)
    };

    const backbutton = useNavigate()

    const onButtonClick = (e, row, action) => {
        e.stopPropagation();
        e.preventDefault();
        if (action === 'delete') {

            Swal.fire({
                icon: "warning",
                iconColor: "#d50000",
                title: 'Do you want to delete this ' + row.empId,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                confirmButtonColor: '#2196F3',
                cancelButtonColor: '#d50000'


            })

                .then((result) => {
                    if (result.isConfirmed) {
                        deleteEmployeeService(row.empId).then((res) => {

                            if (res.status === 200) {
                                Swal.fire('Deleted!', '', 'success')
                                window.location.reload()
                            }
                            else {
                                Swal.fire("Employee doesn't exist", '', "error")
                            }
                        })

                    }
                })
        }
    };


    //------------------ Location Search---------------------------------

    const [empLoc, setEmpLoc] = useState([]);
    function fetchLocation(loc) {
        setIsLoading(true)
        getEmpDataByLoc(loc).then((res) => {
            if (res.status === 200) {
                if (res.result.length == 0) {
                    toast.info("No Records Found  for " + loc, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
                setEmpLoc(res.result)
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }

        }).catch((err) => {
            setIsLoading(false)
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }

    const [location, setLocation] = useState("ALL");

    const handleSearchData = (e) => {
        e.preventDefault()

        setEmpLoc([])

        if (location !== "ALL") {
            fetchLocation(location)
            setbackButton1(false)
        }
        else if (location === "ALL") {
            fetchEmployee()
            setbackButton1(false)

        }
    }


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
            headerName: 'Name',
            label: 'Name',
            minWidth: 200,
            flex: 3,
            headerClassName: 'table-header',
        },
        {
            field: 'emailId',
            headerName: 'Email',
            label: 'Email',
            minWidth: 280,
            flex: 4,
            headerClassName: 'table-header',
        },
        {
            field: 'dateOfJoining',
            headerName: 'Date Of Joining',
            label: 'Date Of Joining',
            minWidth: 120,
            flex: 2,
            headerClassName: 'table-header',
            valueFormatter: params =>
                moment(params?.value).format("DD/MM/YYYY"),
        },
        {
            field: 'contactNo',
            label: 'Contact',
            minWidth: 110,
            flex: 2,
            headerName: 'Contact',
            headerClassName: 'table-header',
        },

        {
            field: 'status',
            label: 'Status',
            headerName: 'Status',
            minWidth: 100,
            flex: 1.5,
            headerClassName: 'table-header',
        },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     minWidth: 80,
        //     flex: 1.5,
        //     headerClassName: 'table-header',
        //     renderCell: (params) => {
        //         return hasAuthority(EMPLOYEE_DELETE_BUTTON) ? (
        //             <Box sx={{
        //                 display: 'flex',
        //                 justifyContent: 'center'
        //             }}>
        //                 <IconButton variant="contained" color='error'
        //                     onClick={(e) => onButtonClick(e, params.row, 'delete')}
        //                 ><Delete /></IconButton >

        //             </Box>
        //         ) : <Box sx={{
        //             display: 'flex',
        //             justifyContent: 'center'
        //         }}>
        //             <IconButton variant="contained" color='error'>
        //                 <PreviewIcon color='secondary' sx={{ marginRight: "39px" }} />

        //             </IconButton >

        //         </Box>
        //     }
        // },
        {
            field: 'actions6',
            headerName: 'View',
            minWidth: 80,
            flex: 1.5,
            headerClassName: 'table-header',
            renderCell: (params) => {
                return (

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    >

                        <IconButton variant="contained" color='error'>
                            <PreviewIcon color='secondary' sx={{ marginRight: "39px" }} />

                        </IconButton >

                    </Box>
                )
            }
        }



    ];



    return hasAuthority(EMPLOYEE_TABLE_PAGE_TITLE) ? (
        isLoading ? <Loading /> :
            <Box style={SerchingComponetsstyle.firstBox}>
                <Box style={SerchingComponetsstyle.SecondBox}>

                    <Typography style={SerchingComponetsstyle.typographystyle}>EMPLOYEES</Typography>

                    <Grid style={{ justifyContent: "center" }}>

                        {hasAuthority(CREATE_EMPLOYEE_PAGE_TITLE) ?
                            <Button variant='outlined' className='style'
                                style={SerchingComponetsstyle.backbuttonstyle} startIcon={<FaUserPlus />}
                                onClick={NavigateCreateEmployee} >
                                CREATE EMPLOYEE
                            </Button> : null
                        }
                        {
                            backButoon1 ? <Button variant='outlined' style={SerchingComponetsstyle.backbuttonstyle}
                                onClick={() => { setreload(!reload) }}
                                startIcon={<ArrowBackIosNewIcon />}>
                                back
                            </Button> : null
                        }
                    </Grid>
                </Box>

                <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

                <form onSubmit={handleSearchData}>
                    <Box style={SerchingComponetsstyle.Thirdbox} >


                        <Grid container style={SerchingComponetsstyle.gridContainerStyle}>

                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >
                                <FormControl style={SerchingComponetsstyle.FormControlstyle}>
                                    <InputLabel id="demo-multiple-name-label" >Work Location</InputLabel>
                                    <Select
                                        value={location}
                                        onChange={(e) => { setLocation(e.target.value) }}
                                        labelId='demo-multiple-name-label'
                                        id="demo-multiple-start"
                                        label="Work Location"

                                    >
                                        <MenuItem value="ALL">ALL</MenuItem>
                                        <MenuItem value="WFO">WFO</MenuItem>
                                        <MenuItem value="WFH">WFH</MenuItem>
                                        <MenuItem value="CLIENT_LOCATION">CLIENT_LOCATION</MenuItem>
                                    </Select>

                                </FormControl>
                            </Grid>

                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={SerchingComponetsstyle.griditemstyle} >
                                <Button value="click" variant='outlined' type='submit'
                                    style={SerchingComponetsstyle.searchbuttonstyle} endIcon={<SearchIcon />}>
                                    search
                                </Button>
                            </Grid>

                        </Grid>

                    </Box>
                </form>

                <GlobalButton.GlobalDivider></GlobalButton.GlobalDivider>

                {
                    empLoc.length > 0 ? <Box>
                        <EmployeeLocTable handlefilter1={handlefilter1} Loading={isLoading} location={empLoc}></EmployeeLocTable>
                    </Box> :
                        <Box style={SerchingComponetsstyle.DatagridBoxStyle}>


                            <DataGrid
                                rows={employees}
                                columns={columns}

                                onFilterModelChange={handlefilter}
                                getRowId={(employee) => employee.empId}
                                initialState={{
                                    ...employees.initialState,
                                    pagination: { paginationModel: { pageSize: 8 } },
                                }}
                                pageSizeOptions={[8, 15, 25, 50, 75]}
                                onRowClick={handleRowClick}
                                slots={{
                                    toolbar: CustomToolBar,
                                }}
                            >



                            </DataGrid>


                        </Box>
                }



            </Box>
    ) : <NoAuth></NoAuth>
}

export default Employees



