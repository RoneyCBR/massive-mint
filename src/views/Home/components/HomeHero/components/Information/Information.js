import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { OwnerInformation, OwnerPrice } from './components'
//import ButtonStyled from 'components/ButtonStyled'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const Information = ({content}) => {
    const { t } = useTranslation("translate");
    console.log('content home', content)
    return (
        <Grid item sm={12} md={6} lg={6} xl={6} sx={{width:'100%'}}>
            <Box
                display='flex'
                flexDirection='column'
            >
                <Box 
                    component='h2'
                    sx={{
                        fontSize: '66px',
                        letterSpacing: '-0.02em',
                        msWordBreak: 'break-word',
                        marginTop: '0px',
                        color: '#000',
                        marginBottom: '1rem',
                        '@media screen and (max-width: 768px)': {
                            fontSize: '46px',
                        }
                    }}
                >
                    {content.metadata.json_data.name}
                </Box>
                <OwnerInformation content={content} />
                <OwnerPrice content={content} />
                {/* {content.on_auction || content.on_sale &&
                    <OwnerPrice content={content} />
                } */}
            </Box>
            <Box 
                sx={{
                    marginTop:'1rem'
                }}
            >
                {/* <ButtonStyled text='View NFT' width='50%'  /> */}
                <Button 
                    color='inherit' 
                    component={Link} 
                    to={`/nft?address=${content.project_key}&token_id=${content.token_id}&domain=${process.env.REACT_APP_DOMAIN}`}
                    sx={{
                        width:'30%', 
                        fontSize:'20px',
                        '@media screen and (max-width: 768px)': {
                            width:'100%',
                        }
                    }}
                >
                    {t('home.view_nft')}
                </Button>
            </Box>
        </Grid>
  )
}

Information.propTypes = {
    content: PropTypes.object,
}

export default Information