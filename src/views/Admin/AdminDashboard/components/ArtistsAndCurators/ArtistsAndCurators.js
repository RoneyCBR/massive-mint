import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import LoaderModal from 'components/LoaderModal';
//import {artist} from './utils/artist';
import MultiSelect from './components/MultiSelect';
import axios from 'axios';

const ArtistsAndCurators = () => {

    const [rows, setRows] = React.useState([]);
    const [load,setLoad] = React.useState(false);
    const [arraySave,setArraySave] = React.useState([]);

    const updateData = ()=>{
            if(rows && rows.length > 0 && rows.filter(item => item.isEdit === true).length > 0){
                setLoad(true);
                let temp = rows.filter(item => item.isEdit === true);
                console.log("debug row::", temp);
                for (let index = 0; index < temp.length; index++) {
                    let artist = temp[index];
                    let newCurators = []
                    artist.curators.forEach(c => {
                        newCurators.push(c.wallet)
                    })
                    artist.artist = artist.wallet
                    artist.curators = newCurators;
                    axios.post(process.env.REACT_APP_URL_API+`/artist_curator`, artist).then(() => {})
                }
                let timeOut = setTimeout(() => {
                    setLoad(false);
                    clearTimeout(timeOut);
                    return null;
                },1000);
            }
    }

    const deleteUser = React.useCallback(
        (id) => () => {
        setTimeout(() => {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        },1000);
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: 'wallet', headerName: 'Wallet',editable:false, width: 150 },
            { field: 'username', headerName: 'Username',editable:false, width: 150 },
            { field: 'email', headerName: 'Email',editable:false, width: 150 },
            {
                field: 'curators',
                headerName: 'Curators',
                type: 'string',
                editable: false,
                renderCell:  (params,index) => (
                    <MultiSelect
                        key={index}
                        params={params}
                        rows={rows}
                        set={setRows}
                        arraySave={arraySave}
                        setArraySave={setArraySave}
                    />
                ),
                width: 500,
                style: {
                    overflow: 'scroll'
                } 
            },
        ],
        [deleteUser,rows],
    );


    useEffect(()=>{
        if(rows.length == 0) {
            setLoad(true)
            axios.get(process.env.REACT_APP_URL_API+`/user?domain=${process.env.REACT_APP_DOMAIN}&limit=${1000}&page=${0}&search=ALL`)
            .then(res=>{
                let curators = []
                let users = []
                console.log('res data ::',res.data)
                res.data.forEach(user => {
                    if(user.role == 2) {
                        users.push({id : user.id, wallet : user.wallet,email : user.email, username : user.username, curators : []})
                    } else if (user.role == 5) {
                        curators.push({id : user.id, wallet : user.wallet,email : user.email, name : user.username, curators : []})
                    }
                })
                axios.get(process.env.REACT_APP_URL_API+`/artist_curator`).then((res) => {
                    let curatosOfArtist = res.data;
                    console.log('res ::', curatosOfArtist)
                    for (let index = 0; index < users.length; index++) {
                        let user = users[index];
                        let newCurators = []
                        for (let j = 0; j < curatosOfArtist.length; j++) {
                            let curator = curatosOfArtist[j];
                            if (curator.artist.toUpperCase() == user.wallet.toUpperCase()) {
                                let newcurator = curators.find(x => x.wallet.toUpperCase() ==curator.curator.toUpperCase())
                                if (newcurator) {
                                    newCurators.push(newcurator)
                                }
                            }
                        }
                        users[index].curators = newCurators
                    }
                    setRows(users)
                    console.log('Rows ::',rows)
                    console.log('Curators ::',curators)
                    setLoad(false)
                })
            }).catch(err=>{
                setLoad(false)
                //setError(true)
                alert('Error: '+err)
            })
        }
    },[])



    return (
        <React.Fragment>
            <Box sx={{ height: 320, width: '100%',position:'relative'}}>
                <DataGrid
                    sx={{color:'#fff'}}
                    rows={rows}
                    columns={columns}
                    rowHeight={38}
                    checkboxSelection={false}
                    disableSelectionOnClick={true}
                    disableColumnSelector={true}
                    disableRowSelector={true}
                />
                <LoaderModal
                    text='Loading...'
                    isOpen={load}
                    textColor='#fff'
                    spinnerColor='#fff'
                    setIsClosed={()=>{}}
                />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt:'15px'
                }}
            >
                <Button 
                   onClick={updateData}
                >
                    Save
                </Button>
            </Box>
        </React.Fragment>
    );
}



export default ArtistsAndCurators;