import { Box, Grid } from '@mui/material'
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import userServiceModule from '../../Services/user-service/UserService'
import SideNavBar from '../../Components/Navbar/SideNavBar'


const UserRoute = () => {
   

    return userServiceModule.isLogedin()?(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={12} md={2.5} lg={2.5} xl={2.5}  sx={{
                    backgroundColor: '#2196F3',
                    color: '#fff',
                    minHeight: '90vh',
                    margin: '20px 0px',
                    display: { xs: 'none', sm: 'none', md: 'flex',lg:"flex",xl:"flex" }
                }}>
                    <SideNavBar />
                </Grid>

                <Grid item xs={12} sm={12} md={9.5} lg={9.5} xl={9.5}>
                    <Outlet />
                </Grid>
            </Grid>

        </Box>
    ) : <Navigate to='/login' />
}

export default UserRoute