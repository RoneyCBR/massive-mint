import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Card, CardMedia, Grid, Modal } from '@mui/material';
import { layoutWhitetList } from 'api/sanity';
import BlockContent from '@sanity/block-content-to-react';
import { Container } from '@mui/system';
import WhiteListForm from './components/WhiteListForm';
import { Context } from 'hooks/WalletContext';
import { Link } from 'react-router-dom';
import ButtonStyled from 'components/ButtonStyled';
import metamask from 'assets/logos/metamask.svg';
import wcLogo from 'assets/logos/walletconnect-circle.svg';
import WhiteListFormFrame from './components/WhiteListFormFrame';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { isOnWhitelist } from 'services/MintList/IsOnWhitelist';
import { useFetch } from 'hooks/useFetch';
import LoaderCircle from 'components/LoaderCircle';
import ErrorMessage from 'components/ErrorMessage';
import { useTranslation } from 'react-i18next';
import LayoutVideo from 'layouts/LayoutVideo';


import styled from "@emotion/styled/macro";

const Background = styled(Card)({
    borderRadius: '8px',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#FFF",
    position: "relative",
    width:'100%',
    height:'280px',
    cursor: "pointer",
    [`:hover ${CardMedia}`]: {
      backgroundColor: "rgba(0,0,0,.5)",
    },
    [`:hover ${CardMedia}`]: {
      opacity: 1,
    },
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)'
    },
    ["@media (max-width: 320px)"]: {
      height: '330px'
    }
});

const Home = () => {
    const { data:wallet, connection } = useContext(Context);
    const { t } = useTranslation("translate");
    const [sanityLayout, setSanityLayout] = useState(null);
    const [sanityError, setSanityError] = useState(null);
    const [selectFormType, setSelectFormType] = useState(0);
    const [formFrame, setFormFrame] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const url = `${process.env.REACT_APP_URL_API}/project?domain=${process.env.REACT_APP_DOMAIN}&key_name=NEWS&key_val=NEWS&limit=100&page=0&order=created`;
    const { data: projects, error, loading } = useFetch(url);
    useEffect(()=>{
        if (wallet && wallet.userAccount) {
            isOnWhitelist(wallet.provider, wallet.userAccount)
                .then((response)=>{
                    console.log('isRegister', response);
                    if (response) {
                        setIsOwner(true);
                    } else {
                        setIsOwner(false);
                    }
                })
                .catch((error)=>{
                    console.error(error);
                    setIsOwner(false);
                })
        }
    }, [wallet]);
    useEffect(()=>{
        layoutWhitetList()
            .then((response) => {
                if (response) {
                    setSanityLayout(response[0]);
                }
            })
            .catch((error) => {
                console.error(error);
                setSanityError(error);
            })
    }, []);
    const handleCloseModalFrame = () => {
        setFormFrame(false);
    };
    if (sanityError) {
        return(<div>Hubo un error en la conexión reintenta más tarde</div>);
    }

    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ minHeight: '90vh' }}>
                <LoaderCircle text={t("home_layout_view.loading")} />
            </Box>
        );
    }
    if (error) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ minHeight: '90vh' }}>
                <ErrorMessage error={error} />
            </Box>
        );
    }
    return (
        <>
            <LayoutVideo />
            {sanityLayout && (
                <Box
                    sx={{
                        backgroundImage: { xs : `url(${sanityLayout.backgroundMobile.asset.url})`, sm : `url(${ sanityLayout.background.asset.url})`},
                        backgroundRepeat: 'no-repeat',
                        backgroundSize:  'cover',
                        backgroundPosition: 'center center',
                        minHeight: '100vh',
                        width: '100vw',
                        opacity: loading ? 0 : 1
                    }}
                >
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ color: '#fff' }}
                        >
                            <CardMedia
                                component="img"
                                src={sanityLayout.logo.asset.url}
                                alt={sanityLayout.logo.asset._id}
                                sx={{ width:{xs:'180px',sm:'200px',md:'200px',lg:'200px',xl:'10%'}, mt: 5}}
                            />
                            <Container maxWidth="sm">
                                <Box
                                    component="h1"
                                    sx={{ textAlign: 'center', marginBottom: '0px' }}
                                >
                                    {sanityLayout.title}
                                </Box>
                            </Container>
                            <Container maxWidth="sm" sx={{ display: 'none' }}>
                                <Box
                                    component="h1"
                                    sx={{ textAlign: 'center', marginBottom: '0px' }}
                                >
                                    {sanityLayout.startDate}
                                </Box>
                            </Container>
                            { sanityLayout.description != null &&
                                <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                                    <BlockContent
                                        blocks={sanityLayout.description}
                                        projectId="8z1w12hg"
                                    />
                                </Container>
                            }
                            {
                                projects && projects.length == 0 || projects == "" &&
                                <React.Fragment>
                                    <h2 style={{color:'#fff'}}>{t("collection.any_results")}</h2>
                                </React.Fragment>
                            }
                            {
                                !error && !loading && projects && projects.length > 0  &&
                                <Container maxWidth="lg" sx={{ mb: 5 }}>
                                    <Grid
                                        container
                                        spacing={2}
                                        columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                                        sx={{ mt: 0 }}
                                    >
                                        {projects && projects.map((project, index) => (
                                            <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={4}
                                                sx={{
                                                    width:'100%'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: "rgba(0, 0, 0,.5)",
                                                        borderRadius:'8px 8px 8px 8px',
                                                        boxShadow:'inset 0px 0px 10px  rgba(255,255,255,.5)',
                                                        p:'15px'
                                                    }}
                                                >
                                                <Link
                                                    to={`/collection-buy?collection=${project.project_key}`}
                                                    style={{textDecoration:'none'}}
                                                >
                                                <Background>
                                                    <CardMedia
                                                        className={project.is_video ? 'card-collection is-video-collection' : 'card-collection'}
                                                        component={project.is_video ? 'video' : 'img'}
                                                        src={project.thumb_url}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        sx={{
                                                            position:'relative',
                                                            borderRadius: '8px 8px 8px 9px',
                                                            height:'100%',
                                                            width:'100%',
                                                            margin: '0 auto'
                                                        }}
                                                    />
                                                </Background>
                                                </Link>
                                                <center>
                                                <Button
                                                    LinkComponent={Link}
                                                    to={`/collection-buy?collection=${project.project_key}`}
                                                    type="button"
                                                    sx={{
                                                        mt:'10px'
                                                    }}
                                                >
                                                    {project.name}
                                                </Button>
                                                </center>
                                                </Box>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Container>
                            }
                           
                            <Container maxWidth="sm" sx={{ display: 'none' }}>
                                {wallet && wallet.userAccount && !isOwner && (<WhiteListForm wallet={wallet} sanity={sanityLayout} />)}
                                {wallet && wallet.userAccount && isOwner && (
                                    <Box sx={{ textAlign: 'center', color: '#43B02A', fontSize: '25px', fontWeight: 600 }}>
                                        You already subscribed to our mint list
                                    </Box>
                                )}
                                {selectFormType == 0 && wallet && !wallet.userAccount && !isOwner && (
                                    <Box
                                        sx={{
                                            display:'none',
                                            justifyContent: 'center',
                                            alignItems:'center',
                                            gap:'15px',
                                            flexDirection:{xs:'column',sm:'row',md:'row',lg:'row',xl:'row'}
                                        }}
                                    >
                                        <ButtonStyled type="button" onClick={()=>setSelectFormType(1)} text="Connect Wallet" width="180px" />
                                        <ButtonStyled
                                            type="button"
                                            onClick={()=>window.open('https://proteinalab.com/mexico_open/register.html', '_blank')}
                                            text="For Credit Card"
                                            width="180px"
                                        />
                                    </Box>
                                )}
                                {selectFormType == 1 && wallet && !wallet.userAccount && !isOwner && (
                                    <>
                                        <Box 
                                            sx={{
                                                display:'flex',
                                                justifyContent: 'center',
                                                alignItems:'center',
                                                gap:'15px',
                                                flexDirection:{xs:'column',sm:'row',md:'row',lg:'row',xl:'row'}
                                            }}
                                        >
                                            <Button type="button" onClick={()=>connection('metamask')} sx={{ padding: '5px', width: '180px' }}>
                                                <CardMedia
                                                    component="img"
                                                    alt="Metamask"
                                                    src={metamask}
                                                    sx={{ width: '45px', mr: 2 ,p:'5px'}}
                                                />
                                                <Box>Metamask</Box>
                                            </Button>
                                            <Button type="button" onClick={()=>connection('walletConnect')} sx={{ padding: '5px', width: '180px' }}>
                                                <CardMedia
                                                    component="img"
                                                    alt="WalletConnect"
                                                    src={wcLogo}
                                                    sx={{ width: '45px', mr: 2 ,p:'5px'}}
                                                />
                                                <Box>WalletConnect</Box>
                                            </Button>
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center" gap="15px" sx={{ mt: 2 }}>
                                            <ArrowBackIcon
                                                size="large"
                                                onClick={()=>setSelectFormType(0)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    background: '#4aa521',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px'
                                                }}
                                            />
                                        </Box>
                                    </>
                                )}
                            </Container>
                        </Box>
                </Box>
            )}
            <Modal open={formFrame}>
                <>
                    <WhiteListFormFrame close={handleCloseModalFrame} />
                </>
            </Modal>
        </>
    );
};

export default Home;