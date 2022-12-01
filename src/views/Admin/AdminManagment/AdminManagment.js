import React, { useContext } from 'react'
import { Box, Button, Container } from '@mui/material'
import { sign } from 'services/Utils/signature';
import { Context } from 'hooks/WalletContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { validateAddress } from 'services/Utils/validateAddress';
import LoaderModal from 'components/LoaderModal';

const addresSchema = Yup.object().shape({
    address: Yup.string()
        .required('Address is required'),
});

const AdminManagment = () => {
    const  { t } = useTranslation("translate");
    const { data } = useContext(Context);
    return (
        <Formik
            initialValues={{address: ''}}
            validationSchema={addresSchema}
            onSubmit={async(values, { setSubmitting }) => {
                const validate = validateAddress(values.address);
                if (validate.isValid) {
                    const text = 'sign and accept user'
                    const {signature, message} = await sign(text, data.userAccount, data.provider);
                    console.log('signature ::', signature, values);
                    console.log('message ::', message);
                }else {
                    console.log('error ::', validate.error);
                }
                await setSubmitting(false);
            }}
        >
            {({ errors, touched, isSubmitting}) =>(
                <Form>
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <Box component='h1'>Admin Managment</Box>
                        <Container maxWidth='lg' sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Box>
                                <Box component='label' htmlFor='addres'>This address can create collections and mint nfts</Box>
                                <br />
                                <Field id='address' name='address' type='text' placeholder='address' autoComplete='on' style={{width:'100%'}} />
                                {errors.address && touched.address ? (
                                    <div style={{color:'#dc3545'}}>{errors.address}</div>
                                ) : null}
                            </Box>
                        </Container>
                        <Box sx={{marginTop:'1rem'}}>
                            <Button type='submit'>Accept user</Button>
                        </Box>
                    </Box>
                    <LoaderModal
                        setIsClosed = {() => {}}
                        text={t('create_collection.creating_loader')}
                        isOpen={isSubmitting}
                        textColor='#fff'
                        spinnerColor='#fff'
                    />
                </Form>)}
        </Formik>
    )
}

export default AdminManagment