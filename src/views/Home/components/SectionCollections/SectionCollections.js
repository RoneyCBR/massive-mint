import React from 'react';
import { Button, Card, CardMedia, Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SectionCollections = ({ collection }) => {
    return (
        <Grid
            container
            spacing={2}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            sx={{ mt: 0 }}
        >
            <Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
                <Card sx={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <CardMedia
                        component="img"
                        src={collection.banner_url_collection}
                        alt="collection"
                        sx={{ borderRadius: '10px' }}
                    />
                    <Button LinkComponent={Link} to={`collection-buy?collection=${collection.project_key}`} type="button">Mexico Open Collection</Button>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
                <Card sx={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <CardMedia
                        component="img"
                        src="https://scontent-bos5-1.cdninstagram.com/v/t51.2885-15/312343676_2287063118136080_9222635851146718936_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=vICcTPK5PQMAX93Sa-x&_nc_ht=scontent-bos5-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCORxssAysp98jgt29V_tlIJLg9wGDWTMlJSt-6iF8iEw&oe=63683E7B"
                        alt="collection"
                        sx={{ borderRadius: '10px' }}
                    />
                    <Button LinkComponent={Link} to={`collection-buy?collection=${collection.project_key}`} type="button">Mexico Open Collection</Button>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
                <Card sx={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <CardMedia
                        component="img"
                        src="https://scontent-bos5-1.cdninstagram.com/v/t51.2885-15/312980940_510276837617229_2905211006753549238_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=_QZ5YBIQ8cYAX_LAcLF&_nc_ht=scontent-bos5-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBDlAQA8ioZ_5ljacx9H3YqBRoYTJRiCnHvOdISGk1PLg&oe=63685CB1"
                        alt="collection"
                        sx={{ borderRadius: '10px' }}
                    />
                    <Button LinkComponent={Link} to={`collection-buy?collection=${collection.project_key}`} type="button">Mexico Open Collection</Button>
                </Card>
            </Grid>
        </Grid>
    )
};

SectionCollections.propTypes = {
    collection: PropTypes.array
}

export default SectionCollections;
