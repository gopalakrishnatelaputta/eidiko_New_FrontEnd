import { Typography,Grid,Box } from "@mui/material"
import noAuth from "../../images/noAuth.png"


export const NoAuth=()=>{



    return (
       
        <Box style={{backgroundColor:"#FFFFFF",height:"90vh"}}>
            <Box sx={{mt:2}}>
                <Grid container>
                    <Grid item xs={12}>
                        <center >
                            <Typography variant="h4" sx={{backgroundColor:"#2196F3", color:"#FFFFFF"}}> No Authentication</Typography> </center>
                    </Grid>

                </Grid>
            </Box>
            <Box>
                <Grid container>
                    <Grid item xs={12}>
                        <center >
                            <img src={noAuth} alt="not found"></img> </center>
                    </Grid>

                </Grid>
            </Box>


        </Box>


    )
}