import React from 'react'
import { Container, Grid } from '@mui/material';
import { CardHero, Information } from './components';
import { nft } from './utils/nft'
import PropTypes from 'prop-types';

const HomeHero = ({content}) => {
    return (
        <>
        <Container
            maxWidth="xl"
            sx={{
                marginTop:'2rem'
            }}
        >
            <Grid 
                container 
                spacing={{ xs: 1, md: 1, lg: 1 }} 
                columns={{sm:12, md:12, lg:12, xl:12}}
                sx={{
                    marginTop:'100px',
                    '@media screen and (max-width: 768px)': {
                        marginTop:'10px',
                    }
                }}
            >
                <CardHero content={content} />
                <Information content={content} />
            </Grid>
        </Container>
        </>
    );
}

HomeHero.defaultProps = {
    content: nft,
}

HomeHero.propTypes = {
    content: PropTypes.object,
}

export default HomeHero;
