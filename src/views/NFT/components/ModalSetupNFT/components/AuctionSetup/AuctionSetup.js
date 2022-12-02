import React, { useContext, useState } from 'react'
import { Modal, Paper, Box, Button, CardMedia } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled'
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import ButtonStyled from 'components/ButtonStyled';
import { useTranslation } from 'react-i18next';
import LoaderModal from 'components/LoaderModal';
import {configurationAuction } from 'services/Exchange/configurationAuction.js'
import { updateOwner } from 'services/Blockchain/updateOwner';
import { Context } from 'hooks/WalletContext';
import PropTypes from 'prop-types';


const auctionSchema = Yup.object().shape({
    price: Yup.number()
        .min(0, 'El precio debe ser mayor a 0')
        .positive('El precio debe ser positivo')
        .required('El precio es requerido'),
    time: Yup.string().
        required('El tiempo es requerido'),
    start: Yup.string().
        required('Start time is required'),
    currency: Yup.string().
        required('Currency is required'),
});

const TextField = styled(Field)`
    width:100%;
    border-radius:8px;
    border:1px solid #E5E5E5;
    padding:10px;
    font-size: 16px;
`;

const AuctionSetup = ({tokenId, projectKey,isOpen, isClosed, width, selector, image,auction, setOpenModalSelectconfiguration}) => {
    const { t } = useTranslation("translate");
    const { data } = useContext(Context);
    const [disableButton, setDisableButton] = useState(false);
    const [auctionState] =useState(auction);
 
    const handleCloseModal = () => {
        selector(1);
        isClosed(false);
        setOpenModalSelectconfiguration(true) 
        let timeOut = setTimeout(() => {
            setOpenModalSelectconfiguration(false) 
            clearTimeout(timeOut)
            return null;
        }, 3000);
    }
    return (
        <Modal
            open={isOpen}
            onClose={()=>isClosed(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Paper
                sx={{
                    width: width ? width : 1100,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #E5E5E5',
                    borderRadius:'8px',
                    boxShadow: 24,
                    p: 4,
                    overflow:'auto',
                    '@media (max-width:850px)':{
                        width: '100%',
                        height: '100%'
                    },
                    '@media (max-width:830px)':{
                        width: '100%',
                        height: '100%'
                    },
                    '@media (max-width:600px)':{
                        width: '100vw',
                        height: '100%'
                    }
                }}
            >
                <Box
                    display='flex' 
                    justifyContent='flex-end' 
                    alignItems='flex-start' 
                    sx={{width:'100%'}}
                >
                    <Button type='button' onClick={handleCloseModal}> 
                        <CloseIcon />
                    </Button>
                </Box>
                <Box
                    display='flex' 
                    justifyContent='center' 
                    alignItems='flex-start' 
                >
                    <h1>{t("auction_modal.title")}</h1>
                </Box>
                <Box 
                    display='flex' 
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                        gap: '5rem',
                        '@media screen and (max-width: 360px)': {
                            flexDirection: 'column'
                        }
                    }}
                >
                    <CardMedia
                        component='img'
                        src={image}
                        alt='NFT'
                        muted
                        loop
                        autoPlay
                        sx={{
                            borderRadius: '10px',
                            width: '25%',
                            height: '25%',
                        }}
                    />
                    <Formik
                        initialValues={auctionState.init_price <= 0 ? {
                            price: '',
                            date: new Date().getTime(),
                            time: '',
                            start: '',
                        } : {
                            price: auctionState.init_price,
                            date: new Date().getTime(),
                            time: (auctionState.time_live / (60*60)),
                            start: '',
                        }}
                        validationSchema={auctionSchema}
                        onSubmit={async(values, { setSubmitting }) => {
                            setSubmitting(true);
                            console.log('values ::', values)
                            let startNow = values.start.includes("after") ? false : true
                            let { id, address, transactionHash } = await configurationAuction(tokenId,projectKey,values.price,(values.time * 60 * 60),true,startNow,data.userAccount,data.provider);
                            console.log( id, address, transactionHash )
                            localStorage.removeItem('lastTx')
                            localStorage.setItem('lastTx', transactionHash)
                            localStorage.setItem('lastTxWho','Success update! Now your nft is on auction')
                            await updateOwner(tokenId,projectKey).then((response) => {
                                console.log('data of transfer',response)
                                setSubmitting(false);
                                setDisableButton(false);
                                handleCloseModal()
                            })

                        }}
                    >
                        {({ errors, touched, isSubmitting}) =>(
                        <Form name='auction'>
                            <Box
                                display='flex'
                                flexDirection='column'
                                sx={{gap:'1rem'}}
                            >
                                <Box>
                                    <Box component='label' htmlFor='currency'>{t('modal_setup_sale.currency')} *</Box>
                                    <TextField 
                                        id='currency'
                                        name='currency'
                                        as='select'
                                    >
                                        <option value='0'>--</option>
                                        <option value={'wavax'}>WAVAX</option>
                                        {/* <option value={'usdc'}>USDC</option>
                                        <option value={'usdt'}>USDT</option>
                                        <option value={'weth'}>WETH</option> */}
                                    </TextField> 
                                    {errors.currency && touched.currency ? (
                                        <div style={{color:'#dc3545'}}>{errors.currency}</div>
                                    ) : null}
                                </Box>
                                <Box>
                                    <Box component='label' htmlFor='price'>{t("auction_modal.initial_price")} *</Box>
                                    <TextField id='price' name='price' type='number' placeholder='0.0 AVAX' />
                                    {errors.price && touched.price ? (
                                        <div style={{color:'#dc3545'}}>{errors.price}</div>
                                    ) : null}
                                </Box>
                                <Box>
                                    <Box component='label' htmlFor='end-time'>{t("auction_modal.auction_time")} *</Box>
                                    <TextField 
                                        id='end-time'
                                        name='time'
                                        as='select'
                                    >
                                        <option value='0'>--</option>
                                        <option value={24}>24 hrs</option>
                                        <option value={48}>48 hrs</option>
                                        <option value={72}>72 hrs</option>
                                    </TextField> 
                                    {errors.time && touched.time ? (
                                        <div style={{color:'#dc3545'}}>{errors.time}</div>
                                    ) : null}
                                </Box>
                                <Box>
                                    <Box component='label' htmlFor='start-time'>{t('auction_modal.start_time')} *</Box>
                                    <TextField 
                                        id='start-time'
                                        name='start'
                                        as='select'
                                    >
                                        <option value='0'>--</option>
                                        <option value={'now'}>{t('auction_modal.start_now')}</option>
                                        <option value={'after'}>{t('auction_modal.start_in')}</option>
                                    </TextField> 
                                    {errors.start && touched.start ? (
                                        <div style={{color:'#dc3545'}}>{errors.start}</div>
                                    ) : null}
                                </Box>
                               
                                <Box display='flex' justifyContent='center' sx={{gap:'1rem', marginTop:'2rem'}}>
                                    <ButtonStyled type='submit' isDisabled={disableButton} text={t("auction_modal.confirm_btn")} />
                                    <ButtonStyled type='button' isDisabled={disableButton} onClick={handleCloseModal} text={t("auction_modal.cancel_btn")} />
                                </Box>
                            </Box>
                            <LoaderModal isOpen={isSubmitting} textColor='#fff' text='updating...' />
                        </Form>)}
                    </Formik>
                </Box>
            </Paper>
        </Modal>
    )
}

AuctionSetup.propTypes = {
    isOpen: PropTypes.bool,
    isClosed: PropTypes.func,
    width: PropTypes.number,
    selector: PropTypes.func,
    tokenId: PropTypes.number,
    projectKey: PropTypes.string,
    image: PropTypes.string.isRequired,
    auction: PropTypes.object,
    setOpenModalSelectconfiguration: PropTypes.func,
}

export default AuctionSetup
