import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from '@mui/utils';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import {useTranslation} from 'react-i18next';
import Status from 'components/Status/Status';
//import { Link } from 'react-router-dom';
import avalancheIcon from 'assets/logos/avalanche_logo.svg';




function EnhancedTableHead(props) {

    const {t} = useTranslation("translate");
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
            
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
                        <TableSortLabel
                        active={orderBy === "amount"}
                        direction={orderBy === "amount" ? order : 'asc'}
                        onClick={createSortHandler("amount")}
                        >
                        <b>{t("nft-screen.offers_modal_table.crypto_title_column")}</b>
                        {orderBy === "amount" ? (
                            <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                        </TableSortLabel>
                </TableCell>
                <TableCell align="center"
                    sx={{
                        '@media screen and (max-width: 600px)':{
                            display:'none'
                        }
                    }}
                >
                    <b>{t("nft-screen.offers_modal_table.usd_title_column")}</b>
                </TableCell>
                <TableCell align="center" sx={{
                        '@media screen and (max-width: 600px)':{
                            display:'none'
                        }
                    }}
                >
                    <b>{t("nft-screen.offers_modal_table.from_title_column")}</b>
                </TableCell>
                <TableCell align="center"
                    sx={{
                        '@media screen and (max-width: 600px)':{
                            display:'none'
                        }
                    }}
                >
                    <b>{t("nft-screen.offers_modal_table.to_title_column")}</b>
                </TableCell>
                <TableCell align="center"
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
    );
}

EnhancedTableHead.propTypes = {

  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired

};


const TableFilterCrypto = ({movements}) => {
    const {t} = useTranslation("translate");
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('amount');
    console.log("activity",movements);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

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

    const descendingComparator = (a, b, orderBy) => {
        if (parseFloat(b[orderBy]) < parseFloat(a[orderBy])) {
          return -1;
        }
        if (parseFloat(b[orderBy]) > parseFloat(a[orderBy])) {
          return 1;
        }
        return 0;
      }
      
      const getComparator = (order, orderBy) => {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
      
      
      const stableSort = (array, comparator) =>{
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          console.log("compared",a[0])
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      
  
    return (
        <>
            <Table size="small" aria-labelledby="tableTitle">
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                
                <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                {
                    stableSort(movements, getComparator(order, orderBy)).map((movement, index) => {

                        return (
                            
                            <TableRow key={index}
                                sx={{
                                    cursor:'pointer',
                                    '&:last-child td, &:last-child th': { border: 0 } 
                                }}
                                onClick={() => {window.open("https://polygonscan.com/tx/"+movement.hash, '_blank');}}
                            >
                                <TableCell align="center">
                                    {
                                        movement.type == 1 && t("profile.activities_table.type_text.mint_text")
                                    }
                                    {
                                        movement.type == 2 && t("profile.activities_table.type_text.transfer_text")
                                    }
                                    {
                                        movement.type == 3 && t("profile.activities_table.type_text.offers_wmatic_text")
                                    }
                                    {
                                        movement.type == 4 && t("profile.activities_table.type_text.offers_nft_text")
                                    }
                                    {
                                        movement.type == 5 && t("profile.activities_table.type_text.accept_nft_text")
                                    }
                                    {
                                        movement.type == 6 && t("profile.activities_table.type_text.accept_wmatic_text")
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    <Status status={movement.status} timeLive={movement.timeLive} created_at={movement.created}/>
                                </TableCell>
                                <TableCell align="center">
                                    {movement.quantity}
                                </TableCell>
                                <TableCell align="center">
                                    {
                                        movement.amount ?
                                            movement.amount != 0 ?
                                            <>
                                            {movement.amount}
                                            <img src={avalancheIcon} style={{height:'13px', width:'13px',marginLeft:'5px'}} /> 
                                            </>
                                            :
                                            "---"
                                        :
                                        "---"
                                    }    
                                </TableCell>
                                <TableCell align="center"
                                     sx={{
                                        '@media screen and (max-width: 600px)':{
                                            display:'none'
                                        }
                                    }}
                                >
                                   {
                                    movement.amount && movement.usd_price && movement.amount.length > 0 ? 
                                    ((movement.usd_price)*(movement.amount)+'').substring(0,8)
                                    :
                                    '---'
                                    }
                                </TableCell>
                                <TableCell  align="center"
                                    sx={{
                                        color:'#ed2891',
                                        '@media screen and (max-width: 600px)':{
                                            display:'none'
                                        }
                                    }}
                                >
                                    {(movement.from).substring(0,5)+ '...' +(movement.from).substring(38,54)}
                                </TableCell>

                                <TableCell align="center"
                                    sx={{
                                        color:'#ed2891',
                                        '@media screen and (max-width: 600px)':{
                                            display:'none'
                                        }
                                    }}
                                >
                                    {(movement.to).substring(0,5)+ '...' +(movement.to).substring(38,54)}
                                </TableCell>
                                <TableCell align="center"
                                    sx={{
                                      
                                        '@media screen and (max-width: 600px)':{
                                            display:'none'
                                        }
                                    }}
                                >
                                    {formatDate(movement.created)}
                                </TableCell>
                            </TableRow>

                        );
                    })
                }   
                </TableBody>
            </Table>

        </>
    );
}

TableFilterCrypto.propTypes = {
  movements: PropTypes.array
};

export default TableFilterCrypto;
