import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'


export const Errorr = () => {
  const navigate=useNavigate()
  const backHandle=()=>{
    navigate("/")
}
    return (
        <Box
       
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh'
        }}
      >
      
        <Container maxWidth="md">
          <Grid container >
            <Grid item xs={12} style={{display:"flex",justifyContent:"center"}} >
              <img
                src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif"
                alt=""
                width={600} height={350}
              />
            </Grid>
          </Grid>
        </Container>  
       
      </Box>
    )
}
