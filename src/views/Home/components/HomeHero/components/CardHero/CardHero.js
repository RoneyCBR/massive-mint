import React from 'react'
import { Card, CardMedia, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const CardHero = ({content}) => {
    return (
        <Grid item sm={12} md={6} lg={6} xl={6}>
            <Link to='/explore'>
                <Card
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        maxHeight: '60vh',
                        maxWidth: '60vh',
                        margin: 'auto',
                        boxShadow: 'none',
                    }}
                >
                    <CardMedia
                        component="img"
                        src={content.metadata.is_video ? content.thumb_gif : content.thumb_url_large}
                        alt="artcrypted"
                        autoPlay
                        loop
                        muted
                        sx={{
                            borderRadius: '8px',
                            width: '25rem',
                            height: '25rem',
                            '@media screen and (max-width: 768px)': {
                                width: '100%',
                            }
                        }}
                    />
                </Card>
            </Link>
        </Grid>
  )
}

CardHero.propTypes = {
    content: PropTypes.object,
}

export default CardHero