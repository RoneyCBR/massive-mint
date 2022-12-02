import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types'

const TableOffersModalBid = ({
  account, 
  setIsOpenModalOfferCrypto, 
  setOpenModalBid,
  offers,
  setOffersSelected,
}) => {
  console.log(setIsOpenModalOfferCrypto)
  console.log(setOpenModalBid)
  console.log(setOffersSelected)
  console.log(account)
  //const handleOpenModal = (item)=>{
  //  console.log('item is::',item)
  //  setOffersSelected({...item,item})
  //  setOpenModalBid(false)
  //  setIsOpenModalOfferCrypto(true)
  //}
  useEffect(()=>{
    console.log('tableOffersBid::', offers)
  },[])
  if(offers.length === 0){
    return (
      <TableContainer component={Paper} sx={{ maxHeight: 270 }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">MATIC</TableCell>
              <TableCell align="center">USD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">No hay ofertas</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return (
        <TableContainer component={Paper} sx={{ maxHeight: 325 }}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">WMATICS</TableCell>
                <TableCell align="center">USD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.slice(0,5).map((offer, index)=>(
              <TableRow
                key={index} 
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <TableCell  align="center">
                  <Link
                    style={{textDecoration:'none',color:'#ed2891'}} 
                  >
                    {(offer.from).substring(0,5)}...{(offer.from).substring(37,42)}
                  </Link>
                </TableCell>
                <TableCell 
                   
                  align="center"
                >
                  {(offer.amount).substring(0,7)}
                </TableCell>
                <TableCell 
                   
                  align="center"
                >
                  ${((offer.usd_price)*(offer.amount)).toFixed(5)}
                </TableCell>
              </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

TableOffersModalBid.propTypes = {
  account: Proptypes.string,
  setIsOpenModalOfferCrypto: Proptypes.func,
  setOpenModalBid: Proptypes.func,
  offers: Proptypes.array,
  setOffersSelected: Proptypes.func,
}

export default TableOffersModalBid;