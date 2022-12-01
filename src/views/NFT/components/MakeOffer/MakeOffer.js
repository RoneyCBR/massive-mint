import React, { useEffect, useState } from 'react'
import { Box, Card, Container } from '@mui/material';
import ButtonStyled from 'components/ButtonStyled';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { isApproved } from 'services/ERC721/isApproved';
import ShowSign from 'components/ShowSign'
import ModalCustom from 'components/ModalCustom';
import LoaderModal from 'components/LoaderModal';
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const buySchema = Yup.object().shape({
    offer: Yup.number()
        .min(0, 'El precio debe ser mayor a 0')
        .positive('El precio debe ser positivo')
        .required('El precio es requerido'),
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


const MakeOffer = ({projectKey, userAccount, image, isVideo}) => {
    const { t } = useTranslation("translate");
    const [isUserSigned, setIsUserSigned] = useState(false)
    const [openModalSignature, setOpenModalSignature] = useState(false)
    useEffect(async()=>{
        let approve = await isApproved(projectKey, userAccount, process.env.REACT_APP_EXCHANGE);
        setIsUserSigned(approve)
        //setIsUserSigned(false)
    },[])
    return (
        <Card
            sx={{
                padding: '1rem',
            }}
        >
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
                    initialValues={{price: 0.25}}
                    validationSchema={buySchema}
                    onSubmit={(values, { setSubmitting }) =>{
                        console.log('submit from buy::', values, setSubmitting);
                        if(!isUserSigned){
                            setSubmitting(false);
                            //setOpenModalSignature(true);
                            console.log('open modal signature', setOpenModalSignature);
                        }
                    }}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form name='buy' style={{width:'100%'}}>
                            <Box display='flex' flexDirection='column' sx={{width:'100%'}}>
                                <Container maxWidth="md">
                                    <Box component='label' htmlFor='offer' sx={{fontSize:'15px', fontWeight:600, color:'#7f7f7f'}}>{t("offer_view.select_currency")}</Box>
                                    <TextField 
                                        id='currency'
                                        name='currency'
                                        as='select'
                                    >
                                        <option value='0'>--</option>
                                        <option value={'wavax'}>WAVAX</option>
                                        <option value={'usdc'}>USDC</option>
                                        <option value={'usdt'}>USDT</option>
                                        <option value={'weth'}>WETH</option>
                                    </TextField> 
                                    {errors.currency && touched.currency ? (
                                        <div style={{color:'#dc3545'}}>{errors.currency}</div>
                                    ) : null}
                                </Container>
                                <Container maxWidth="md">
                                    <Box component='label' htmlFor='offer' sx={{fontSize:'15px', fontWeight:600, color:'#7f7f7f'}}>{t("offer_view.your_offer")}</Box>
                                    <TextField id='price' type='number' name='offer' placeholder='0.00' /> 
                                    {errors.offer && touched.offer ? (
                                        <div style={{color:'#dc3545'}}>{errors.offer}</div>
                                    ) : null}
                                </Container>
                                <br />
                                <ButtonStyled type='submit' text={t("offer_view.btn_offer")} width='100%' />
                            </Box>
                            <LoaderModal isOpen={isSubmitting} textColor='#fff' text='loading...' />
                            <ModalCustom isOpen={openModalSignature} onCloseModal={setOpenModalSignature}>
                                <ShowSign 
                                    projectKey={projectKey}
                                    image={image} 
                                    isVideo={isVideo} 
                                    userSigned={setIsUserSigned} 
                                    onClose={setOpenModalSignature}
                                    showButtonClose={false}
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

MakeOffer.propTypes = {
    tokenId: PropTypes.number,
    projectKey: PropTypes.string,
    image: PropTypes.string.isRequired,
    isVideo: PropTypes.bool.isRequired,
    userAccount: PropTypes.string.isRequired,
}

export default MakeOffer