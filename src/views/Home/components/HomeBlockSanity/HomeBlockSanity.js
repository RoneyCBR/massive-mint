import React, { useContext } from 'react'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import { Context } from 'hooks/WalletContext';

const HomeBlockSanity = () => {
    const { t } = useTranslation("translate");
    const { setOpenWallet } = useContext(DrawerMobileContext);
    const { data } = useContext(Context);
    const handleClickOpenForm = ()=>{
        const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdmKi_MNSK-WPu8Utmz9ekcmybbRcMsjdpeGqmrlvCX-C3PeA/viewform'
        window.open(url, '_blank')
    }
    const handleOpenWallet = () => {
        /* disable scroll */
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        setOpenWallet(true);
    }
    return (
        <Box
            component='section'
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            sx={{
                // marginTop: '50px',
                boxSizing: 'border-box',
                padding: '25px 0px',
                color: '#fff',
                '@media screen and (max-width: 768px)': {
                    flexDirection: 'column',
                }
            }}
        >
            <Box display='none' justifyContent='center' flexDirection='column' alignItems='center'>
                <Box sx={{fontSize:'30px'}}>{t('home.block_content_text_six')}</Box>
                {data && !data.userAccount &&
                <Box>
                    <Button
                        onClick={handleOpenWallet}
                        type='button'
                        variant='contained'
                        sx={{
                            fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            color: '#000',
                            boxShadow: 'none',
                            borderRadius: '5px',
                            fontSize: {xs:'15px',sm:'18px',md:'25px'},
                            ':hover': {
                                backgroundColor: '#fff',
                                boxShadow: '0px 0px 10px #fff',
                            }
                        }}
                    >
                        {t('home.block_content_text_seven')}
                    </Button>
                </Box>}
            </Box>
            <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                <Box sx={{lineHeight:'1.2',fontSize: {xs:'20px',sm:'25px',md:'30px'},color:'#fff',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>{t('home.block_content_text_eight')}</Box>
                <Box
                    sx={{
                        mt:'15px'
                    }}
                >
                    <Button
                        type='button'
                        variant='contained'
                        onClick={handleClickOpenForm}
                        sx={{
                            fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                            backgroundColor: '#fff',
                            color: '#000',
                            boxShadow: 'none',
                            borderRadius: '5px',
                            fontSize: {xs:'15px',sm:'20px',md:'25px'},
                            ':hover': {
                                backgroundColor: '#fff',
                                boxShadow: '0px 0px 10px #fff',
                            }
                        }}
                    >
                        {t('home.block_content_text_nine')}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default HomeBlockSanity