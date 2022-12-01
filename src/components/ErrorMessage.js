import React from 'react';
import Box from '@mui/material/Box'
import { BiError } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'; 

const ShowError =({error,textColor}) => {
    const { t } = useTranslation("translate"); 
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
                fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
            }}
        >
            <span>
                <BiError size={50} />
            </span>
            <h2>
                {
                    error && error.response && error.response.data && error.response.data.message ?
                    <React.Fragment>
                        {
                            'Error: ' + error.response.data.message
                        }
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
}

export default ShowError;