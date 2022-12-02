import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import LoaderModal from 'components/LoaderModal';
import { Box } from '@mui/material';


const NFTUserRegisteredTab = () => {
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(true)
    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID' ,width: 250 },
        { field: 'token_id', headerName: 'TokenID' ,width: 250 },
        { field: 'wallet', headerName: 'Wallet', width: 250 },
        { field: 'username', headerName: 'Username', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 }
    ]
    useEffect(()=>{
        if(users.length == 0) {
            setLoad(true)
            let nft = `${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=50&page=0&order=created&key_name=SEARCH&key_val=news`
            axios.get(nft).then(res => {
                console.log('res ::',res);
                axios.get(process.env.REACT_APP_URL_API+`/user?domain=${process.env.REACT_APP_DOMAIN}&limit=${1000}&page=${0}&search=ALL`)
                .then(resUser=>{
                    console.log('users ::',res.data)
                    let users = []
                    res.data.forEach((nft,index) => {
                        let amount = (nft.last_bid) ? nft.last_bid.amount : 0
                        let status = "Pendiente"
                        if(amount == 0) {
                            status = "Concluido"
                        } else if (nft.auction && nft.auction.finish_date > 0 && nft.auction.finish_date < Math.floor(Date.now() / 1000)) {
                            status = "Concluido"
                        }
                        let username = ""
                        let email = ""
                        let user = resUser.data.find(user => user.wallet.toUpperCase() == nft.owner.toUpperCase())
                        if(user) {
                            email = user.email
                            username = user.username
                        }
                        users.push({id : index, 
                            wallet : nft.owner,
                            token_id : nft.token_id, 
                            movement : 'Subasta', 
                            amount_avax : amount+" "+"AVAX", 
                            status: status,
                            email : email,
                            username : username
                        })
                    })
/*                     res.data.forEach((user,index) => {
                        users.push({id : index, wallet : user.wallet,email : user.email, username : user.username})
                    }) */
                    console.log('uusers 2 ',users)
                    setUsers(users)
                    setLoad(false)
                }).catch(err=>{
                    setLoad(false)
                    setError(true)
                    setMsg('Error: '+err)
                })
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
                    rows={users}
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


export default NFTUserRegisteredTab