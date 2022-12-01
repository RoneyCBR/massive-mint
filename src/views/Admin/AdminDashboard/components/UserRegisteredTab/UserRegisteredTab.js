import React, { useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import LoaderModal from 'components/LoaderModal';
import { Box } from '@mui/material';

const UserRegisteredTab = () => {
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(true)
    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)

    const updateData = async (row) => {
        setLoad(true)
        setMsg('')
        setError(false)
        try {
            let role = 0
            if(row.value.includes("Curator")) {
                role = 5
            } else if (row.value.includes("Artist")) {
                role  = 2
            }
            const blockchain = process.env.REACT_APP_NETWORK_NAME;
            const domain = process.env.REACT_APP_DOMAIN
            let user = {
                'address': row.id,
                'role' : role,
                'domain': domain,
                'blockchain_name': blockchain,
                'update' : true
            }
            axios.post(`${process.env.REACT_APP_URL_API}/user`,user).then(() => {
                setLoad(false)
                setError(true)
            })
        } catch (newError) {
            setMsg('Error:ID '+JSON.stringify(newError))
        }

    }


    const formatDate = (date) => {
        const lang = localStorage.getItem('i18nextLng');
        const setLang = lang ? lang : 'en'
        const dateFormated = new Date(date);
        const dateFormatedString = new Intl.DateTimeFormat(`${setLang}`, { month: 'short', day:'2-digit', year:'2-digit' }).format(dateFormated);
        const hourFormat = new Intl.DateTimeFormat(`${setLang}`, { hour: '2-digit', minute:'2-digit'}).format(dateFormated);
        let formatText = '';
          if(setLang == 'en'){
              formatText = dateFormatedString.replace(' ','/').replace(',','/')
          }else{
              formatText = dateFormatedString.replace(' ','/').replace(' ','/')
          }
          return formatText   +' - ' + hourFormat;
    }

    const columns = React.useMemo(
        () => [
            { field: 'id',headerName:'ID',type: 'string',editable:false,width:250},
            { field: 'wallet', headerName: 'Wallet',editable:false, width: 250 },
            { field: 'username', headerName: 'Username',editable:false, width: 250 },
            { field: 'email', headerName: 'Email',editable:false, width: 250 },
            {
                field: 'typeuser',
                headerName: 'Type user',
                type: 'singleSelect',
                width: 120,
                editable: true,
                valueOptions: () => {
                    return ['Basic','Curator', 'Artist'];
                }           
            },
            { field: 'date_created', headerName: 'Date Created',editable:false, width: 200}
        ],
        [],
    );
    
    const getTypeOfUser = (role) => {
        if (role == 1) {
            return 'Basic'
        } else if( role == 2 ){
            return 'Artist'
        } else {
            return 'Curator'
        }

    }
 
    useEffect(()=>{
        if(users.length == 0) {
            setLoad(true)
            axios.get(process.env.REACT_APP_URL_API+`/user?domain=${process.env.REACT_APP_DOMAIN}&limit=${1000}&page=${0}&order=last_seen&key_name=REGISTERED&key_val=REGISTERED`)
            .then(res=>{
                //console.log('users ::',res.data)
                let users = []
                res.data.forEach(user => {
                    users.push({
                        id : user.id,
                        wallet : user.wallet,
                        email : user.email,
                        username : user.username,
                        typeuser : getTypeOfUser(user.role),
                        date_created:formatDate(user.first_seen)
                    })
                })
                //console.log('uusers 2 ',users)
                setUsers(users)
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
                    rows={users}
                    columns={columns}
                    pageSize={ 30}
                    checkboxSelection={false}
                    rowSelection={false}
                    onCellEditCommit={(row)=>{
                        updateData(row)
                    }}
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


export default UserRegisteredTab