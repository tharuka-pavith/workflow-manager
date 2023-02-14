import React from "react";
import { Drawer, Toolbar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const items = ["Create New Task", "My Tasks", "Assigned Tasks", "Task History", "Admin Panel"];

function createList(item) {
    return (
            <ListItemButton component="a" href="#simple-list" sx={{maxHeight: "4rem"}}>
                <ListItemText primary={item} />
            </ListItemButton>
    );
}

function SideMenu() {

    return (

        // <Paper sx={{ width: 200, maxWidth: '100%', borderRadius: 0 }} elevation={1}>
        //   <MenuList>
        //     <MenuItem>
        //       <Typography variant="subtitle1"><Box sx={{textAlign: 'center'}}>Create new Task</Box></Typography>
        //     </MenuItem>
        //     <Divider/>
        //     <MenuItem>
        //       <Typography variant="subtitle1">My Approvals</Typography>
        //     </MenuItem>
        //     <Divider/>
        //     <MenuItem>
        //       <Typography variant="subtitle1">History</Typography>
        //     </MenuItem>
        //     <Divider/>
        //     <MenuItem>
        //       <Typography variant="subtitle1">Admin</Typography>
        //     </MenuItem>
        //   </MenuList>
        // </Paper>


        <Drawer anchor="left" open={true} hideBackdrop={true} elevation={10}>
        <Toolbar />
            {items.map(createList)}
        </Drawer>

    );
}

export default SideMenu;