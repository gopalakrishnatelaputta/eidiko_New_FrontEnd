import { Grid, Paper , TextField, Button, Input,Box,Link,Typography,Container, Divider} from "@mui/material";
import FingerprintIcon from '@mui/icons-material/Fingerprint';

import InventoryIcon from '@mui/icons-material/Inventory';
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import Swarm from "../../images/Swarm.png"
import { useState } from "react";
import { BiometricServiceModule } from "../../Services/BiometricService/BiometricServiceModule";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useDropzone } from "react-dropzone";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import axios from "axios";
import { toast } from "react-toastify";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Loading from "../../Components/LoadingComponent/Loading";
import upload from "../../images/upl.png"
import { baseUrl } from "../../Server/baseUrl";
import { hasAuthority } from "../../Services/AccessLevel/AccessLevelService";
import { NoAuth } from "../../Components/HelperComponent/NoAuth";
import {FormControl,FormLabel,FormGroup,FormControlLabel} from '@mui/material';
import {InputLabel} from '@mui/material';
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
import { GlobalButton } from "../../Components/stylecomponent/GlobalButton";

export const  LEAVES_DATA_UPLOAD_PAGE_TITLE= " LEAVES_DATA_UPLOAD"

export default function LeaveDataUpload(){

    const[monthYear,setmonthYear]=useState({"month":"","year":""})
    const getime11=(e)=>{setmonthYear({...monthYear, [e.target.name]: e.target.value})}
   
const[leave,setLeave]=useState([])


const fileHandler=(file)=>{
  setLeave(file[0])
}
const token = localStorage.getItem("token")

let form =new FormData()
form.append("file",leave)
form.append("month",monthYear.month)
form.append("year",monthYear.year)
const[isloading,setisloading]=useState(false)


const fileDataSubmit=(e)=>{
    e.preventDefault()
   setisloading(true)

   if(leave.length==0){
    toast.info("Please select a file to upload",{position:toast.POSITION.TOP_RIGHT})
    setisloading(false)
    return
}

else{

axios({
    method: "post",
    url: `${baseUrl}/leaves/attendance/upload-xls`,
    data:form,
    headers: { "Content-Type": 'multipart/form-data' ,"Authorization" : 'Bearer ' + token},
  }).then((res)=>{
 if(res.status===200 && res.data.statusMessage==="success"){
    setisloading(false)
    toast.success(res.data.message,{position:toast.POSITION.TOP_RIGHT})
    setLeave("");
}
else if( res.status===200 && res.data.status===400){
    setisloading(false)
    toast.info(res.data.message,{position:toast.POSITION.TOP_RIGHT})

}
else{
    setisloading(false)
    toast.error(res.data.message,{position:toast.POSITION.TOP_RIGHT})
}

}).catch((error)=>{
    setisloading(false)
    toast.error(error.response.data.message,{position:toast.POSITION.TOP_RIGHT})
})

}
}


return hasAuthority(LEAVES_DATA_UPLOAD_PAGE_TITLE)?(
    isloading?<Loading></Loading>:
    <Box style={{backgroundColor:"#FFFFFF",height:"auto"}}>
        <form onSubmit={fileDataSubmit} method="post" enctype="multipart/form-data">

    
    <Box sx={{
           display: 'flex',
           alignContent: 'center',
           justifyContent: 'space-between',
           alignContent:"center",
           
       }}>
        <Typography color={"secondary"}  style={{marginLeft:"10px",fontSize:"21px",marginTop:"20px",fontFamily:"Times New Roman Times"}}>LEAVES UPLOAD</Typography>
          
       </Box>




  <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
    
    <section className="dropbox">

    <Container style={{padding:"20px",marginTop:10}} className="container">
        <Paper elevation={0} style={{width:"auto"}} >
        
        
        <Box sx={{ flexFlow: 1 }}>
            <Grid sx={{display:"flex"}} container spacing={1} gap={3}  justifyContent={"center"}
             alignItems={"center"} alignContent={"center"}>

                <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>


   <Dropzone   id="file-upload" maxFiles={3} multiple={true} loading={false} value={leave}  onDrop={fileHandler} 
   >
       
       <Grid container style={{height:"30vh",minWidth:"35vw",}} >
      

        <Grid item xs={12} sx={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
        <Typography align="center"> Drag  or click here to select files</Typography>
        
        </Grid>

      <Grid item xs={12} sx={{ display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
            {/* <InventoryIcon  sx={{borderRadius:"50%",fontSize:"90px"}}></InventoryIcon> */}
            <img style={{width:"150px",height:"auto"}}src={upload}></img>
            {/* 'https://www.pngall.com/wp-content/uploads/2/Upload-PNG-Image-File.png' */}
        </Grid>
        
<Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
<Button variant="outlined">Select File <InsertDriveFileOutlinedIcon style={{fontSize:"16px"}}/></Button>
</Grid>

      </Grid>   
       </Dropzone>

                </Grid>


 
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center',
                        alignItems:'center'
                        
   
   }}>


<Box sx={{width:500}}>
{/* <Typography variant='h6'>Shift Start</Typography> */}
<Grid container>
  <Grid item xs={6} sx={{display:"flex"}}> 
  <FormControl sx={ {width: 240 ,marginTop:"5px"}}>
<InputLabel id="demo-multiple-name-label">Month</InputLabel>
        <Select 
      value={monthYear.month}
         onChange={getime11}
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
      </FormControl>   
</Grid>
<Grid item xs={6} sx={{display:"flex"}}> 
         
        <TextField  style={{marginTop:"5px",marginLeft:"20px"}} required name="year"  value={monthYear.year} onChange={getime11} label="Year" type="number"  
        InputProps={{ inputProps: { max:9999,min:2000} }} sx={{width:240}}></TextField>
   
         </Grid>

</Grid>
 
   </Box>
   </Grid>


<Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>

                        <Button disableElevation endIcon={ <FileUploadOutlinedIcon/>} type="submit" sx={{marginBottom:"10px"}} style={GlobalButton.OperationButton} variant='contained' >Upload </Button>
                    </Grid>
            

            </Grid>
        </Box>
        {/* </form> */}
        </Paper>
    </Container>
    </section>
   { leave.length===0 ? null: <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",marginLeft:"55px",marginTop:"15px"}}>
    <Input disabled  id="uploadFile" value={leave?.path}></Input>
<Button onClick={(e)=>{setLeave([])}} type="reset"><ClearOutlinedIcon  style={{color:"red"}}/></Button>
</Grid>}

<GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>

</form>

</Box>


   


    ):<NoAuth></NoAuth>

}