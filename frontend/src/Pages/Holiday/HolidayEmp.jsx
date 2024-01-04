import React, { useEffect, useState } from 'react'
import { HolidayService } from './HolidayService'
import { holidayStyle } from './HolidayStyle'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import { Box, Typography } from '@mui/material'
import { GlobalButton } from '../../Components/stylecomponent/GlobalButton'

export const HolidayEmp = () => {

    const[holidayState,setHolidayState]=useState([])
  const columns = [
    {
      field:'holidayDate',
      headerName:'Holiday Date',
      minWidth:100,
      flex:1.5,
      headerClassName:'table-header',
      
    },
    {
      field:'holidayDesc',
      headerName:'Holiday Desc',
      minWidth:100,
      flex:1.5,
      headerClassName:'table-header',
      
    },
    {
      field:'holidayYear',
      headerName:'Holiday Year',
      minWidth:100,
      flex:1.5,
      headerClassName:'table-header',
      
    },
    // {
    //   field:'createdBy',
    //   headerName:'Created By',
    //   minWidth:100,
    //   flex:1.5,
    //   headerClassName:'table-header',
    //   // valueGetter:getEmpid
      
    // },
]

  function fetchHolidays(){
    HolidayService.getHolidayList().then((res)=>{
      if (res.statusMessage==="success") {
        // setIsLoading(false)
        if(res.result.length==0){
          toast.info("No Records Found ",{
              position: toast.POSITION.TOP_RIGHT
          })}
          setHolidayState(res.result)
      }
      else{
        // setIsLoading(false)
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT
      })
      }
  
    }).catch((err)=>{
  
    // setIsLoading(false)
    toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT
  })
    })
  }

  useEffect(()=>{
    fetchHolidays()
    
  },[])
  return (
    <Box style={holidayStyle.firstBox}>
        <Box style={holidayStyle.SecondBox}>
        <Typography style={holidayStyle.typographystyle}>HOLI DAY LIST</Typography>
      </Box>
      <GlobalButton.GlobalDivider1/>
    <DataGrid 
    rows={holidayState}
    columns={columns}
    getRowId={(holidayState)=> holidayState.holidayListId}
    initialState={{
      sorting: {
          sortModel: [{ field: 'modifiedDate', sort: 'desc' }],
        },
  ...holidayState.initialState,
  pagination: { paginationModel: { pageSize: 8 } },
}}
pageSizeOptions={[8,15,25,50,75]}

    />

</Box>
  )
}
