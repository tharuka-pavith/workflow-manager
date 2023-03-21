import {React, useState} from "react";

import { Menu, MenuItem, Avatar, Divider, ListItemIcon } from "@mui/material";

import { PersonAdd, Settings, Logout } from "@mui/icons-material";

function UserMenu(props) {

    return (
        <Menu
            anchorEl={props.menuAnchorEl}
            id="account-menu"
            open={props.isMenuOpen}
            onClose={props.handleProfileClose}
            onClick={props.handleProfileClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={props.handleProfileClose}>
                <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={props.handleProfileClose}>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={props.handleProfileClose}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
            </MenuItem>
            <MenuItem onClick={props.handleProfileClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={props.handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}

export default UserMenu;