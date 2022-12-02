import React, { Fragment, useContext, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { updatePriceSchema } from './schema';
import { TextField } from './styles';
import { StatusTx } from 'hooks/StatusTxContext';
import { Context } from 'hooks/WalletContext';
import LoaderCircle from 'components/LoaderCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';
import ErrorMessage from 'components/ErrorMessage';
import PropTypes from 'prop-types';

const UpdatePriceCollection = ({ projectKey }) => {
    const { statusTx, setStatusTx, sign } = useContext(StatusTx);
    const { data: wallet } = useContext(Context);
    const { t } = useTranslation("translate");
    const [succestx, setSuccessTx] = useState(null);
    const [msgTx, setMsgTx] = useState(null);
    const [errorTx, setErrorTx] = useState(null);
    const handleUpdatePrice = async () => {
        setStatusTx(true);
        try {
            const response = await sign('message', wallet.userAccount, wallet.provider);
            if (response) {
                setStatusTx(false);
                setMsgTx(response.message);
                setSuccessTx(true);
            }
        } catch (e) {
            console.error(e);
            setStatusTx(false);
            setErrorTx(e);
            console.log('submit error', errorTx);
        }
        console.log('submit', projectKey);
    };
    return (
        <Fragment>
            {succestx && (
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                    <CheckCircleIcon fontSize="large" sx={{ color: '#4aa521' }} />
                    <a 
                        href={`${process.env.REACT_APP_SCAN}/tx/${msgTx}`}
                        style={{ textDecoration:'none', color: '#000', height:'100%', textAlign: 'center' }} 
                        target="_blank" rel="noreferrer"
                    >
                        {t("update_price_collection_view.buy_success")}
                        <span style={{ marginLeft: '8px'}}>
                            {(msgTx).substring(0,5)}...{(msgTx).substring(37,42)}
                            {console.log(msgTx)}
                        </span><br/>
                    </a>
                </Box>
            )}
            {
                errorTx && errorTx != '' &&
                <Box sx={{color:'red'}}><ErrorMessage error={errorTx}  /></Box>
            }
            {statusTx && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <LoaderCircle spinnerColor="#000" textColor="#000" text={t("update_price_collection_view.loading")} />
                </Box>
            )}
            {!succestx && !statusTx && !succestx && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Formik
                        initialValues={{
                            price: '',
                            floorPrice: ''
                        }}
                        validationSchema={updatePriceSchema}
                        onSubmit={handleUpdatePrice}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="10px">
                                    <TextField name='price' type="number" placeholder={t("update_price_collection_view.new_price")} required />
                                    {errors.price && touched.price ? (
                                        <div style={{color:'#dc3545'}}>This field is required</div>
                                    ) : null}
                                    <Button
                                        //disabled={errors.price || touched.price || errors.floorPrice || touched.price}
                                        type="submit"
                                    >
                                        {t("update_price_collection_view.update_price")}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            )}
        </Fragment>
    )
};

UpdatePriceCollection.propTypes = {
    projectKey: PropTypes.string
};

export default UpdatePriceCollection;
