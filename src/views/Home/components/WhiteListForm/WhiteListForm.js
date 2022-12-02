import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { initialValues, schemaLayout } from './schema';
import { Alert, Box, Checkbox, CircularProgress } from '@mui/material';
import ButtonStyled from 'components/ButtonStyled';
import { styles } from './styles';
import { DrawerMobileContext } from 'hooks/DrawerMobileContext';
import { subscribe } from 'services/MintList/subscribe';
import { StatusTx } from 'hooks/StatusTxContext';
import EastIcon from '@mui/icons-material/East';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import { saveEmail } from 'services/User/getIfHaveTxt';

const WhiteListForm = ({ wallet, sanity }) => {
    const { setOpenWallet } = useContext(DrawerMobileContext);
    const { statusTx, setStatusTx } = useContext(StatusTx);
    const [errorTx, setErrorTx] = useState(null);
    const [successTx, setSuccessTx] = useState(null);
    const [checkTerms, setCheckTerms] = useState(false);
    const [msgTx, setMsgTx] = useState(false);
    const handleSubmit = async(values) => {
        setStatusTx(true);
        setMsgTx(true);
        try {
            subscribe(wallet.provider, wallet.userAccount)
            .then((response) => {
                if (response && response.type == 0) {
                    setStatusTx(false);
                    setErrorTx(null);
                    setSuccessTx(null);
                    setMsgTx(false);
                    console.log('response type ::', response);
                } else {
                    saveEmail(values.email, wallet.userAccount,response.transaction).then(() => {
                        setSuccessTx(response);
                        console.log('response ::', response);
                        setStatusTx(false);
                    }).catch((error) => {
                        setMsgTx(false)
                        setStatusTx(false);
                        setErrorTx("Please contact support with the administrator");
                        console.error(error);
                    })
                }
            })
            .catch((error) => {
                setMsgTx(false)
                setStatusTx(false);
                setErrorTx("Please contact support with the administrator");
                console.error(error);
            })
        } catch (error) {
            console.error(error);
            setStatusTx(false);
            setSuccessTx(null);
            msgTx(false)
            setErrorTx("Please contact support with the administrator");
        }
        console.log('success ::', successTx, errorTx);
    };
    const shortAddressContract = `${process.env.REACT_APP_MINT_LIST_ADDRESS.substring(0,5)}...${process.env.REACT_APP_MINT_LIST_ADDRESS.substring(37,42)}`
    return(
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={schemaLayout}
                onSubmit={async(values) => {
                    handleSubmit(values)
                }}
            >
                {({ values }) => (
                    <Form name="whitelist">
                        {!statusTx && !successTx && errorTx && (
                            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ mt: 2 }}>
                                <Alert severity="error">
                                    <Box>
                                        {errorTx}
                                    </Box>
                                </Alert>
                            </Box>
                        )}
                        {msgTx && (
                            <>
                                <Alert
                                    icon={false}
                                    severity="info"
                                    sx={{
                                        '.MuiAlert-message': {
                                            width: '100%'
                                        }
                                    }}
                                >
                                    <Box display="flex" alignItems="center" justifyContent="center" gap="10px">
                                        <Box
                                            component="a"
                                            href={`${process.env.REACT_APP_SCAN}/address/${wallet.userAccount}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            sx={{ textDecoration:'none', color: '#000' }} 
                                        >
                                            <b>From</b>: {wallet.shortWallet}
                                        </Box>
                                        <EastIcon />
                                        <Box
                                            component="a"
                                            href={`${process.env.REACT_APP_SCAN}/address/${process.env.REACT_APP_MINT_LIST_ADDRESS}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            sx={{ textDecoration:'none', color: '#000' }} 
                                        >
                                            <b>To</b>: {shortAddressContract}
                                        </Box>
                                    </Box>
                                </Alert>
                                {statusTx && (
                                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ mt: 2 }}>
                                        <CircularProgress sx={{ color: '#4aa521' }} />
                                        <Box>
                                            Subscribing
                                        </Box>
                                    </Box>
                                )}
                                {!statusTx && successTx && !errorTx && successTx.transaction && (
                                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" sx={{ mt: 2 }}>
                                        <CheckCircleIcon fontSize="large" sx={{ color: '#4aa521' }} />
                                        <a 
                                            href={`${process.env.REACT_APP_SCAN}/tx/${successTx.transaction}`}
                                            style={{ textDecoration:'none', color: '#fff', height:'100%', textAlign: 'center' }} 
                                            target="_blank" rel="noreferrer"
                                        >
                                            You can view the status in the block explorer:
                                            <span style={{ marginLeft: '8px' }}>
                                                {(successTx.transaction).substring(0,5)}...{(successTx.transaction).substring(37,42)}
                                            </span>
                                        </a>
                                    </Box>
                                )}
                            </>
                        )}
                        {!statusTx && !successTx && !errorTx && (
                            <>
                                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="10px" 
                                    sx={{
                                        'input': {
                                            '&::placeholder': {
                                              textOverflow: 'ellipsis !important',
                                              color: '#43B02A'
                                            }
                                        }
                                    }}
                                >
                                    <Field type='email' name="email" placeholder="Email" required style={styles} />
                                </Box>
                                <Box display="flex" justifyContent="center" alignItems="center" gap="5px" sx={{ mt: 2, mb: 2 }}>
                                    <Checkbox checked={checkTerms} onChange={() => setCheckTerms(!checkTerms)} required />
                                    {sanity && (<label>{sanity.disclamerForm}</label>)}
                                </Box>
                                {wallet && wallet.userAccount && !statusTx && (
                                    <ButtonStyled
                                        isDisabled={!(checkTerms && values.email)}
                                        type="submit"
                                        text="SUBSCRIBE ME TO MINTLIST"
                                        width="100%"
                                    />
                                )}
                            </>
                        )}
                    </Form>
                )}
            </Formik>
            {wallet && !wallet.userAccount && (<ButtonStyled type="button" onClick={()=>setOpenWallet(true)} text="Connect Wallet" width="100%" />)}
        </>
    );
};

WhiteListForm.propTypes = {
    wallet: PropTypes.object,
    sanity: PropTypes.object
}

export default WhiteListForm;
