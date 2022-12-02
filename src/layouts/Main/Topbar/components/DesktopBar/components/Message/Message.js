import React, { useContext, useState } from 'react'
import { Badge, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { Context } from 'hooks/WalletContext';

const Message = () => {
    const { data } = useContext(Context);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            {data && data.userAccount &&
            <>
            <IconButton 
                size="large" 
                aria-label="show 4 new mails" 
                color="inherit"
                onClick={handleClick}
            >
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
                <MenuItem>
                    Profile
                </MenuItem>
                <MenuItem>
                    My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    Add another account
                </MenuItem>
            </Menu>
            </>}
        </>
    )
}

export default Message