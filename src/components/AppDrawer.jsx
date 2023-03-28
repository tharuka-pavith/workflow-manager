import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from '@mui/material/Box';
import { Tooltip } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom"

/*------------------Icons-------------------*/
import CreateIcon from '@mui/icons-material/Create';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HistoryIcon from '@mui/icons-material/History';

const drawerData = [
    { text: "New Task", path: "/dashboard/newtask", icon: <CreateIcon sx={{ marginX: '30%' }} /> },
    { text: "My Tasks", path: "/dashboard/mytasks", icon: <TaskIcon sx={{ marginX: '30%' }} /> },
    { text: "Tasks", path: "/dashboard/todotasks", icon: <AssignmentTurnedInIcon sx={{ marginX: '30%' }} /> },
    { text: "History", path: "/dashboard/history", icon: <HistoryIcon sx={{ marginX: '30%' }} /> },
    { text: "Admin", path: "/dashboard/admin", icon: <AdminPanelSettingsIcon sx={{ marginX: '30%' }} /> },

];


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