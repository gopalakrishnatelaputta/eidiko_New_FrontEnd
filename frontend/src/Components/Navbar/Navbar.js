import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalButton } from '../stylecomponent/GlobalButton';
import {Paper} from '@mui/material';
import { useState } from 'react';

import './ProfilePic55.css'

//logout

import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import { ListItemButton, ListItemIcon, ListItemText, Modal } from '@mui/material';
import SideNavBar from './SideNavBar';
import userServiceModule from '../../Services/user-service/UserService';

//socialButton
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GoogleIcon from '@mui/icons-material/Google';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

//const pages=['Home','Service','About'];
import CancelIcon from '@mui/icons-material/Cancel';
import {Grid} from '@mui/material';
import { baseUrl } from '../../Server/baseUrl';
import { toast } from 'react-toastify';
import axios from 'axios';




function ResponsiveAppBar() {

  function ClickNavbar(){

    return (
      <SideNavBar close={()=>{setreportm(false)}}></SideNavBar>
    )
  }



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
const[reportm,setreportm]=React.useState(false)
const handleNavOpen=()=>{
  setreportm(true)
}
const handleNavclose=()=>{
  setreportm(false)
}
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //LogOut
  const navigate = useNavigate()
  const logoutHandle = () => {
    Swal.fire({
      icon: "warning",
      iconColor:"#d50000",
      title: 'Do you want to Leave?',
      showCancelButton: true,
      confirmButtonColor: '#2196F3',
      cancelButtonColor: '#d50000'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout successfully completed ! Redirecting to Login page...',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/login")
      } 
    })
   
   }

  
  const navigate1=useNavigate()

//socialButtons
const [value, setValue] = React.useState('recents');

const handleChange = (event, newValue) => {
  setValue(newValue);
};
//
//for profile pic upload
const profilePic=(file)=>{
  let form =new FormData()  //for uploading mulitpart file 
form.append("file",file.target.files[0]) //it append the uploaded file and store in form
 
axios({ //it is used to call the service to conmplt the operation(upload)
   method: "post",
   url: `${baseUrl}/employee/update-profile-pic`,
   data:form,
   headers: { "Content-Type": 'multipart/form-data' ,"Authorization" : 'Bearer ' + token},
 }).then((res)=>{
   console.log(res);
if(res.status===200  && res.data.statusMessage==="success"){
  //  setisloading(false)
   toast.success(res.data.message,{position:toast.POSITION.TOP_RIGHT})
   window.location.reload() //auto reload
   
}
else if( res.status===200 && res.data.status===400){
  //  setisloading(false)
   toast.info(res.data.message,{position:toast.POSITION.TOP_RIGHT})

}
else{
  //  setisloading(false)
   toast.error(res.data.message,{position:toast.POSITION.TOP_RIGHT})
}

}).catch((error)=>{
  //  setisloading(false)
   toast.error(error.response.data.message,{position:toast.POSITION.TOP_RIGHT})
})


}
const token = localStorage.getItem("token")


const getprofilepic1 =`${baseUrl}/employee/load-profile-pic/${localStorage.getItem("id")}` //by that baseUrl we are getting image
//navigation to profile

const [menuOpen, setMenuOpen] = useState(false);
const [anchorEl, setAnchorEl] = useState(null);
const [selectedMenuItem, setSelectedMenuItem] = useState(null);
const history = useNavigate();


const handleButtonClick = (event) => {
  setAnchorEl(event.currentTarget);
  setMenuOpen(!menuOpen);
};
// const handleMenuItemClick = (route) => {
//   // Close the menu
//   setMenuOpen(false);

//   // Navigate to the selected route
//   history.push(route);

//   // Update the selected menu item
//   setSelectedMenuItem(route);
// };

//navigation to profile
const profilebutton=useNavigate()
const forgotbutton=useNavigate()
// const history = useNavigate();
// const profilebutton=(route)=>{
//   setMenuOpen(false);
//   // history("/user/profile");

// }
// const forgotbutton=(route)=>{
//   setMenuOpen(false);
//   // history("/user/profile");

// }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:"flex",justifyContent:"space-between"}}>
          
         {userServiceModule.isLogedin ? <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            EIDIKO
          </Typography>: <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            EIDIKO
          </Typography>}



{
  userServiceModule.isLogedin()?
  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
  <IconButton
    size="large"
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={handleNavOpen}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>

  <Modal  sx={{overflow:"scroll"}}
            open={reportm}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
<Paper  elevation={0} sx={{width:"250px",minHeight:"820px",backgroundColor:"#2196F3",color:"#FFFFFF"}}>
<IconButton
    size="large"
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={handleNavclose}
    color="inherit"
  >
    <CancelIcon  sx={{width:"40px",fontSize:"40px",borderRadius:"50%"}} />
  </IconButton>

<ClickNavbar></ClickNavbar>

</Paper>
  </Modal>
  
   
  
</Box>:null
}
        
{/* this is for small screen */}

<Grid sx={{justifyContent:"space-between",mr: 2,
              display: { xs: 'flex', md: 'none' },}}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            EIDIKO
            
          </Typography>
          {userServiceModule.isLogedin()? 
          <Grid item  xs={12} sm={12} md={4} lg={4} xl={4} className='wrapper2'
                              style={{backgroundImage:`url(${getprofilepic1})`,
                              // marginRight:"90px",marginLeft:"169px"
                            }}
                               onClick={handleButtonClick} >
                                <Menu 
                                  anchorEl={anchorEl}
                                  open={menuOpen}
                                  onClose={() => setMenuOpen(false)}
                                >
                                  <MenuItem style={{backgroundColor:'transparent',
                                  //  border: '0.1px solid #3e8dd6',
                                   color:"#3e8dd6",borderRadius:"15px"}} 
                                  onClick={()=>{profilebutton("/user/profile")}}
                                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#dae4f5')}
                                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                                  // disabled={selectedMenuItem === '/user/profile'}
                                  >
                                    Profile
                                  </MenuItem>
                                  <MenuItem style={{backgroundColor:'transparent',
                                  
                                   color:"#3e8dd6",marginTop:"1.2px",borderRadius:"15px"}} 
                                  onClick={() => {forgotbutton('/user/change-password')}}
                                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#dae4f5')}
                                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                                  // disabled={selectedMenuItem === '/user/change-password'}
                                  >
                                    Change Password
                                  </MenuItem>
                                </Menu>
                             
                              {/* <form enctype="multipart/form-data" >
                             <input  type='file' className='my_file'  onChange={profilePic}></input>
          </form> */}
                            </Grid>:null}
          
          </Grid>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>        
          <Stack  direction="row" spacing={2}>

        
         
         <Grid Container sx={{justifyContent:'flex-end'}}>
{/* this is for large screen */}

{userServiceModule.isLogedin() &&   <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'flex',lg:"flex",xl:"flex" }}}>
          <Grid item  xs={12} sm={12} md={4} lg={4} xl={4} className='wrapper2'
                              style={{backgroundImage:`url(${getprofilepic1})`, }} onClick={handleButtonClick} >
                                <Menu 
                                  anchorEl={anchorEl}
                                  open={menuOpen}
                                  onClose={() => setMenuOpen(false)}
                                >
                                  <MenuItem style={{backgroundColor:'transparent',
                                  //  border: '0.1px solid #3e8dd6',
                                   color:"#3e8dd6",borderRadius:"15px"}} 
                                  onClick={()=>{profilebutton("/user/profile")}}
                                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f7f5f5')}
                                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                                  // disabled={selectedMenuItem === '/user/profile'}
                                  >
                                    Profile
                                  </MenuItem>
                                  <MenuItem style={{backgroundColor:'transparent',
                                  
                                   color:"#3e8dd6",marginTop:"1.2px",borderRadius:"15px"}} 
                                  onClick={() => {forgotbutton('/user/change-password')}}
                                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#f7f5f5')}
                                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                                  // disabled={selectedMenuItem === '/user/change-password'}
                                  >
                                    Change Password
                                  </MenuItem>
                                </Menu>
                             
                            </Grid>
          <Button  disableElevation sx={{borderRadius:"40px",marginLeft:"15px"}} type='submit' 
          variant="contained"
          endIcon={<LogoutIcon />} onClick={logoutHandle} >
            Logout
          </Button>
          </Grid>
}
          {
            !userServiceModule.isLogedin() && 
            <Grid item xs={12}>
  <Button  disableElevation sx={{borderRadius:"40px"}} onClick={()=>{navigate1("/login")}} type='submit'
            variant="contained"
            endIcon={<LogoutIcon />} >
              Login
            </Button>
            </Grid>
          }

         </Grid>
        
         
         
         </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;