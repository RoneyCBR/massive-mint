import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ShowError =() => {
    const { t } = useTranslation("translate");
    return(
        <Box
            sx={{
                textAlign: 'center',
                marginTop: '2rem',
                color: '#ED2891'
            }}
        >
            <h2>{t("loading_error_component.could_not_connect_to_the_api")}</h2>
        </Box>
    )
}

export default ShowError;