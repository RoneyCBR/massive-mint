import React from 'react'
import { Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Web3 from 'web3';
import Tooltip from '@mui/material/Tooltip';


const Information = ({content}) => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    display:'flex',
                    justifyContent:{xs:'center',sm:'flex-start',md:'flex-start',lg:'flex-start',xl:'flex-start'},
                    mt:{xs:'10px',sm:'0PX',md:'0px',lg:'0px',xl:'0px'}
                }}
            >
                <Box
                    sx={{
                        display:'flex',
                        justifyContent:'space-between',
                        maxWidth:{xs:'100%',sm:'40vw',md:'50vw',lg:'50vw',xl:'60vw'},
                        width:'auto',
                        maxHeight:'130px',
                        padding:'0.5rem 0.5rem',
                        fontWeight:'bold',
                        fontSize:{xs:'18px',sm:'20px',md:'30px',lg:'40px',xl:'50px'},
                        textAlign:'left',
                        letterSpacing:'0.015em',
                        lineHeight:'1.2',
                        color:'#fff',
                        marginTop:'0px',
                        marginBottom:'0px',
                        backdropFilter: 'blur(20px)',
                        backgroundColor:'transparent',
                        borderRadius: '8px',
                        wordWrap: 'break-word',
                        boxShadow:'inset 0px 0px 20px rgba(65, 176, 42, 0.8)'
                    }} 
                >
                    {
                    String(content.name).length >= 40 ? 
                    <Tooltip 
                        title={content.name}
                        placement="top"
                    >   
                        <Box sx={{width:'100%'}}>
                            {String(content.name).substring(0,38) + '...'}
                        </Box>
                    </Tooltip>
                    :
                    content.name
                    }
                </Box>
            </Box>
            <Box
                sx={{
                    display:'flex',
                    justifyContent:{xs:'center',sm:'flex-start',md:'flex-start',lg:'flex-start',xl:'flex-start'},
                    mt:{xs:'10px',sm:'10px',md:'10px',lg:'10px',xl:'10px'}
                }}
            >
                {content?.user && (
                    <Link style={{textDecoration:'none'}} to={`/profile?address=${content.user.wallet}`}>
                        <Box
                            display='flex'
                            alignItems='center'
                            sx={{
                                width:'auto',
                                gap:'0.5rem',
                                fontWeight:'bold',
                                backdropFilter: 'blur(20px)',
                                backgroundColor:'transparent',
                                boxShadow:'inset 0px 0px 20px rgba(65, 176, 42, 0.8)',
                                boxSizing:'border-box',
                                padding:'0.5rem 1rem',
                                borderRadius: '999px',
                                textAlign:'center',
                                color:'#fff',
                                fontSize:{xs:'14px',sm:'16px',md:'18px',lg:'20px',xl:'22px'},
                                letterSpacing:'1px'
                            }} 
                        >
                            By
                            {
                                content && content.user && content.user.username &&
                                <React.Fragment>
                                    {
                                        Web3.utils.isAddress(content.user.username) ?
                                        ' '+(content.user.username).substring(0,5)+ '...' +(content.user.username).substring(38,54)
                                        :
                                        ' '+content.user.username
                                    }
                                </React.Fragment>
                            }
                            <span>
                                <Avatar alt="banner" sx={{width:'40px',height:'40px'}} src={content.user.profile_pic_url} />
                            </span>
                        </Box>
                    </Link>
                )}
            </Box>
        </React.Fragment>
    )
}

Information.propTypes = {
    content: PropTypes.object.isRequired,
}

export default Information