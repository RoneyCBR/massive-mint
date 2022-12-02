import React, { useContext, useState } from 'react'
import { Box, Card, Container } from '@mui/material';
import ButtonStyled from 'components/ButtonStyled';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import ShowSign from '../ShowSign'
import ModalCustom from 'components/ModalCustom';
import LoaderModal from 'components/LoaderModal';
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next';
import { buyNow } from 'services/Exchange/buyNow';
import { Context } from 'hooks/WalletContext';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import PropTypes from 'prop-types';

const buySchema = Yup.object().shape({
    price: Yup.number()
        .min(0, 'El precio debe ser mayor a 0')
        .positive('El precio debe ser positivo')
        .required('El precio es requerido'),
});

const TextField = styled(Field)`
    width:100%;
    border-radius:8px;
    border:1px solid #E5E5E5;
    padding:10px;
    font-size: 16px;
    display:none;
`;


const BuyNow = ({ nft }) => {
    const { t } = useTranslation("translate");
    const [isUserSigned, setIsUserSigned] = useState(false)
    const [openModalSignature, setOpenModalSignature] = useState(false)
    const { data } = useContext(Context);
    const {setOpenWallet } = useContext(DrawerMobileContext);
    const initialValues = {
        price: nft && nft.on_sale && nft.sale && nft.sale.price ? nft.sale.price:0
    }
    const media = nft.metadata.is_video ? nft.thumb_gif : nft.thumb_url_mini;
    return (
        <Card sx={{ padding: '1rem' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap:'1rem',
                    '@media screen and (max-width: 600px)': {
                        flexDirection:'column',
                    }
                }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={buySchema}
                    onSubmit={async(values, { setSubmitting }) =>{
                        if(values.price > 0){
                            await buyNow(nft.token_id,nft.project_key,process.env.REACT_APP_WRAPPED,values.price,data.userAccount,data.provider)
                            setSubmitting(false)
                            console.log(isUserSigned)
                        }
                    }}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form name='buy' style={{width:'100%'}}>
                            <Box display='flex' flexDirection='column' sx={{width:'100%'}}>
                                <Container maxWidth='md' sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <Box component='label' htmlFor='price' sx={{fontSize:'15px', fontWeight:600, color:'#7f7f7f'}}>{t("component_buy_now.buy_now")}</Box>
                                    <TextField id='price' type='number' name='price' placeholder='0.00' value={nft && nft.on_sale && nft.sale && nft.sale.price} />
                                    {errors.price && touched.price ? (
                                        <div style={{color:'#dc3545', display:'none'}}>{errors.price}</div>
                                    ) : null}
                                    { nft && nft.on_sale && nft.sale && nft.sale.price && nft.sale.coin &&
                                        <Box component='span'  sx={{fontSize:'25px', fontWeight:600}}>{nft.sale.price +' ETHER'}</Box>
                                    }
                                 
                                </Container>
                                {
                                    data && data.userAccount && data.userAccount != null && data.userAccount != 'undefined' ?
                                        data && data.userAccount != nft.owner &&
                                        <ButtonStyled type='submit' text={t("component_buy_now.buy_now")} width='100%' />
                                    :
                                    <ButtonStyled onClick={()=>{setOpenWallet(true)}} text={"Connect wallet"} width='100%' />
                                }
                            </Box>
                            <LoaderModal isOpen={isSubmitting} textColor='#fff' text='loading...' />
                            <ModalCustom isOpen={openModalSignature} onCloseModal={setOpenModalSignature}>
                                <ShowSign 
                                    projectKey={nft?.project_key}
                                    src={media}
                                    userSigned={setIsUserSigned}
                                    onClose={setOpenModalSignature}
                                />
                            </ModalCustom>
                        </Form>
                    )}
                </Formik>
            </Box>
            {/* <Divider sx={{width:'100%', marginTop:'1rem', marginBottom:'1rem'}} /> */}
            <Box display='none' justifyContent='space-between' alignContent='center' sx={{height:'3.5rem'}}>
                <Box component='p' sx={{color:'#7f7f7f', fontSize:'15px', fontWeight:600}}>Minted 24 minutes ago</Box>
                <ButtonStyled type='button' text='Make offer' width='200px' />
            </Box>
        </Card>
    )
}

BuyNow.propTypes = {
    nft: PropTypes.object
}

export default BuyNow