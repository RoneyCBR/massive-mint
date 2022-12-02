import React from 'react'
import { Avatar, Box, Card, CardMedia, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const OwnerInformation = ({content}) => {
    const { t } = useTranslation("translate");
    return (
        <Box 
            display='flex'
            flexDirection='row'
            sx={{
                color:'#666',
                fontWeight: 600,
                '@media screen and (max-width: 768px)': {
                    //flexDirection: 'column',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }}
        > 
            <Box>
                {t('home.created_by')}
                <Card
                    color='inherit' 
                    component={Link} 
                    to={`/profile?address=${content.owner}`}
                    sx={{
                        marginTop: '1rem',
                        display: 'flex',
                        gap:'5px',
                        boxSizing: 'border-box',
                        padding: '2px 10px',
                        textDecoration: 'none',
                    }}
                >
                    <Avatar alt="artcrypted" src={content.user.profile_pic_url} />
                    <Typography 
                        variant="overline" 
                        display="block" 
                        gutterBottom 
                        component="span"
                        sx={{
                            fontSize:'16px',
                            color:'#000',
                            fontWeight: 600,
                            cursor:'pointer',
                        }}
                    >
                        {content.user.short_main_key}
                    </Typography>
                </Card>
            </Box>
            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    margin: '0px 10px',
                    '@media screen and (max-width: 768px)': {
                        
                    }
                }}
            />
            <Box>
                {t('home.collection_title')}
                <Card
                    component={Link}
                    color='inherit'
                    to={`/collection?address=${content.project_key}`}
                    sx={{
                        marginTop: '1rem',
                        display: 'flex',
                        gap:'5px',
                        boxSizing: 'border-box',
                        padding: '2px 10px',
                        textDecoration: 'none',
                    }}
                >
                    <Avatar variant="rounded">
                        <CardMedia 
                            component= {content && content.project && content.project.is_video  ?'video' : 'img'}
                            src={content && content.project && content.project.thumb_url}
                            alt="artcrypted"  
                            muted
                            autoPlay
                            loop
                            sx={{
                                transform: 'scale(2)',
                            }}  
                        />
                    </Avatar>
                    <Typography 
                        variant="overline" 
                        display="block" 
                        gutterBottom 
                        component="span"
                        sx={{
                            fontSize:'16px',
                            color:'#000',
                            fontWeight: 600,
                            cursor:'pointer',
                        }}
                    >
                       {content.project &&
                        content.project.name
                       }
                    </Typography>
                </Card>
            </Box>
        </Box>
    )
}

OwnerInformation.propTypes = {
    content: PropTypes.object,
}

export default OwnerInformation