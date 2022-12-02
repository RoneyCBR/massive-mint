import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid ,GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import ModalAdd from './components/ModalAdd';
import SectionEdit from './components/SectionEdit';
import EditIcon from '@mui/icons-material/Edit';
import LoaderModal from 'components/LoaderModal';
import axios from 'axios';


const Sections = () => {

    const [rows, setRows] = React.useState([]);
    const [openModal,setOpenModal] = React.useState(false);
    const [isEdit,setIsEdit] = React.useState(false);
    const [editObj,setEditObj] = React.useState({});
    const [load,setLoad] = React.useState(false);

    useEffect(()=>{
        if(rows.length == 0) {
            setLoad(true)
            axios.get(process.env.REACT_APP_URL_API+`/section?domain=${process.env.REACT_APP_DOMAIN}&type=list`)
            .then(res=>{
                let curators = []
                console.log('res data ::',res.data)
                setRows(res.data)
                console.log('Rows ::',rows)
                console.log('Curators ::',curators)
                setLoad(false)
            }).catch(err=>{
                setLoad(false)
                alert('Error: '+err)
            })
        }
    },[])

    const updateData = React.useCallback(
        (row) => async() => {
            console.log("debug row::",row);
            setIsEdit(true);
            setEditObj(row.row);
            setOpenModal(true);

        },
        [],
    );

    const deleteUser = React.useCallback(
        (id) => () => {
            let old = null;
        setTimeout(() => {
            setRows((prevRows) =>{
                 old = prevRows.find(x => x.id === id)
                return prevRows
            } );
            if(old !== null) {
                axios.delete(process.env.REACT_APP_URL_API+`/section?domain=${process.env.REACT_APP_DOMAIN}&name=${old.name}`).then(() => {
                    setRows((prevRows) =>{
                       return prevRows.filter((row) => row.id !== id)
                   } );
                })
            }
        });
        },
        [],
    );


    const columns = React.useMemo(
        () => [
            { field: 'name',headerName:'Name',type: 'string',editable:true,width:400},
            { field: 'filter',headerName:'Filter',type: 'string',editable:true,width:400},
            {
                field: 'options',
                headerName: 'Options',
                type: 'actions',
                width: 400,
                getActions: (params,index) => [
                <GridActionsCellItem
                    key={index}
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={updateData(params)}
                />,
                <GridActionsCellItem
                    key={index}
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={deleteUser(params.id)}
                />
                ],
            },
        ],
        [deleteUser],
    );

    return (
        <React.Fragment>
            <Box sx={{ height: 320, width: '100%',position:'relative'}} >
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
                    onClick={()=>{setIsEdit(false); setOpenModal(true)}}
                >
                    Add Section
                </Button>
                <ModalAdd 
                    open={openModal}
                    onClose={setOpenModal}
                >
                    <SectionEdit
                        rows={rows}
                        setRows={setRows}
                        isEdit={isEdit}
                        row={editObj}
                        openModal={setOpenModal}
                        setLoad={setLoad}
                    />
                </ModalAdd>
            </Box>
        </React.Fragment>
    );
};



export default Sections;