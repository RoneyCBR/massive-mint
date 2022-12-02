import React from 'react'
import { Box, CardMedia, Container } from '@mui/material'
import avalancheIcon from 'assets/logos/avalanche_logo.svg'
import { useTranslation } from 'react-i18next';

const HomeBlockContent = () => {
    const { t } = useTranslation("translate");
    return (
        <Box 
            component='section'
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            sx={{
                marginTop: '50px',
                backgroundColor: '#000',
                boxSizing: 'border-box',
                padding: '25px 0px',
                '@media screen and (max-width: 768px)': {
                    flexDirection: 'column',
                }
            }}
        >
            <Box>
                <CardMedia 
                    component='img' 
                    src={avalancheIcon}
                    sx={{
                        height: '120px',
                        width: '120px',
                    }}
                />
            </Box>
            <Box sx={{fontSize:'25px', textAlign:'right'}}>
                <Container maxWidth='xs'>
                    <span style={{color:'#fff'}}>{t('home.block_content_text_one')}</span><span style={{color:'#FF0000', margin:'0 5px'}}>{t('home.block_content_text_two')}</span> <br />
                    <span style={{color:'#fff', margin:'0 5px'}}>{t('home.block_content_text_three')}</span> <br />
                    <span style={{color:'#FF0000', margin:'0 5px'}}>{t('home.block_content_text_four')}</span><span style={{color:'#fff', margin:'0 5px'}}>{t('home.block_content_text_five')}</span>
                </Container>
            </Box>
        </Box>
    )
}

export default HomeBlockContent