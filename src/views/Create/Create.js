import React, { useContext } from 'react'
import { Box, CardMedia, Container } from '@mui/material';
import mintNFTLogo from 'assets/images/mint/MINTEAR-NFT-1.jpg';
import mintCollectionLogo from 'assets/images/mint/COLECCION-1.jpg';
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { Context } from 'hooks/WalletContext';
import { useTranslation } from 'react-i18next';

const CreateItem = styled(Link)`
    text-decoration: none;
    color: #000;
    &:hover {
        color: '#000',
    };
`

const Create = () => {
    const { t } = useTranslation("translate");
    const {data}=useContext(Context);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    } ,[])


    return (
        <>
            <Container maxWidth="xl" sx={{ marginBottom: '3rem'}}>
                    <Box
                        component='h1'
                        sx={{
                            textAlign: 'center',
                            fontSize: '2rem',
                            fontWeight: 600,
                            color:'#fff'
                        }}
                    >
                        {t('create_view.title')}
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        alignContent='center'
                        sx={{
                            width:'100%',
                            mintHeight:'300px',
                            gap:'200px',
                            marginTop:'5rem',
                            '@media (max-width: 840px)': {
                                flexDirection: 'column',
                                gap: '10px',
                                marginTop: '0',
                                marginBottom: '2rem',
                            }
                        }}
                    >
                        <CreateItem to={`/create/select-collection?address=${data.userAccount}`}>
                            <Box
                                display='flex'
                                justifyContent='center'
                                flexDirection='column'
                                alignItems='center'
                                sx={{
                                    gap:'1rem',
                                    width:'300px',
                                    border:'1px solid #000',
                                    background:'rgba(0, 0, 0, 0.4)',
                                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
                                    borderRadius:'10px',
                                    boxSizing:'border-box',
                                    padding:'1rem',
                                    cursor:'pointer',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow:'0px 0px 10px #2A9114',
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    src={mintNFTLogo}
                                    sx={{
                                        borderRadius:'10px',
                                        minHeight:'100px'
                                    }}
                                />
                                <Box>
                                    <Box
                                        component='h3'
                                        sx={{
                                            fontSize:'1.5rem',
                                            textAlign:'center',
                                            color:'#fff'
                                        }}
                                    >
                                        {t('create_view.create_nft')}
                                    </Box>
                                </Box>
                            </Box>
                        </CreateItem>
                        <CreateItem to='/create/create-collection'>
                            <Box
                                display='flex'
                                justifyContent='center'
                                flexDirection='column'
                                alignItems='center'
                                sx={{
                                    gap:'1rem',
                                    width:'300px',
                                    border:'1px solid #000',
                                    background:'rgba(0, 0, 0, 0.4)',
                                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
                                    borderRadius:'10px',
                                    boxSizing:'border-box',
                                    padding:'1rem',
                                    cursor:'pointer',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow:'0px 0px 10px #2A9114',
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    src={mintCollectionLogo}
                                    sx={{
                                        borderRadius:'10px',
                                        minHeight:'100px'
                                    }}
                                />
                                <Box>
                                    <Box
                                        component='h3'
                                        sx={{
                                            fontSize:'1.5rem',
                                            textAlign:'center',
                                            color:'#fff'
                                        }}
                                    >
                                        {t('create_view.create_auction')}
                                    </Box>
                                </Box>
                            </Box>
                        </CreateItem>
                    </Box>
            </Container>
        </>
    )
}

export default Create