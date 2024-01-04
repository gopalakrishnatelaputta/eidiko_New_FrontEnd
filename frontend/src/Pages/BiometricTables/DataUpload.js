
import { Grid, Paper , TextField, Button, Input,Box,Link,Typography,Container, Divider, Modal, Card, MenuItem, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, InputLabel, Select} from "@mui/material";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";
import { BiometricServiceModule } from "../../Services/BiometricService/BiometricServiceModule";
import { useNavigate } from "react-router";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import axios from "axios";
import { toast } from "react-toastify";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Loading from "../../Components/LoadingComponent/Loading";
import upload from "../../images/upl.png"
import { baseUrl } from "../../Server/baseUrl";
import { hasAuthority } from "../../Services/AccessLevel/AccessLevelService";
import { NoAuth } from "../../Components/HelperComponent/NoAuth";
import { GlobalButton } from "../../Components/stylecomponent/GlobalButton";
import MissingReportUpdateModal from "./MissingReports/MissingReportUpdateModal";
import { SerchingComponetsstyle } from "../../Components/stylecomponent/SerchingComponetsStyle";

export const  BIOMETRIC_DATA_UPLOAD_PAGE_TITLE= "BIOMETRIC_DATA_UPLOAD"


export default function DataUpload(){

const[biometric,setBiometric]=useState([])
const [open, setOpen] = useState(false);
const [bmonth, setBMonth] = useState((new Date().getMonth()+1).toString());
  const [byear, setBYear] = useState(new Date().getFullYear().toString()); 


  // to show month name in response
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const monthName = monthNames[parseInt(bmonth, 10) - 1];

// to show month name in response

  const getime11 = (e) => {
    const { name, value } = e.target;
    if (name === 'month') {
      setBMonth(value);
    } else if (name === 'year') {
      setBYear(value)
    }
  };
  const handleSerchData = (e) => {
    e.preventDefault();
    setOpen(false)
    handleUpdateClick()
  };

  const handleOpen=()=>{
    setOpen(true)
  }
const handleClose = () => {
    setOpen(false);
  };
const fileHandler=(file)=>{
  setBiometric(file[0])
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
       // width: width?width:"150px",
      },
    },
  };
const token = localStorage.getItem("token")
let form =new FormData()
form.append("file",biometric)

const[isloading,setisloading]=useState(false)

const fileDataSubmit=(e)=>{
    e.preventDefault()
    setisloading(true)
    if(biometric.length==0){
        toast.info("Please select a file to upload",{position:toast.POSITION.TOP_RIGHT})
        setisloading(false)
        return
    }
else{

axios({
    method: "post",
    url: `${baseUrl}/biometric/add-file`,
    data:form,
    headers: { "Content-Type": 'multipart/form-data' ,"Authorization" : 'Bearer ' + token},
  }).then((res)=>{
 if(res.status===200 && res.data.status==="Success"){
    setisloading(false)
    toast.success(res.data.message,{position:toast.POSITION.TOP_RIGHT})
    setBiometric("");
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


  //backbutton
  const backbutton=useNavigate()

  


  const handleUpdateClick = ()=>{

    setisloading(true);
    BiometricServiceModule.updateIsLateReport(bmonth,byear).then(
        res=>{
           if(res.status === 200){
            setisloading(false)
            toast.success(res.message+"for month : "+monthName +" "+byear,{position:toast.POSITION.TOP_RIGHT})
           }
        }
    ).catch(
        
        error=>{
            setisloading(false)
            toast.success("Not Updated",{position:toast.POSITION.TOP_RIGHT});}
    )

  }

const[updatemissingreport,setupdatemissingreport]=useState(false)

  const handleUpdateClick1 = (e)=>{
  e.preventDefault()
  setupdatemissingreport(!updatemissingreport)
  }


return hasAuthority(BIOMETRIC_DATA_UPLOAD_PAGE_TITLE)?  (
    isloading?<Loading></Loading>:
    
    <Box  sx={{height:"90vh",padding:"10px",overflow:"auto",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
       

        <Card sx={{width:"450px",padding:"20px"}}>
            <Grid container spacing={1.2} style={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
           



            <Dialog sx={{ width: '100%' }} open={open} onClose={handleClose}>
      <DialogTitle >Please select Month and Year</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSerchData}>
          <Box style={{display:"flex",justifyContent:"space-between",alignContent:"center",alignItems:"center",marginTop:'10px'}}>
          <Grid container style={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",marginLeft:'-50px'}}>
            <FormControl style={{width: 150 ,minWidth:"90px"}}>
                <InputLabel id="demo-multiple-name-label">Month</InputLabel>
                <Select
                  size="small"
                  value={bmonth}
                  onChange={getime11}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-start"
                  name="month"
                  label="Month"
                  MenuProps={MenuProps}
                >
          <MenuItem value="1" >January</MenuItem>
          <MenuItem value="2" >February</MenuItem>
          <MenuItem value="3" >March</MenuItem>
          <MenuItem value="4" >April</MenuItem>
          <MenuItem value="5" >May</MenuItem>
          <MenuItem value="6" >June</MenuItem>
          <MenuItem value="7" >July</MenuItem>
          <MenuItem value="8" >August</MenuItem>
          <MenuItem value="9" >September</MenuItem>
          <MenuItem value="10" >October</MenuItem>
          <MenuItem value="11" >November</MenuItem>
          <MenuItem value="12" >December</MenuItem>
                </Select>
              </FormControl>
            </Grid>

        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={{display:"flex",justifyContent:"space-between",alignContent:"center",alignItems:"center",marginRight:'60px'}}>
              <TextField
                size="small"
                style={SerchingComponetsstyle.textFieldStyle}
                required
                name="year"
                value={byear}
                onChange={getime11}
                label="Year"
                type="number"
                InputProps={{ inputProps: { max: 9999, min: 2000 } }}
              />
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions sx={{ display:'flex',
            justifyContent:'center',}}>
        <Button
         type="submit"
          style={{
           
            width: '40px',
            marginRight: '8px',
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '20px',
            marginBottom: '20px',
            minWidth: '120px',
          }}
          onClick={handleSerchData}
        >
          Proceed
        </Button>
        <Button
          style={{
            width: '40px',
            backgroundColor: 'rgb(213, 0, 0)',
            color: 'white',
            borderRadius: '20px',
            marginBottom: '20px',
            minWidth: '120px',
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>



           
            <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
           <Typography variant='h6' style={SerchingComponetsstyle.typographystyle}>BIO-METRIC</Typography>
           </Grid>
           <form onSubmit={fileDataSubmit} method="post" enctype="multipart/form-data">
                <Grid item xs={12} sx={{display:'flex',
                justifyContent:'center',
                alignItems:'center'}}>


   <Dropzone id="file-upload" maxFiles={3} multiple={true} loading={false} value={biometric}  onDrop={fileHandler} >
       
       <Grid container style={{height:"25vh",minWidth:"300px",}} >
      

        <Grid item xs={12} sx={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
        <Typography align="center"> Drag  or click here to select files</Typography>
        
        </Grid>

      <Grid item xs={12} sx={{ display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
            {/* <InventoryIcon  sx={{borderRadius:"50%",fontSize:"90px"}}></InventoryIcon> */}
            <img style={{width:"150px",height:"auto"}}src={upload}></img>
            {/* 'https://www.pngall.com/wp-content/uploads/2/Upload-PNG-Image-File.png' */}
        </Grid>
<Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}>
{/* <Input disabled id="uploadFile"></Input> */}<Button variant="outlined">Select File <InsertDriveFileOutlinedIcon style={{fontSize:"16px"}}/></Button>
</Grid>


          
      </Grid>   
       </Dropzone>

                </Grid>

<Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>

                        <Button  disableElevation endIcon={<FileUploadOutlinedIcon/>} type="submit" sx={{marginTop:"15px"}}  variant='contained'  style={GlobalButton.OperationButton}>Upload </Button>
                    </Grid>
            
                    </form>
            </Grid>
            { biometric.length===0 ? null: <Grid item xs={12} sx={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",marginLeft:"55px",marginTop:"15px"}}>
    <Input disabled  id="uploadFile" value={biometric?.path}></Input>
<Button onClick={(e)=>{setBiometric([])}} type="reset"><ClearOutlinedIcon  style={{color:"red"}}/></Button>
</Grid>}


<Box   sx={{display:"flex"}}>
<Grid container spacing={3} sx={{display:"flex"}}>
  <Grid item xs={6} sx={{display:"flex",justifyContent:"flex-end"}}> 
  <Button   sx={{mt:2,minWidth:70,height:40,borderRadius:40,width:160}} onClick={handleOpen} variant='contained' >Update Biometric</Button>   
</Grid>
<Grid item xs={6} sx={{display:"flex"}}> 
<Button  sx={{mt:2,minWidth:70,height:40,borderRadius:40,width:160}} onClick={handleUpdateClick1} variant='contained' >Update Missing Reports</Button>

<Modal open={updatemissingreport}>
<MissingReportUpdateModal onClose={()=>{setupdatemissingreport(false)}} />
</Modal>

</Grid>
</Grid>

</Box>

        </Card>
        {/* </form> */}

   
</Box>


    ):<NoAuth></NoAuth>

}