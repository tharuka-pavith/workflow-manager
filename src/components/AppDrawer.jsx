import React from "react";

// MUI components
import { Drawer, Toolbar, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, List } from "@mui/material";
import { useNavigate } from "react-router-dom"

// MUI icons
import CreateIcon from '@mui/icons-material/Create';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HistoryIcon from '@mui/icons-material/History';

// App drawer items
const drawerData = [
    { text: "New Task", path: "/dashboard/newtask", icon: <CreateIcon  /> },
    { text: "My Tasks", path: "/dashboard/mytasks", icon: <TaskIcon /> },
    { text: "Tasks", path: "/dashboard/todotasks", icon: <AssignmentTurnedInIcon /> },
    { text: "History", path: "/dashboard/history", icon: <HistoryIcon  /> },
    // { text: "Admin", path: "/dashboard/admin", icon: <AdminPanelSettingsIcon sx={{ marginX: '30%' }} /> },

];


/**ApDrawer component */
function AppDrawer() {
    const drawerWidth = 200;
    const navigate = useNavigate();

    return (   
            <Drawer variant="permanent" sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}>
                {/* <Toolbar variant="regular" sx={{ marginTop: '1rem' }} /> */}
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                <List>
                {drawerData.map((item) => {
                    return (
                        <ListItem disablePadding key={item.text} >
                                <ListItemButton sx={{ height: "4rem" }} onClick={() => navigate(item.path)}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                        </ListItem>
                    );
                })}
                </List>
                </Box>
            </Drawer>
    );
}

export default AppDrawer;