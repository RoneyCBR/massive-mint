import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import LoaderModal from 'components/LoaderModal';
import { Box } from '@mui/material';
//Falta agregar spinners
const AuctionSaleTab = () => {
    const [sales, setSales] = useState([])
    const [load, setLoad] = useState(true)
    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)

    const columns = [
        { field: 'wallet', headerName: 'Wallet dueña', width: 200 },
        { field: 'token_id', headerName: 'NFT', width: 200 },
        { field: 'movement', headerName: 'Movimiento', width: 200 },
        { field: 'amount_avax', headerName: 'Monto (AVAX)', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 }
    ]
    useEffect(()=>{
        if(sales.length == 0) {
            setLoad(true)
            axios.get( `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=30&page=0&order=created&key_name=SEARCH&key_val=news`)
            .then(res=>{
                console.log('nfts ::',res.data)
                let users = []
                res.data.forEach((nft,index) => {
                    let amount = (nft.last_bid) ? nft.last_bid.amount : 0
                    let status = "Pendiente"
                    if(amount == 0) {
                        status = "Concluido"
                    } else if (nft.auction && nft.auction.finish_date > 0 && nft.auction.finish_date < Math.floor(Date.now() / 1000)) {
                        status = "Concluido"
                    }
                    users.push({id : index, wallet : nft.owner,token_id : nft.token_id, movement : 'Subasta', amount_avax : amount+" "+"AVAX", status: status})
                })
                console.log('nts 2 ',users)
                setSales(users)
                setLoad(false)
            }).catch(err=>{
                setLoad(false)
                setError(true)
                setMsg('Error: '+err)
            })
        }
    },[])
    return (

        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    color:error?'red':'#000'
                }}
            >
                {msg}
            </Box>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                 sx={{color:'#fff'}}
                    rows={sales}
                    columns={columns}
                    pageSize={ 12}
                />
                <LoaderModal
                    text='Cargando...'
                    isOpen={load}
                    textColor='#fff'
                    spinnerColor='#fff'
                    setIsClosed={()=>{}}
                />
            </div>
        </React.Fragment>
    )
}


export default AuctionSaleTab