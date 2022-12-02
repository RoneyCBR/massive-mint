import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const Languaje = () => {
    const [languages, setLanguages] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const getLanguages = () => {
        const translate = document.querySelectorAll('.goog-te-combo');
        if(translate){
            console.log(translate[0]?.childNodes);
            translate[0]?.childNodes.forEach(element => {
                console.log(element);
                setLanguages(languages => [...languages, element.text]);
            });
        }
    }
    const handleSelectLanguage = (language) => {
        const translate = document.querySelectorAll('.goog-te-combo');
        translate[0]?.childNodes.forEach(element => {
            if(element.text === language){
                element.click();
            }
        });
        setAnchorEl(null);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        getLanguages();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
        {console.log(languages)}
        {
            (document.querySelectorAll('.goog-te-combo')) &&
        <>
        <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={handleClick}
            sx={{
                cursor: 'pointer',
            }}
        >
            <LanguageIcon />
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
                    overflow: 'auto',
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
            {languages.map((language, index) => (
                <MenuItem key={index} onClick={handleSelectLanguage}>{language}</MenuItem>
            ))}
        </Menu>
        </>}
        <div id="google_translate_element" style={{display:'none'}}></div>
        </>
    )
}

export default Languaje