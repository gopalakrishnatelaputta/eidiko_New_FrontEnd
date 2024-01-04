import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { DataGridRowAndcolumnHeight } from '../stylecomponent/forFirstDiv'




export default function CustomDatagrid({rows,columns,
  columnVisibilityModel,rowId,sortingfield,rowclickhandle,
  filterchangehandle,CustomToolBar,sortingorder,checkboxSelection,rowSelectionModel,RowSelectionModelChange}) {
  
  
  
    return (
    <DataGrid
sx={{ '& .table-header': {
  backgroundColor: '#2196f3',
},
'& .MuiDataGrid-cell:hover': {
  color: 'primary.main',
},
// fontSize:14,

}}

 columnHeaderHeight={DataGridRowAndcolumnHeight.columnheaderHeight}
 rowHeight={DataGridRowAndcolumnHeight.rowHeight}
columnVisibilityModel={columnVisibilityModel}
onFilterModelChange={filterchangehandle}
checkboxSelection={ checkboxSelection}
rowSelectionModel={rowSelectionModel}
onRowSelectionModelChange={RowSelectionModelChange}
 rows={rows}
 columns={columns}
 getRowId={rowId}
initialState={{ sorting:{
    sortModel:[{ field: sortingfield, sort:sortingorder?"asc":"desc"}],
},
  ...rows.initialState,
  pagination:{paginationModel: { pageSize: 10} },  
}}
pageSizeOptions={[10,15,25,50,75]}
onRowClick={rowclickhandle}
slots={{
  toolbar:CustomToolBar,
}}
 >



 </DataGrid>
   
  )
}