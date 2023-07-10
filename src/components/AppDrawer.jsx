import React from "react";

// MUI components
import { Tooltip, Drawer, Toolbar, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"

// MUI icons
import CreateIcon from '@mui/icons-material/Create';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HistoryIcon from '@mui/icons-material/History';

// App drawer items
const drawerData = [
    { text: "New Task", path: "/dashboard/newtask", icon: <CreateIcon sx={{ marginX: '30%' }} /> },
    { text: "My Tasks", path: "/dashboard/mytasks", icon: <TaskIcon sx={{ marginX: '30%' }} /> },
    { text: "Tasks", path: "/dashboard/todotasks", icon: <AssignmentTurnedInIcon sx={{ marginX: '30%' }} /> },
    { text: "History", path: "/dashboard/history", icon: <HistoryIcon sx={{ marginX: '30%' }} /> },
    // { text: "Admin", path: "/dashboard/admin", icon: <AdminPanelSettingsIcon sx={{ marginX: '30%' }} /> },

];


/**ApDrawer component */
function AppDrawer() {

    const navigate = useNavigate();

    return (
        <Box>
            <Drawer elevation={10} variant="permanent" open sx={{ width: '100%' }}>
                <Toolbar variant="regular" sx={{ marginTop: '1rem' }} />
                {drawerData.map((item) => {
                    return (
                        <ListItem disablePadding>
                            <Tooltip title={item.text} placement='right'>
                            <ListItemButton component="a" sx={{ height: "4rem" }} onClick={() => navigate(item.path)}>
                                {/* <ListItemText primary={item.text} /> */}
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    );
                })}
            </Drawer>
        </Box>
    );
}

export default AppDrawer;