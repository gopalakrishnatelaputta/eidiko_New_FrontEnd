import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import './loading.css'

const Loading = () => {
    return (
        <Box className="bg-blur">
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',

            }}>

<section>
    <div class="loader loader-1">
      <div class="loader-outter"></div>
      <div class="loader-inner"></div>
    </div>
  </section>


            </Container>
        </Box>
    )
}

export default Loading;