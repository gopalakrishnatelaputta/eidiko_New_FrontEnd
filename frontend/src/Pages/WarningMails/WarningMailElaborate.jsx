import React, { useState } from 'react'
import { WarningMailModalOpenStyle } from './WarningMailCreationStyle'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'

export default function WarningMailElaborate(props) {

    const[warningdata,setwarningdata]=useState(props.rowdata)
    console.log(warningdata);

  return (
   <Card style={WarningMailModalOpenStyle.CardStyle}>
  <CardContent>
            <center>
            <Grid>
                 <Typography style={WarningMailModalOpenStyle.TypographyStyle} >
                 Warningmails
                 </Typography>
            </Grid>
            </center>
            <GlobalButton.GlobalDivider1/>
              <Box style={WarningMailModalOpenStyle.thirdBoxStyle}>
                <Grid container  style={WarningMailModalOpenStyle.gridContinerStyle}>
                 <Grid item xs={3}  style={WarningMailModalOpenStyle.gridItemStyle}>
                        <Card>
                            <Typography style={WarningMailModalOpenStyle.typographyStyle1}>Employee Id:</Typography>
                            <Typography style={WarningMailModalOpenStyle.typography2}>{warningdata.empId}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3} style={WarningMailModalOpenStyle.gridItemStyle}>
                    <Card>
                            <Typography style={WarningMailModalOpenStyle.typographyStyle1}>Employee Name:</Typography>
                            <Typography style={WarningMailModalOpenStyle.typography2}>{warningdata.empName}</Typography>
                        </Card>
                        </Grid>
                        <Grid item xs={3} style={WarningMailModalOpenStyle.gridItemStyle}>
                        <Card>
                            <Typography  style={WarningMailModalOpenStyle.typographyStyle1}>Sent date:</Typography>
                            <Typography style={WarningMailModalOpenStyle.typography2}>{dayjs(warningdata.sentDate).format("DD/MM/YYYY")}</Typography>
                        </Card>
                        </Grid>
                        <Grid item xs={3} style={WarningMailModalOpenStyle.gridItemStyle}>
                        <Card>
                            <Typography style={WarningMailModalOpenStyle.typographyStyle1}>Warning date:</Typography>
                            <Typography style={WarningMailModalOpenStyle.typography2}>{dayjs(warningdata.warningDate).format("DD/MM/YYYY")}</Typography>
                        </Card>
                        </Grid>
                    </Grid>
                    <Grid container  style={WarningMailModalOpenStyle.gridContinerStyle}>
                 <Grid item xs={2.5}  style={WarningMailModalOpenStyle.gridItemStyle}>
                        <Card>
                            <Typography style={WarningMailModalOpenStyle.typographyStyle1}>Cautioner Id:</Typography>
                            <Typography style={WarningMailModalOpenStyle.typography2}>{warningdata.warnedBy}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3} style={WarningMailModalOpenStyle.gridItemStyle}>
                    <Card>
                            <Typography style={WarningMailModalOpenStyle.typographyStyle1}>Cautioner Name:</Typography>
                            <Typography style={WarningMailModalOpenStyle.typography2}>{warningdata.warnedByName}</Typography>
                        </Card>
                        </Grid>
                        <Grid item xs={3} style={WarningMailModalOpenStyle.gridItemStyle}>
                        <Card>
                            <Typography style={WarningMailModalOpenStyle.typographyStyle1}>Warning Level:</Typography>
                            <Typography style={WarningMailModalOpenStyle.typography2}>{warningdata.warningLevel}</Typography>
                        </Card>
                        </Grid>
                        <Grid item xs={3.5} style={WarningMailModalOpenStyle.gridItemStyle}>
                        <Card>
                            <Typography style={WarningMailModalOpenStyle.typographyStyle1}>Severity Level:</Typography>
                            <Typography style={WarningMailModalOpenStyle.typography2}>{warningdata.severityLevel}</Typography>
                        </Card>
                        </Grid>
                    </Grid>
                    <Grid container  style={WarningMailModalOpenStyle.gridContinerStyle}>
                 <Grid item xs={12}  style={WarningMailModalOpenStyle.gridItemStyle}>
                    <Box>
                 <center><Typography style={WarningMailModalOpenStyle.typographyStyle1}>Title</Typography></center>
                    <Typography style={WarningMailModalOpenStyle.typography2}>{warningdata.title}</Typography>
                    </Box>
                 </Grid>
                 </Grid>

                 <Grid container  style={WarningMailModalOpenStyle.gridContinerStyle}>
                 <Grid item xs={12}  style={WarningMailModalOpenStyle.gridItemStyle}>
                    <Box>
                 <center><Typography style={WarningMailModalOpenStyle.typographyStyle1}>Description</Typography></center>
                 <Typography style={WarningMailModalOpenStyle.typography2}>{warningdata.description}</Typography>
                 </Box>
                 </Grid>
                 </Grid>
                    <Grid container  style={WarningMailModalOpenStyle.gridContinerStyle}>
                    <Grid item xs={12} style={WarningMailModalOpenStyle.gridItemStyle}>
                        <Button  disableElevation sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Close</Button>
                    </Grid>
               </Grid>
            </Box>
            
     
        <GlobalButton.GlobalDivider1/>
        </CardContent>
   </Card>
  )
}
