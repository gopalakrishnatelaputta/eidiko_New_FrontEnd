import { Box } from "@mui/material";
import { GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

export function CustomToolBar(){
    return (
        <GridToolbarContainer sx={{display:"flex",justifyContent:"flex-end",width:"98.7%"}}>
          <GridToolbarExport
           printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
          />
        </GridToolbarContainer>
      );
}