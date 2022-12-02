import React ,{useState} from 'react';
import { Box, Container } from '@mui/material';
import { Formik, Form } from 'formik';
import { TextField } from './styles/styles';
import LoaderModal from 'components/LoaderModal';
import ButtonStyled from 'components/ButtonStyled';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Web3 from 'web3';

const validationSchema = Yup.object().shape({
    user: Yup.string()
    .required('Required'),
    password: Yup.string()
    .required('Required'),
});

const Setup2 = () => {
    const { t } = useTranslation("translate");
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState('');

    const handleIsValidateAddress = (address) => {
        return Web3.utils.isAddress(address);
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'100vh'}}>
            <Container maxWidth='md' sx={{padding:'5%', border:'1px #eee solid'}}>
                <Formik 
                    initialValues={{
                        user: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async(values,e) => {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        if(handleIsValidateAddress(values.address)){
                            setLoader(true);
                            let timeout = setTimeout(() => {
                                setLoader(false);
                                setMsg('Success');
                                clearTimeout(timeout);
                            },3000)
                        }else{
                            e.setErrors({address:'Invalid address'});
                        }
                    }}
                >
                    {({errors, touched, isSubmitting})=>(
                        <Form>
                            <Container maxWidth='sm'>
                                <Box 
                                    component='label' 
                                    htmlFor='user'
                                    sx={{
                                        fontSize:'25px'
                                    }}
                                >
                                    {t("setup2.user")} 
                                </Box>
                                <TextField
                                    id='user'
                                    type='text'
                                    name='user'
                                    placeholder='0x00...0000'
                                    disabled={isSubmitting||loader}
                                />
                                {errors.user && touched.user ? (
                                    <div style={{color:'#dc3545'}}>{errors.user}</div>
                                ) : null}
                                <Box sx={{height:'20px'}} />
                                <Box 
                                    component='label' 
                                    htmlFor='password'
                                    sx={{
                                        fontSize:'25px'
                                    }}
                                >
                                    {t("setup2.password")}
                                </Box>
                                <TextField
                                    id='password'
                                    type='password'
                                    name='password'
                                    placeholder='password'
                                    disabled={isSubmitting||loader}
                                />
                                {errors.password && touched.password ? (
                                    <div style={{color:'#dc3545'}}>{errors.password}</div>
                                ) : null}
                                <Box sx={{height:'20px'}} />
                                <ButtonStyled text={t("setup2.sign")} type='submit' disabled={isSubmitting||loader}/>
                            </Container>
                            <LoaderModal
                                setIsClosed = {() => {}}
                                text={t("setup2.loading")}
                                isOpen={isSubmitting||loader}
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

export default Setup2