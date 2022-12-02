import React, { useEffect } from 'react';
import { Box, Container, Avatar } from '@mui/material';
import { useLocation, useHistory } from  'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import ErrorMessage from 'components/ErrorMessage';
import { RiShareBoxFill } from 'react-icons/ri';
import { isEnglish } from 'utils/sanityLanguage';
import { useTranslation } from 'react-i18next';

const Notifications = () =>{
    const { t } =useTranslation("translate")
    const location = useLocation();
    const history= useHistory();
    const query = new URLSearchParams(location.search);
    const address = query.get("address")
    const url =  process.env.REACT_APP_URL_API+`/history?domain=${process.env.REACT_APP_DOMAIN}&wallet=${address}&blockchain=${process.env.REACT_APP_NETWORK_NAME}&page=0&limit=5`
    const { data:notifications, error, loading } = useFetch(url) 
    const determinateTypeNameUser = (type) => {
        if(type == "MINT") {
            return t("offers_history.minted_text")
        } else if (type == "TRANSFER") {
            return t("offers_history.transferred_text")
        } else if (type == "BID") {
            return t("offers_history.bid_placed_text")
        } else if (type == "ONAUCTION") {
            return t("offers_history.on_auction_text")
        }else if (type == "LISTED") {
            return t("offers_history.at_sale_text")
        }
    }
    const determinateIdentifier = (type) => {
        if(type == "MINT") {
            return  t("offers_history.by_text")
        } else if (type == "TRANSFER") {
            return t("offers_history.to_text")
        } else if (type == "BID") {
            return t("offers_history.by_text")
        } else if (type == "ONAUCTION") {
            return t("offers_history.by_text")
        }else if (type == "LISTED") {
            return t("offers_history.by_text")
        }
    }
    const dataFormated = (data)=> {
        /* data format days, month, years */
        const format = new Intl.DateTimeFormat(isEnglish ? 'es-ES' : 'en-US' , {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        const date = format.format(new Date(data * 1000));
        return date;
    }
    useEffect(()=>{
        if(!address){
            window.location.href = '/'
        }
    },[])
    return (
        <Container maxWidth='md'>
            <Box component='h1' mt={3} sx={{textAlign:'center'}}>
                Notifications
            </Box>
            {loading && <div>loading notifications...</div>}
            {error && <ErrorMessage error={error.message} />}
            {notifications &&
            <>
            {console.log(notifications)}
            {notifications.map((notification, index) => (
            <Box display='flex' justifyContent='space-between' alignItems='center' key={index} mt={3} sx={{gap:'1rem'}}>
                <Box display='flex' alignItems='center' sx={{gap:'1rem'}}>
                    <Avatar />
                    <Box display='flex' alignItems='flex-start' flexDirection='column'>
                        <Box>{ determinateTypeNameUser(notification.type_movement) }  {' ' + determinateIdentifier(notification.type_movement)}</Box>
                        <Box sx={{cursor:'pointer'}} onClick={()=>history.push(`/profile?address=${notification.from}`)}>{(notification.from).substring(0,5)+ '...' +(notification.from).substring(38,54)}</Box>
                    </Box>
                    {/* <Box display='flex' alignItems='center'>
                        <Box>
                            <Box component='h2' fontWeight='fontWeightBold'></Box>
                        </Box>
                        <Box>
                            <Box component='h2' fontWeight='fontWeightBold'></Box>
                        </Box>
                    </Box> */}
                </Box>
                <Box component='span' display='flex' flexDirection='column' alignItems='flex-end'>
                    <RiShareBoxFill style={{cursor:'pointer'}} onClick={()=>history.push(`/nft?address=${notification.contract_address}&token_id=${notification.nft_id}&domain=${process.env.REACT_APP_DOMAIN}`)} />
                    <Box component='span' ml={1}>{dataFormated(notification.created)}</Box>
                </Box>
            </Box>
            ))}
            </>}
        </Container>
    )  

}

export default Notifications;