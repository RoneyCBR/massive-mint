import React, { useState } from 'react'
import { Box, Checkbox, Collapse } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const styleBox = {
    gap:'1rem',
    marginBottom:'0.5rem',
    border: '1px solid #e0e0e0',
    borderRadius:'8px',
    boxSizing:'border-box',
    cursor:'pointer',
    padding:'0px 1rem',
    '&:hover':{
        border: '1px solid #000',
    }
 }

const SortProfile = () => {
    const [virified, setVirified] = useState(false)
    const [type, setType] = useState(false)
    return (
        <Box 
            sx={{
                position:'sticky',
                top: 0,
                '@media screen and (max-width: 768px)':{
                    position:'block',
                }
            }}
        >
            <Box
                component='article'
                display='flex'
                flexDirection='column'
                sx={{
                    borderBottom:'1px solid #e0e0e0',
                }}   
            >
                <Box
                    component='article'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'  
                >
                    <h1>Type</h1>
                    <span onClick={()=>setType(!type)}><AddIcon /></span>
                </Box>
                <Collapse in={type} timeout="auto" unmountOnExit>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                defaultChecked
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#000',
                                    }
                                }}
                            />
                            <h1>Creator</h1>
                        </Box>
                        <Box>
                            156,563
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                defaultChecked
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#000',
                                    }
                                }}
                            />
                            <h1>Collector</h1>
                        </Box>
                        <Box>
                            69,783
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                defaultChecked
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#000',
                                    }
                                }}
                            />
                            <h1>Other</h1>
                        </Box>
                        <Box>
                            1,992
                        </Box>
                    </Box>
                </Collapse>
            </Box>
            <Box
                component='article'
                display='flex'
                flexDirection='column'
                sx={{
                    borderBottom:'1px solid #e0e0e0',
                }}   
            >
                <Box
                    component='article'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'  
                >
                    <h1>Social Verification</h1>
                    <span onClick={()=>setVirified(!virified)}><AddIcon /></span>
                </Box>
                <Collapse in={virified} timeout="auto" unmountOnExit>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                defaultChecked
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#000',
                                    }
                                }}
                            />
                            <h1>Twitter</h1>
                        </Box>
                        <Box>
                            156,563
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                defaultChecked
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#000',
                                    }
                                }}
                            />
                            <h1>Instagram</h1>
                        </Box>
                        <Box>
                            69,783
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={styleBox}
                    >
                        <Box 
                            display='flex' 
                            alignItems='center'
                            sx={{
                                gap:'0.5rem',
                            }}>
                            <Checkbox 
                                defaultChecked
                                sx={{
                                    '&.Mui-checked':{
                                        color:'#000',
                                    }
                                }}
                            />
                            <h1>Not Verified</h1>
                        </Box>
                        <Box>
                            1,992
                        </Box>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    )
}

export default SortProfile