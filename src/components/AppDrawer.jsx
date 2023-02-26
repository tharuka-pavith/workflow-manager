import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from '@mui/material/Box';

/*------------------Icons-------------------*/
import CreateIcon from '@mui/icons-material/Create';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HistoryIcon from '@mui/icons-material/History';


// const items = [
//     {heading: "Create New Task", icon: {<CreateIcon/>}}, 
//     {heading: "My Tasks"}, 
//     {heading:"Assigned Tasks"}, 
//     {heading:"Task History"}, 
//     {heading:"Admin Panel"}
// ];

function createList(item) {

    return (
        <ListItemButton component="a" href="menu-options" sx={{ maxHeight: "4rem" }}>
            <ListItemText primary={item} />
        </ListItemButton>
    );
}

function AppDrawer() {

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

        <Box>
            <Drawer variant="permanent" open sx={{ width: '100%' }}>
                <Toolbar variant="regular" sx={{ marginTop: '30px' }} />
                {/* {items.map(createList)} */}
                <ListItem  disablePadding>
                    <ListItemButton component="a" href="menu-options" sx={{ height: "4rem" }}>
                    <ListItemText primary="New Task"  />
                        <ListItemIcon>
                            <CreateIcon sx={{marginX: '30%'}} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem  disablePadding>
                    <ListItemButton component="a" href="menu-options" sx={{ height: "4rem" }}>
                    <ListItemText primary="My Tasks"  />
                        <ListItemIcon>
                            <TaskIcon sx={{marginX: '30%'}} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem  disablePadding>
                    <ListItemButton component="a" href="menu-options" sx={{ height: "4rem" }}>
                    <ListItemText primary="Tasks"  />
                        <ListItemIcon>
                            <AssignmentTurnedInIcon sx={{marginX: '30%'}} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem  disablePadding>
                    <ListItemButton component="a" href="menu-options" sx={{ height: "4rem" }}>
                    <ListItemText primary="History"  />
                        <ListItemIcon>
                            <HistoryIcon sx={{marginX: '30%'}} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem  disablePadding>
                    <ListItemButton component="a" href="menu-options" sx={{ height: "4rem" }}>
                    <ListItemText primary="Admin"  />
                        <ListItemIcon>
                            <AdminPanelSettingsIcon sx={{marginX: '30%'}} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

            </Drawer>
        </Box>
    );
}

export default AppDrawer;