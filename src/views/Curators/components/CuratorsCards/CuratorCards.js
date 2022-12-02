import React from 'react';
import PropTypes from 'prop-types';
import { Box,Typography, Container, Grid } from '@mui/material';
import CuratorCard from './components/CuratorCard';
import { useTranslation } from 'react-i18next';

const CuratorCards = ({content, limit}) => {
    const {t} = useTranslation("translate");

    const [array,setArray] =React.useState(content && content.length > 0 ? content.filter((cont)=> cont && cont.role === 5 && cont):[])

    React.useEffect(() => {
        setArray(content && content.length > 0 ? content.filter((cont)=> cont.role === 5 && cont):[])
    }, [content])

    if(content == null || (content && content.length === 0) || array.length === 0) {
        return (
            <Box
                sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center',mt:'20px'}}
            >
                <Typography variant='h4' sx={{color:'#A658D8',fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>
                    {t("explore.not_found")}
                </Typography>
            </Box>
        )
    }

    return (
        <Container maxWidth='xl' sx={{marginTop:'1.5rem'}}>
            <Grid 
                container 
                columns={{xs:12,sm:12, md:12, lg:12, xl:12}}
                rowSpacing={4} 
                spacing={{ xs: 2, md: 3, lg: 3, xl: 3 }}
               
            >
                {content.slice(0, limit).map((item, index)=>{
                    if(item && item.role == 5){
                        return (
                            <Grid 
                                key={index} 
                                item 
                                xs={12}
                                sm={6} 
                                md={4} 
                                lg={3} 
                                xl={3}
                                sx={{
                                    width:'100%'
                                }}
                            >
                                <CuratorCard item={item} width={"100%"} index={index} />
                            </Grid>
                        )
                    }
                })
                }
            </Grid>
        </Container>
    );
};

CuratorCards.defaultProps = {
    content: [],
    limit: 16,
}

CuratorCards.propTypes = {
    content: PropTypes.array,
    limit: PropTypes.number
};

export default CuratorCards;