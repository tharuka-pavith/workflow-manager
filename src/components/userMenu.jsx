import { React } from "react";

// React router
import { useNavigate } from "react-router-dom";

// MUI components
import { Menu, MenuItem,  Divider, ListItemIcon, Typography, Box } from "@mui/material";

// MUI icons
import {  Settings, Logout, HelpCenter, Edit } from "@mui/icons-material";

// Firebase components
import { getAuth, signOut } from "firebase/auth";


/**UserMenu component */
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
            <Box sx={{py: '5%', px: '7%'}}>
            <Typography variant='h6' textAlign='left' fontWeight="medium" component="div">
                {auth.currentUser !== null? props.userName : ""}
                </Typography>
            {/* <Typography variant='subtitle1' textAlign='left'>
                {auth.currentUser !== null? auth.currentUser.email: ""}</Typography> */}
            </Box>

            <MenuItem onClick={() => {
                props.handleProfileClose();
                navigate("/dashboard/editprofile");
            }}>
                {/* <Avatar /> */}
                <ListItemIcon>
                    <Edit fontSize="small" />
                </ListItemIcon>
                Edit My Profile
            </MenuItem>
            <Divider />
            {/* <MenuItem onClick={props.handleProfileClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem> */}
            <MenuItem onClick={props.handleProfileClose}>
                <ListItemIcon>
                    <HelpCenter fontSize="small" />
                </ListItemIcon>
                Support
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