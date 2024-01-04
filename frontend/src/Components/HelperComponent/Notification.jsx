import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";


export default function Notification(props){

const [open,setopen]=useState(false)
let data=props.toggle
useEffect(()=>{
setopen(data)
},[data])

    return(
        <>
        {
            open?<Box sx={{display:"flex",width:"350px",justifyContent:'center',marginBottom:"10px"}} >
            
                <span style={{fontWeight:"bold",color:"#f44336",fontFamily: "Gill Sans Extrabold sans-serif",fontSize:'20px'}}>{props.text}</span>
            
            </Box>:null
        }
        </>
    )

}