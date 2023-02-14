import {Menu,  MenuItem, Paper, Typography, MenuList, Divider } from "@mui/material"; 
import { Box } from "@mui/system";

function SideMenu(){

    return(

        <Paper sx={{ width: 200, maxWidth: '100%', borderRadius: 0 }} elevation={1}>
      <MenuList>
        <MenuItem>
          <Typography variant="subtitle1"><Box sx={{textAlign: 'center'}}>Create new Task</Box></Typography>
        </MenuItem>
        <Divider/>
        <MenuItem>
          <Typography variant="subtitle1">My Approvals</Typography>
        </MenuItem>
        <Divider/>
        <MenuItem>
          <Typography variant="subtitle1">History</Typography>
        </MenuItem>
        <Divider/>
        <MenuItem>
          <Typography variant="subtitle1">Admin</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
    );
}

export default SideMenu;