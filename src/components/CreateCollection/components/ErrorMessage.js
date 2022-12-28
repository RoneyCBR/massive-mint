import React from 'react';
import Box from '@mui/material/Box'
import { BiError } from 'react-icons/bi';
import PropTypes from 'prop-types';
/**
 * It is a function that returns a text or error message.
 * @param {any} error The text to show or error message (object or string)
 * @param {string} textColor The color text should be
 *@returns A component that decides what error message to display
 */
const ShowError =({error,textColor,t}) => {


    const handleCustomMsg = (msg) =>{
        if(String(msg).toLowerCase() == 'execution reverted: address not found in the whitelist'){
            return t("message_errors.wallet_is_not_whitelisted");
        }
        return 'Error: '+msg;
    }

    return(
        <Box
            sx={{
                textAlign: 'center',
                marginTop: '2rem',
                color: textColor,
                fontWeight:600,
                fontSize: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily:'BentonSansBBVA-Medium,sans-serif',
                wordWrap: 'break-word',
                boxSizing:'border-box'
            }}
        >
            <span>
                <BiError size={50} />
            </span>
            <h2>
                {
                    error && error.response && error.response.data &&  error.response.data.message ?
                    <React.Fragment>
                        {handleCustomMsg(error.response.data.message)}
                    </React.Fragment> 
                    :
                    <React.Fragment>
                        {error && error.message && String(error.message+'').includes("status code 500") ? 
                        t("message_errors.try_again_later")
                        :
                        <React.Fragment>
                            {
                                error && error.message ?
                                error.message
                                :
                                error
                            }
                        </React.Fragment> 
                        }
                    </React.Fragment> 
                }
            </h2>
        </Box>

    )
}

ShowError.defaultProps = {
    error: '',
    textColor:'red'
}

ShowError.propTypes = {
    error: PropTypes.any,
    textColor: PropTypes.string,
    t: PropTypes.any
}

export default ShowError;