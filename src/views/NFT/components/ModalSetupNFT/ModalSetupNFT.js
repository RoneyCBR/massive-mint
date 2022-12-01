import React, { useContext, useEffect, useState } from 'react';
import { Modal, Box, Container,Button, CardMedia, Divider, Alert, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
//import StepBar from 'components/StepBar';
import styled from '@emotion/styled'
import Web3 from 'web3';
import { Context } from 'hooks/WalletContext';
import avalancheIcon from 'assets/logos/avalanche_logo.svg'
import {useTranslation} from 'react-i18next'
import NumberInput from 'components/Form/NumberInput'
//import LoaderCircle from 'components/LoaderCircle';
import { safeApproveNFT } from 'services/web3/ERC1155/ApproveNFT';
import {saveConfiguration} from 'services/ExchangeConfiguration/saveConfiguration'
import { addExchange } from 'services/ExchangeDirect/addExchange'
//import {isApprovedForAll} from 'views/Shop/BuySection/ERC1155/isApprovedForAll'
import {setupSale} from './helpers/setupSale'
import ReservePrice from './components/ReservePrice';
import ButtonStyled from 'components/ButtonStyled';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import LoaderModal from 'components/LoaderModal';
import Proptypes from 'prop-types'
import { updateOwner } from 'services/Blockchain/updateOwner';
import { configurationSale } from 'services/Exchange/configurationSale';

const auctionSchema = Yup.object().shape({
    price: Yup.number()
        .min(0, 'Price must be greater than 0')
        .positive('Price must be positive')
        .required('Price is required'),
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

const OfferBox = styled(Box)`
    border: 1px solid #E5E5E5;
    //border-top: ${props => props.bt ? '4px solid #dedede' : '4px solid #000'}
    //border-top: 4px solid #000;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    height: auto;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    box-size: border-box;
    padding: 15px;
    ${props => props.styles}
`

const amountDefault = 20.0
const ModalSetupNFT =
    ({
        setOpenModalSetupNFT,
        openModalSetupNFT,
        nftImage,
        tokenId,
        setOpenModalSelectconfiguration,
        projectKey,
        sale
    })=>{

    const {t} = useTranslation("translate")
    const {data} = useContext(Context)
    const [lastCreated, setLastCreated] = useState(null)
    const [isTopOffer, setIsTopOffer] = useState(false)
    const [showButtons, setShowButtons] = useState(true)

    const [signData, setSignData] = useState(true)
    const [saveData, setSaveData] = useState(false)
    const [isInitialBaseOffer, setIsInitialBaseOffer] = useState(amountDefault)
    const [isInitialTopOffer, setIsInitialTopOffer] = useState(0)

    const [isValidSale,setIsValidSale] = useState(false);
    const [initSign,setInitSign] = useState(false);
    const [initSave,setInitSave] = useState(false);
    const [isProgressBar, setIsProgressBar] = useState(false)
    //const [nStep, setNStep] = useState(0)
    const [alert, setAlert] = useState(null)

    const [crypto, setCrypto] = useState('AVAX')

    const handleClosesModalSetup = async() => {
        setOpenModalSetupNFT(false)
        setOpenModalSelectconfiguration(true) 
        let timeOut = setTimeout(() => {
            setOpenModalSelectconfiguration(false) 
            clearTimeout(timeOut)
            return null;
        }, 3000);
    }

    const validateIfBaseOfferIsHigherTopOffer = () =>{
        setAlert(null)
        if(isTopOffer){
            if (parseFloat(isInitialBaseOffer) >= amountDefault) {
                setIsValidSale(true);
            } else {
                setIsValidSale(false);
                createAlert('error','Minimal price must be greater than '+amountDefault)
                return;
            }

            if(isInitialTopOffer >= isInitialBaseOffer){
                setIsValidSale(true);
            }else{
                setIsValidSale(false);
                createAlert('error','Reserve price must be greater than Minimal price of'+amountDefault)
                return;
            }
        }else{
            if (parseFloat(isInitialBaseOffer) >= amountDefault) {
                setIsValidSale(true);
            } else {
                setIsValidSale(false);
                createAlert('error','Minimal price must be greater than '+amountDefault)
                return;
            }
        }
        return isValidSale;
    }
    const createAlert = (severity,msg)  => {
        let alert = {
            severity:severity,
            msg: msg
        }
        setAlert(alert)
    }
    const handleSign = () => {
        setAlert(null)
        if(validateIfBaseOfferIsHigherTopOffer()){
            setIsProgressBar(true)
            setInitSign(true)
            if(data && data.userAccount){
                if(!Web3.utils.isAddress(data.userAccount)){
                    setInitSign(false)
                    console.log('This address is not valid')
                    return
                }else{
                    safeApproveNFT(data.userAccount,process.env.REACT_APP_EXCHANGE_DIRECT,data.provider,(success) => {
                        console.log('success ::',success)
                        setInitSign(false)
                        setSignData(false)
                        setSaveData(true)
                       // setError(false)
                        //setNStep(1)
                        createAlert('success','Signing success')
                       // setMsg("Signing success");
                    },(err) => {
                        console.log('error ::', err)
                        setInitSign(false)
                        //setError(true)
                        setIsProgressBar(false)
                        if(err.code == '4001'){
                            createAlert('error',t("custom_error_metamask.cancel_transaction"))
                        } else if (err.code == '-32603'){
                            createAlert('error', "Error in the rpc, please try again later")
                        } else{
                            createAlert('error',"Error: "+ err.message.substring(0,100));
                        }
                        console.log("error sign",err)
                        return
                    })
                }
            }
        }
    }

    const handleSave = () =>{
        setInitSave(true)
        setIsProgressBar(true)
        setAlert(null)
        if (parseFloat(isInitialBaseOffer) >= amountDefault) {
            if (isTopOffer) {
                let weekTime = 604_800_000
                addExchange(data.userAccount,0.001,parseFloat(isInitialTopOffer),tokenId,weekTime,data.provider,() => {
                    saveConfigurationOnAPI(parseFloat(isInitialTopOffer))
                }, (err) => {
                    console.log('error ::', err)
                    setInitSave(false)
                    setIsProgressBar(false)
                    if(err.code == '4001'){
                        createAlert('error',t("custom_error_metamask.cancel_transaction"))
                    } else if (err.code == '-32603'){
                        createAlert('error', "Error in the rpc, please try again later")
                    } else{
                        createAlert('error',"Error: "+ err.message.substring(0,100));
                    }
                })
            } else {
                saveConfigurationOnAPI()
            }
        } else {
            setInitSave(false)
            setIsProgressBar(false)
            createAlert('error','Minimal price must be greater than '+amountDefault)
        }
    }

    const saveConfigurationOnAPI = (amount_top = 0) => {
        let setting = {
            'amount_top' : amount_top,
            'amount_floor' : parseFloat(isInitialBaseOffer),
            'id_token': tokenId,
            'main_key': data.userAccount
        }
        saveConfiguration(setting).then(() => {
            setInitSave(false)
            setShowButtons(false)
            setIsProgressBar(false)
            //setNStep(2)
            createAlert('success','Your settings have been saved')
        },(error) => {
            console.log(error)
        })
    }

    const handleChangeCheckBox = () =>{
        setIsTopOffer(!isTopOffer)
    }

    useEffect(async()=>{
        setIsProgressBar(false)
        setSignData(true)
        setSaveData(false)
        setInitSign(false)
        //setNStep(0)
        setInitSave(false)
        setAlert(null)
        if(data){
            try {
                //let approved = await isApprovedForAll(data.userAccount,process.env.REACT_APP_EXCHANGE_DIRECT)
              //  if(approved) {
                    setInitSign(false)
                    setSignData(false)
                    setSaveData(true)
                    setIsProgressBar(false)
                    //setNStep(1)
            //    }
            } catch (error) {
                console.log('error ::', error)
            }
        }
        try {
            const lastSetting = await setupSale(tokenId)
            setIsInitialBaseOffer(lastSetting.floor)
            if (lastSetting.automatic_sell) {
                setIsInitialTopOffer(lastSetting.roof)
                setIsTopOffer(true)
            }
            setLastCreated(lastSetting.created)
            //console.log('lastSetting ::', lastSetting)
        } catch (error) {
            console.log('error ::', error)
        }

    },[openModalSetupNFT])

    useEffect(()=>{
        if(isTopOffer){
            if (isInitialTopOffer <= 0) {
                setIsInitialTopOffer((parseFloat(isInitialBaseOffer)+1))
            }
        }else{
            setIsInitialTopOffer(0)
        }
        
    },[isTopOffer])

    useEffect(()=>{
        if(isTopOffer){
            if (isInitialTopOffer <= 0) {
                setIsInitialTopOffer((parseFloat(isInitialBaseOffer)+1))
            }
        }else{
            setIsInitialTopOffer(0)
        }
    },[isInitialBaseOffer])

    useEffect(()=>{
       try {
        setIsInitialTopOffer(parseFloat(isInitialTopOffer))
       } catch (error) {
        setIsInitialTopOffer('')
       }
    },[isInitialTopOffer])

    const handleChangeCrypto = (e) => {
        setCrypto(e.target.value)
    }
    return (
        <Modal
            open={openModalSetupNFT}
            onClose={() => setOpenModalSetupNFT(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
           
        >
            <Box 
                sx={{
                    width: 1100,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #E5E5E5',
                    borderRadius:'8px',
                    boxShadow: 24,
                    overflow: 'auto',
                    p: 4,
                    outline: 'none',
                    ':focus': {
                        outline: 'none',
                    },
                    '@media screen and (max-width: 1000px)': {
                        width: '100vw'
                    },
                    '@media screen and (max-width: 750px)': {
                        width: '100vw',
                        height: '100vh',
                      
                    }
                }}
            >
                <Box sx={{
                        position:'relative'
                    }}>
                    <Box sx={{'@media screen and (max-width: 360px)': {
                                fontSize: '12px'
                            }}}> 
                        <center>
                            <h1 style={{textAlign:'center'}}>{t("modal_setup_sale.title")}</h1>
                        </center>
                    </Box>
                    <Box sx={{position:'absolute',top:'-18px',right:'0'}}>
                        <Button  variant="contained" 
                            disabled={isProgressBar}
                            sx={{
                                width:'30px',
                                background:"gray",
                                borderRadius:"20px 20px 20px 20px",
                                float:'right',
                                "&:hover":{
                                    background:"black"
                                }
                            }}
                            size="small"
                            onClick={handleClosesModalSetup}
                        >
                            <CloseIcon/>
                        </Button>
                        
                    </Box>
                </Box>      
                <Container 
                    component='main' 
                    maxWidth='md' 
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        
                    }}
                >
                   
                   {/* {
                       <StepBar nStep={nStep} steps={['Sign', 'Sale']} />
                   } */}
                    { lastCreated != 0 && lastCreated != null &&
                        <Box sx={{width:'100%', marginBottom: '2px'}}>
                            <center>
                                <Alert sx={{textAlign:'center',width:'80%'}} severity='info'>
                                    Last update : { new Date(lastCreated).toLocaleString() }
                                </Alert>
                            </center>
                        </Box>
                    }
                    { alert &&
                        <Box sx={{width:'100%'}}>
                            <center>
                                <Alert sx={{textAlign:'center',width:'80%'}} severity={alert.severity}>
                                    {alert.msg}
                                </Alert>  
                            </center>
                        </Box>
                    }
                </Container>
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
                        src={nftImage}
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
                        initialValues={ sale ?{
                            price: sale.price,
                            time: '',
                        }: {
                            price: '',
                            time: '',
                        }}
                        validationSchema={auctionSchema}
                        onSubmit={async(values, { setSubmitting,resetForm }) => {
                            setSubmitting(true);
                            let { id, address, transactionHash } = await configurationSale(tokenId,projectKey,values.price,true,data.userAccount,data.provider);
                            console.log( id, address, transactionHash )
                            localStorage.removeItem('lastTx')
                            localStorage.setItem('lastTx', transactionHash)
                            localStorage.setItem('lastTxWho','Success update! Now your nft is on sale')
                            await updateOwner(tokenId,projectKey).then((response) => {
                                console.log('data of transfer',response)
                                setSubmitting(false);
                                setOpenModalSetupNFT(false);
                                resetForm();
                                handleClosesModalSetup()
                               // setDisableButton(false);
                                //handleCloseModal()
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
                                        <option value={'avax'}>AVAX</option>
                                        {/* <option value={'avax'}>AVAX</option>
                                        <option value={'usdc'}>USDC</option>
                                        <option value={'usdc'}>USDT</option>
                                        <option value={'usdc'}>WETH</option> */}
                                    </TextField> 
                                    {errors.currency && touched.currency ? (
                                        <div style={{color:'#dc3545'}}>{errors.currency}</div>
                                    ) : null}
                                </Box>
                                <Box>
                                    <Box component='label' htmlFor='price'>{t("modal_setup_sale.price")} *</Box>
                                    <TextField id='price' name='price' type='number' placeholder='0.0 AVAX' />
                                    {errors.price && touched.price ? (
                                        <div style={{color:'#dc3545'}}>{errors.price}</div>
                                    ) : null}
                                </Box>
                                <Box display='flex' justifyContent='center' sx={{gap:'1rem', marginTop:'2rem'}}>
                                    <ButtonStyled type='submit' text={t("modal_setup_sale.confirm_btn")} />
                                    <ButtonStyled type='button' onClick={handleClosesModalSetup} text={t("modal_setup_sale.cancel_btn")} />
                                </Box>
                            </Box>
                            <LoaderModal isOpen={isSubmitting} textColor='#fff' text='updating...' />
                        </Form>)}
                    </Formik>
                </Box>
                <Container
                    component='section' 
                    maxWidth='xl'
                    sx={{
                        display:'none',
                        //display:'flex',
                        justifyContent:'space-around',
                        marginTop:'15px',
                        overflow: 'auto',
                        
                        '@media screen and (max-width:750px)':{
                            flexDirection:'column',
                            alignItems:'center',
                            marginTop:'0px',
                        }
                    }}
                >
                    <Box
                        component='div'
                        sx={{
                            display:'none',
                            width:'25%',
                            '@media screen and (max-width:1050px)':{
                                width:'35%',
                            },
                            '@media screen and (max-width:750px)':{
                                width:'100%',
                            }
                        }}
                    >
                        <center>
                            <CardMedia
                                component='img'
                                src={nftImage}
                                autoPlay
                                loop
                                //width="480px"
                                alt="NFT"
                                sx={{
                                    borderRadius:"8px",
                                    maxWidth:'60vw',
                                    '@media screen and (max-width:1000px)':{
                                        padding:'15px'
                                    },
                                    '@media screen and (max-width:750px)':{
                                        padding:'10px',
                                        borderRadius:"20px",
                                        marginTop:'0px',
                                        maxWidth:'40vw',
                                    },
                                }}
                            />
                        </center>
                    </Box>
                    <Box
                        component='div'
                        sx={{
                            display:'none',
                            marginTop:'-30px',
                            width:'50%',
                            '@media screen and (max-width:1050px)':{
                                marginTop:'10px',
                                width:'60%',
                            },
                            '@media screen and (max-width:750px)':{
                                marginTop:'0px',
                                width:'100%',
                            }
                        }}
                    >
                        <Box 
                            component='div'
                            display='flex'
                            justifyContent='center'
                            gap='15px'
                            sx={{
                                marginTop:'30px',
                                '@media screen and (max-width:750px)':{
                                    marginTop:'40px',
                                    flexDirection:'column',
                                    alignItems: 'center',
                                    width:'100%',
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    width: '50%',
                                    '@media screen and (max-width:1050px)':{
                                        width:'50%',
                                    },
                                    '@media screen and (max-width:750px)':{
                                        
                                        width:'90%',
                                    }
                                }}
                            >
                                <OfferBox
                                    sx={{
                                        borderTop: '4px solid #000 !important',
                                    }}
                                >
                                    <h3>{t("setup_modal.minimum_bid")}</h3>
                                    <Box 
                                        display='flex'
                                        sx={{
                                            marginTop:'5px',
                                            padding:'10px 0px',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            src={avalancheIcon}
                                            alt="avalanche"
                                            sx={{
                                                width:'40px',
                                                height:'40px',
                                                marginRight:'5px',
                                            }}
                                        />

                                        <NumberInput 
                                            disableUnderline
                                            value={isInitialBaseOffer}
                                            setValue={setIsInitialBaseOffer}
                                            name={"baseOffer"}
                                            placeholder=""
                                            isTopOffer={true}
                                            initSign={initSign}
                                            //nStep={nStep}
                                        />
                                    </Box>
                                    <Box 
                                        display='flex'
                                        sx={{
                                            marginTop:'5px',
                                            padding:'10px 0px',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            src={avalancheIcon}
                                            alt="avalanche"
                                            sx={{
                                                width:'40px',
                                                height:'40px',
                                                marginRight:'5px',
                                            }}
                                        />
                                        <Select 
                                            fullWidth
                                            value={crypto}
                                            onChange={handleChangeCrypto}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={'ETH'}>ETH</MenuItem>
                                            <MenuItem value={'AVAX'}>AVAX</MenuItem>
                                            <MenuItem value={'MATIC'}>MATIC</MenuItem>
                                        </Select> 
                                    </Box>
                                    <p>{t("setup_modal.minimum_bid_legend")}</p>
                                </OfferBox>
                            </Box>
                            <ReservePrice 
                                handleChangeCheckBox={handleChangeCheckBox}
                                isTopOffer={isTopOffer}
                                isInitialTopOffer={isInitialTopOffer}
                                setIsInitialTopOffer={setIsInitialTopOffer}
                                initSign={initSign}
                                //nStep={nStep}
                            />
                        </Box>
                    </Box>
                </Container>
                {/* <center>
                    {
                        initSign || initSave ? 
                            <LoaderCircle  text={nStep == 0 ? t("setup_modal.signing") :  t("setup_modal.saving")}/>
                        :''
                    }
                </center> */}
                <Container 
                    component='article' 
                    maxWidth='xs'
                    sx={{
                        display:'none',
                        marginTop:'30px',
                        //display:'flex',
                        justifyContent:'center',
                        gap: '20px',
                        '@media screen and (max-width:600px)':{
                            flexDirection:'column',
                        }
                    }}
                >

                    

                    {signData && showButtons &&(
                    <Button
                        onClick={handleSign}
                        variant="contained"
                        disabled={isInitialBaseOffer <= 0 || initSign || isTopOffer ? parseFloat(isInitialTopOffer) <= parseFloat(isInitialBaseOffer) || isInitialBaseOffer <= 0  : false || isTopOffer == true && isInitialTopOffer == ''}
                        sx={{
                            backgroundColor:"#000",
                            width:'120px',
                            '@media screen and (max-width:600px)':{
                                width:'100%',
                                marginBottom:'20px',
                            },
                            '&:hover':{
                                backgroundColor:"#000",
                            }
                        }}
                    >
                        {t("setup_modal.sign")}
                    </Button>)}
                    {saveData && showButtons &&(
                    <ButtonStyled
                        type="button"
                        isDisabled={initSave}
                        onClick={handleSave}
                        text={t("setup_modal.save")}
                    />)}
                    {showButtons &&
                    <ButtonStyled
                        type="button"
                        isDisabled={initSign || initSave}
                        onClick={handleClosesModalSetup}
                        text={t("setup_modal.cancel")}
                    />
                    }
                </Container>
                <Box
                    component='footer'
                    sx={{
                        width: '85%',
                        margin: '10px auto'
                    }}
                >
                    <Divider />
                    <p>{t("setup_modal.footer_text_1")}</p>
                </Box>
            </Box>
        </Modal>
    )
}

ModalSetupNFT.propTypes = {
    openModalSetupNFT: Proptypes.bool.isRequired,
    setOpenModalSetupNFT: Proptypes.func.isRequired,
    nftImage: Proptypes.string,
    tokenId : Proptypes.number,
    setOpenModalSelectconfiguration: Proptypes.func,
    projectKey: Proptypes.string,
    sale: Proptypes.object,
}

export default ModalSetupNFT;
