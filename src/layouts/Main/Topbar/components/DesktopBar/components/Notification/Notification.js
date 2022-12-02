import React, { useContext, useEffect, useState } from 'react'
import { Context } from 'hooks/WalletContext';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getNotifications } from './services';

const Notification = () => {
    const { data } = useContext(Context);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [notifications, setNotifications] = useState([]);
    const [notificationCounter, setNotificationCounter] = useState(0);
    useEffect(()=>{
        const notification = setInterval(()=>{
            const notificationStorage = localStorage.getItem('notifications');
            if(!(data && data.userAccount)){
                clearInterval(notification);
                return;
            }
            getNotifications(data.userAccount).then(res=>{
                if(notificationStorage){
                    const getStorageNofitication = JSON.parse(notificationStorage);
                    const newNotification = res.length - getStorageNofitication.length;
                    if(newNotification > 0){
                        setNotificationCounter(newNotification);
                    }
                }else{
                    localStorage.setItem('notifications', JSON.stringify(res));
                    setNotificationCounter(1);
                }
                setNotifications(res);
            })
        }, 25000)
        return ()=>{
            clearInterval(notification)
        }
    },[data])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setNotificationCounter(0);
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
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClick}
            >
                <Badge badgeContent={notificationCounter} color="error">
                    <NotificationsIcon />
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
                {(notifications.length == 0) && <MenuItem>No notifications</MenuItem>}  
                {(notifications.length > 0) && notifications.map((offer, index) => (
                    <MenuItem 
                        key={index} 
                        sx={{
                            color: '#2F2F2F',
                            p: 1,
                            '&:first-child': {
                                fontWeight: 'bold',
                            }
                        }}
                    >
                        <span>New: </span>
                        {offer.type_movement}
                    </MenuItem>
                ))}
            </Menu>
            </>}
        </>
    )
}

export default Notification