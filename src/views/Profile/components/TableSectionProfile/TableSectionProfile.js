import React from 'react'
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {Paper,TableRow,Box}from '@mui/material';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import {useTranslation} from 'react-i18next';
import Status from 'components/Status/Status';
import wmaticIcon from 'assets/logos/wmatic.png'

const TableSectionProfile = ({movements}) => {
    const {t} = useTranslation("translate");

    const formatDate = (date) => {
        console.log('date ::',date);
        const lang = localStorage.getItem('i18nextLng');
        const setLang = lang ? lang : 'en'
        const dateFormated = new Date(date*1000);
        console.log('dateFormated ::',dateFormated);
        const dateFormatedString = new Intl.DateTimeFormat(`${setLang}`, { month: 'short', day:'2-digit', year:'2-digit' }).format(dateFormated);
        const hourFormat = new Intl.DateTimeFormat(`${setLang}`, { hour: '2-digit', minute:'2-digit', hour12:false }).format(dateFormated);
        let formatText = dateFormatedString.toString();
      
        if(setLang == 'en'){
            formatText = dateFormatedString.replace(' ','/').replace(',','/')
        }else{
             formatText = dateFormatedString.replace(' ','/').replace(' ','/')
        }
      
        return formatText + ' ' + hourFormat + " H";
      }
      


    return (
        <Container  maxWidth="xl" sx={{display:'none'}}>
            <center>
            <TableContainer component={Paper} sx={{marginBottom:'25px',maxWidth:820}}>
                <Table size="small" aria-label="a dense table">
                     <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <b>{t("nft-screen.offers_modal_table.movements_title_column")}</b>
                            </TableCell>
                            <TableCell size="small" padding="none" align="center">
                                <b>{t("nft-screen.offers_modal_table.status_title_column")}</b>
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <BsFillGrid1X2Fill style={{fontSize:'12px',marginRight:'3px'}}/>
                                {t("nft-screen.offers_modal_table.nfts_title_column")}
                                </Box>


                            </TableCell>
                            <TableCell align="center">
                                <b>{t("nft-screen.offers_modal_table.crypto_title_column")}</b>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    '@media screen and (max-width: 600px)':{
                                        display:'none'
                                    }
                                }}
                            >
                                <b>{t("nft-screen.offers_modal_table.usd_title_column")}</b>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    '@media screen and (max-width: 600px)':{
                                        display:'none'
                                    }
                                }}
                            >
                                <b>{t("nft-screen.offers_modal_table.from_title_column")}</b>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    '@media screen and (max-width: 600px)':{
                                        display:'none'
                                    }
                                }}
                            >
                                <b>{t("nft-screen.offers_modal_table.to_title_column")}</b>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    '@media screen and (max-width: 600px)':{
                                        display:'none'
                                    }
                                }}
                            >
                                <b>{t("nft-screen.offers_modal_table.date_title_column")}</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                {movements?.map((movement, index) => (
                    index < 20 &&
                    <TableRow
                        key={index}
                        sx={{
                            width:'50px',
                            
                            '&:last-child td, &:last-child th': {
                                border: 0
                            },
                            ':hover':{
                                backgroundColor:'#f5f5f5'
                                }
                        }}

                        >
                            <TableCell align="center">
                                {
                                    movement.type == 1 && "Mint"
                                }
                                {
                                    movement.type == 2 && "Transfer"
                                }
                                {
                                    movement.type == 3 && "offer WMATIC"
                                }
                                {
                                    movement.type == 4 && "Offer NFT"
                                }
                                {
                                    movement.type == 5 && "Accept NFT"
                                }
                                {
                                    movement.type == 6 && "Accept WMATIC"
                                }
                            </TableCell>
                            <TableCell align="center">
                                <Status status={movement.status} timeLive={movement.timeLive} created_at={movement.created}/>
                            </TableCell>
                            <TableCell align="center">{movement.quantity}</TableCell>
                            {/* <TableCell align="center">{movement.token}</TableCell> */}
                            <TableCell align="center">
                                    {
                                      movement.amount ?
                                        movement.amount != 0 ?
                                        <>
                                        {movement.amount}
                                        <img src={wmaticIcon} style={{height:'13px', width:'13px',marginLeft:'5px'}} /> 
                                        </>
                                        :
                                        "---"
                                      :
                                      "---"
                                      }
                                   
                            </TableCell>

                            <TableCell align="center">---</TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    cursor:'pointer',
                                    '@media screen and (max-width: 600px)':{
                                        display:'none'
                                    }
                                }}

                            >
                                <Link
                                    style={{textDecoration:'none',color:'#ed2891'}}
                                    to={`/profile?address=${movement.from}`}
                                >
                                    {(movement.from).substring(0,5)+ '...' +(movement.from).substring(38,54)}
                                </Link>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    cursor:'pointer',
                                    '@media screen and (max-width: 600px)':{
                                        display:'none'
                                    }
                                }}

                            >
                                <Link
                                    style={{textDecoration:'none',color:'#ed2891'}}
                                    to={`/profile?address=${movement.to}`}
                                >
                                    {(movement.to).substring(0,5)+ '...' +(movement.to).substring(38,54)}
                                </Link>
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{
                                    cursor:'pointer',
                                    '@media screen and (max-width: 600px)':{
                                        display:'none'
                                    }
                                }}

                            >
                                {formatDate(movement.created)}
                            </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
            </center>
        </Container>
    );
}

TableSectionProfile.propTypes = {
    movements: PropTypes.array
}


export default TableSectionProfile;