
import { Box,TextField,Typography,Paper,Grid,Container, Autocomplete, FormControl, MenuItem, Select, InputLabel} from '@mui/material';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {Divider} from '@mui/material';
import Loading from '../../Components/LoadingComponent/Loading';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { hasAuthority } from '../../Services/AccessLevel/AccessLevelService';
import { NoAuth } from "../../Components/HelperComponent/NoAuth";
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton';
import { WarningMailServices } from '../../Services/WarningMailServices/WarningMailServices';
import { Dropzone } from '@mantine/dropzone';
import { WarningmailCreationStyle } from './WarningMailCreationStyle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { baseUrl } from '../../Server/baseUrl';
import axios from 'axios';



export const  WARNING_MAILS_CREATION_PAGE_TITLE= "WARNING_MAILS_CREATION"



export default function CreateWarningMailsPage(){

     
    const[attachments,setAttachments]=useState([])

    const fileHandler=(file)=>{
        let arr1=[]
        for(let i=0;i<file.length;i++){
            arr1.push(file[i])
        }
        setAttachments(arr1)
    }


 const [isloading ,setIsLoading]=useState(false)
  const[warningmails,setwarningmails]=useState({
    "empId":"",
    "title":"",
    "description":"",
    "warningDate":dayjs().format("YYYY-MM-DD"),
    "severityLevel":"",
    "warningLevel":""
  })
const token = localStorage.getItem("token")
 let empid=localStorage.getItem("id")
let form =new FormData()
attachments.forEach((value)=>{
    form.append("attachments",value)
})
form.append("empId",warningmails.empId)
form.append("title",warningmails.title)
form.append("description",warningmails.description)
form.append("warningDate",warningmails.warningDate)
form.append("severityLevel",warningmails.severityLevel)
form.append("warningLevel",warningmails.warningLevel)

const WarningMailHandle=(e)=>{
    e.preventDefault()
    
    setIsLoading(true)
    axios({
        method: "post",
        url: `${baseUrl}/warningmail/send-mail/${empid}`,
        data:form,
        headers: { "Content-Type": 'multipart/form-data' ,"Authorization" : 'Bearer ' + token},
      }).then((res)=>{
        console.log(res);
        if(res.status===200 && res.data.statusMessage==='Success'){
           
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            setwarningmails({
                "empId":"",
                "title":"",
                "description":"",
                "warnedDate":dayjs().format("YYYY-MM-DD"),
                "severityLevel":"",
                "warningLevel":""    
            })
           
        }
        else{
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500
            }
            )
        }

    }).catch((error)=>{
        setIsLoading(false)
        Swal.fire(
            {
                position: 'center',
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            }

        )

    })

    setAttachments([])

}


 //AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();

useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })
    },[records])

    
    return hasAuthority(WARNING_MAILS_CREATION_PAGE_TITLE)?   (
        isloading ? <Loading/> :
        <Box style={ WarningmailCreationStyle.firstbox}>
          <Box style={WarningmailCreationStyle.SecondBox}>
                
                <Typography   style={WarningmailCreationStyle.typographyStyle}>CREATE WARNING MAIL</Typography>
                 </Box>

                 <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>



          <form onSubmit={WarningMailHandle} method="post" enctype="multipart/form-data">
            <Box style={WarningmailCreationStyle.thirdBoxStyle}>
                
            <Grid container  style={WarningmailCreationStyle.gridContainerStyle}>        
            
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={WarningmailCreationStyle.gridItemStyle}>
                     <Autocomplete 
             Value={warningmails.empId}
             onChange={(e,value)=>{
               if(value==null){

                 return setwarningmails({...warningmails,empId:null})
               }
               let data=value.match("[0-9]*")
              return   setwarningmails({...warningmails,empId:data[0]})

             }}

            style={WarningmailCreationStyle.textFieldStyle}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                required
                              
                                 {...params} 
                                label='Employee Id'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                type='text'
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={WarningmailCreationStyle.gridItemStyle}>
                       

              <TextField required value={warningmails.title} onChange={(e)=>{ setwarningmails({...warningmails,title:e.target.value})}}  id="outlined-basic1" label="Subject" style={WarningmailCreationStyle.textFieldStyle} type='text'/>  

                    </Grid >




                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={WarningmailCreationStyle.gridItemStyle}>
                       
            <TextField  InputLabelProps={{ shrink: true }} style={WarningmailCreationStyle.textFieldStyle}  type='date' value={warningmails.warningDate}
   onChange={(e)=>{setwarningmails({ ...warningmails,warningDate:e.target.value})}} label="Warning Date"></TextField>

                    </Grid >
                   
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={WarningmailCreationStyle.gridItemStyle}>
                       
                       <FormControl  style={WarningmailCreationStyle.textFieldStyle}>
                      <InputLabel id="demo-multiple-name-label">Warning Level</InputLabel>
                        <Select 
                         value={warningmails.warningLevel}
                         onChange={(e)=>{setwarningmails({...warningmails,warningLevel:e.target.value})}}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-start"
                        name=""
                        label="Select Warning "
                        required 
                        >
                        
                        <MenuItem value="LOW">LOW</MenuItem>
                        <MenuItem  value="MEDIUM">MEDIUM</MenuItem>
                        <MenuItem value="HIGH">HIGH</MenuItem>
                       </Select>
              </FormControl>
                    </Grid >



                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={WarningmailCreationStyle.gridItemStyle}>
                       
                       <FormControl  style={WarningmailCreationStyle.textFieldStyle}>
                <InputLabel id="demo-multiple-name-label">Severity Level</InputLabel>
                        <Select 
                         value={warningmails.severityLevel}
                         onChange={(e)=>{setwarningmails({...warningmails,severityLevel:e.target.value})}}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-start"
                        name=""
                        label="Select Severity"
                        required 
                        >
                        
                        <MenuItem value="FIRST_LEVEL">FIRST</MenuItem>
                        <MenuItem  value="SECOND_LEVEL">SECOND</MenuItem>
                        <MenuItem value="FINAL_LEVEL">FINAL</MenuItem>
                       </Select>
                 </FormControl>
                    </Grid >
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={WarningmailCreationStyle.gridItemStyle}>
    <Dropzone onDrop={fileHandler} id="file-upload"  multiple={true} loading={false} style={WarningmailCreationStyle.DropzoneStyle}>

<Box style={WarningmailCreationStyle.DropZoneBoxStyle}>
<Typography> Add Attachments</Typography>
<CloudUploadIcon/>
{
    attachments.map((value)=>{
        return(
            <Box sx={{display:"block"}}>
        <span key={value.path}>{value.path}</span>
        </Box>)
    })
   }
</Box>
</Dropzone>

  </Grid >
                  
                    <Grid item xs={12} sm={12}  style={WarningmailCreationStyle.gridItemStyle}>
                   <TextField  label="Description" multiline rows={3} required value={warningmails.description} onChange={(e)=>{ setwarningmails({...warningmails,description:e.target.value})}}   id="outlined-basic1" style={WarningmailCreationStyle.textFieldStyleForDescription} type='text'/>  

                    </Grid >
                
                    <Grid xs={12} sm={12}  style={WarningmailCreationStyle.gridItemStyle}>
                        <Button type='submit' disableElevation variant="contained" style={GlobalButton.OperationButton}>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
            </form>
        <GlobalButton.GlobalDivider1></GlobalButton.GlobalDivider1>
    </Box>

               


    ):<NoAuth></NoAuth>


}