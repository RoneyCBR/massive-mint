import React,{useState,useContext} from 'react';
import { Box, Container } from '@mui/material';
import { Formik, Form } from 'formik';
import { TextField } from './styles/styles';
import LoaderModal from 'components/LoaderModal';
import ButtonStyled from 'components/ButtonStyled';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import Web3 from 'web3';
import { sign } from 'services/Utils/signature';
import { Context } from 'hooks/WalletContext';


const validationSchema = Yup.object().shape({
    address: Yup.string()
    .required('Required address')
});

const Setup1 = () => {
    const { t } = useTranslation("translate");
    const location = useHistory();
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState('');
    const { data } = useContext(Context)

    const handleIsValidateAddress = (address) => {
        return Web3.utils.isAddress(address);
    }

    const handleSignMetamask = async (address) => {
        console.log(address)
        if(data && data.userAccount && data.userAccount != 'undefined'){
            setMsg('');
            setLoader(true);
            let {signature, message} = await sign("Sign deploy", data.userAccount,data.provider)
                .catch((error =>{
                    console.log("error::",error);
                    setMsg(error.message+'');
                    return {signature:null, message:error.message};
            }));
            if(signature){
                console.log("debug message::",message);
                setLoader(false);
                setMsg('Sign successful');
                location.push('/setup-2');
            }
            setLoader(false);
        }else{
            setMsg('Please connect wallet');
        }
    }
    

    return (
        <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'100vh'}}>
            <Container maxWidth='md' sx={{padding:'5%', border:'1px #eee solid'}}>
                <Formik 
                    initialValues={{
                        address: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async(values,e) => {
                        if(handleIsValidateAddress(values.address)){
                            handleSignMetamask(values.address);
                        }else{
                            e.setErrors({address:'Invalid address'});
                        }
                       
                    }}
                >
                    {({errors,touched,values,setValues,isSubmitting})=>(
                        <Form>
                            <Container maxWidth='sm'>
                                <Box 
                                    component='label' 
                                    htmlFor='user'
                                    sx={{
                                        fontSize:'25px',
                                        textTransform:'uppercase'
                                    }}
                                >
                                    Payment wallet
                                </Box>
                                <TextField
                                    disabled={isSubmitting||loader}
                                    id='address'
                                    type='text'
                                    name='address'
                                    placeholder='0x00...0000'
                                    value={values.address}
                                    onChange={(e)=>{
                                        setValues({...values,address:e.target.value});
                                    }}
                                />
                                {errors.address && touched.address ? (
                                    <div style={{color:'#dc3545'}}>{errors.address}</div>
                                ) : null}
                                <Box sx={{height:'20px'}} />
                                <ButtonStyled text={t("setup2.sign")} type='submit' isDisabled={isSubmitting||loader}/>
                            </Container>
                            <LoaderModal
                                setIsClosed = {() => {}}
                                text={t("setup2.loading")}
                                isOpen={isSubmitting || loader}
                                textColor='#fff'
                                spinnerColor='#fff'
                            />
                        </Form>
                    )}
                </Formik>
                <Box    
                    sx={{
                        display:'flex',
                        justifyContent:'center',mt:'15px'
                    }}
                >
                    <Box>{msg}</Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Setup1;