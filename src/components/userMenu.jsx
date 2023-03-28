import {React} from "react";

import { Menu, MenuItem, Avatar, Divider, ListItemIcon } from "@mui/material";

import { PersonAdd, Settings, Logout } from "@mui/icons-material";

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function UserMenu(props) {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            props.handleLogout(); //Handle logout functions passed from props
            navigate("/home/welcome");
            console.log("Signed out successfully");
        }).catch((error) => {
        // An error happened.
        console.log("Error in signout");
        console.log(error.message);

        });
    }

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
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}

export default UserMenu;