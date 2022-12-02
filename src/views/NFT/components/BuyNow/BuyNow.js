import React, { useContext, useEffect, useState } from 'react'
import { Box, Card, Container } from '@mui/material';
import ButtonStyled from 'components/ButtonStyled';
import { Formik, Form } from 'formik';
import { isApproved } from 'services/ERC721/isApproved';
import ShowSign from 'components/ShowSign';
import ModalCustom from 'components/ModalCustom';
import LoaderModal from 'components/LoaderModal';
import { useTranslation } from 'react-i18next';
import { buyNow } from 'services/Exchange/buyNow';
import { Context } from 'hooks/WalletContext';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import { NFTBuyNow, TextField, containerInputStyles, titleBuyStyles, labelPriceStyles } from './styled';
import { buySchema } from './schema';
import PropTypes from 'prop-types';

const BuyNow = ({projectKey, userAccount, image, isVideo,nft,owner}) => {
    const { t } = useTranslation("translate");
    const [isUserSigned, setIsUserSigned] = useState(false)
    const [openModalSignature, setOpenModalSignature] = useState(false)
    const { data } = useContext(Context);
    const {setOpenWallet } = useContext(DrawerMobileContext);
    useEffect(async()=>{
        let approve = await isApproved(projectKey, userAccount, process.env.REACT_APP_EXCHANGE);
        setIsUserSigned(approve)
        //setIsUserSigned(false)
    },[])
    return (
        <Card sx={{ padding: '1rem' }}>
            <NFTBuyNow>
                <Formik
                    initialValues={{price: nft && nft.on_sale && nft.sale && nft.sale.price ? nft.sale.price:0}}
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
                        <Form name='buy' style={{ width:'100%' }}>
                            <Box display='flex' flexDirection='column' sx={{ width:'100%' }}>
                                <Container maxWidth='md' sx={containerInputStyles}>
                                    <Box component='label' htmlFor='price' sx={titleBuyStyles}>
                                        {t("component_buy_now.buy_now")}
                                    </Box>
                                    <TextField id='price' type='number' name='price' placeholder='0.00' value={nft && nft.on_sale && nft.sale && nft.sale.price} />
                                    {errors.price && touched.price ? (
                                        <div style={{color:'#dc3545', display:'none'}}>{errors.price}</div>
                                    ) : null}
                                    {nft && nft.on_sale && nft.sale && nft.sale.price && nft.sale.coin &&
                                        <Box component='span' sx={labelPriceStyles}>{nft.sale.price +' AVAX'}</Box>
                                    }
                                </Container>
                                {
                                    data && data.userAccount && data.userAccount != null && data.userAccount != 'undefined' ?
                                        data && data.userAccount != owner &&
                                        <ButtonStyled type='submit' text={t("component_buy_now.buy_now")} width='100%' />
                                    :
                                    <ButtonStyled onClick={()=>{setOpenWallet(true)}} text={"Connect wallet"} width='100%' />
                                }
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
            </NFTBuyNow>
            {/* <Divider sx={{width:'100%', marginTop:'1rem', marginBottom:'1rem'}} /> */}
            <Box display='none' justifyContent='space-between' alignContent='center' sx={{height:'3.5rem'}}>
                <Box component='p' sx={{color:'#7f7f7f', fontSize:'15px', fontWeight:600}}>Minted 24 minutes ago</Box>
                <ButtonStyled type='button' text='Make offer' width='200px' />
            </Box>
        </Card>
    )
}

BuyNow.propTypes = {
    tokenId: PropTypes.number,
    projectKey: PropTypes.string,
    image: PropTypes.string.isRequired,
    isVideo: PropTypes.bool.isRequired,
    userAccount: PropTypes.string.isRequired,
    nft: PropTypes.object,
    owner: PropTypes.any
}

export default BuyNow