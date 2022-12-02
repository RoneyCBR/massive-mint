import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid , GridActionsCellItem  } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import LoaderModal from 'components/LoaderModal';
import ModalAdd from './components/ModalAdd';
import CategoriesEdit from './components/CategoriesEdit';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';


const Categories = () => {
    const [rows, setRows] = React.useState([]);
    const [openModal,setOpenModal] = React.useState(false);
    const [isEdit,setIsEdit] = React.useState(false);
    const [editObj,setEditObj] = React.useState({});
    const [load,setLoad] = React.useState(false);
    const [error,setError] = React.useState(false);
    const [msg,setMsg] = React.useState('');

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
        (row) => () => {
            try{
                setError(false);
                setMsg('');
                setLoad(true);
                let data = {
                    data:{
                        "name":row.category
                    }
                }
                axios.delete(`${process.env.REACT_APP_URL_API}/tag`,data)
                .then((success)=>{
                    getCategories();
                    setLoad(false);
                    console.log("success delete category::",success);
                }).catch((err)=>{
                    setError(false);
                    console.log(err);
                    setLoad(false);
                    setMsg(err);
                }) 
            }catch(err){
                setError(false);
                setMsg(err);
                console.log(err);
            }
        },
        [],
    );




    const columns = React.useMemo(
        () => [
            { field: 'category',headerName: 'Category',type: 'string',editable:false,width:400},
            {
                field: 'thumbnail',
                headerName: 'Thumbnail',
                width: 400,
                height:60,
                renderCell: (params) => (
                    <Box
                        tabIndex={params.hasFocus ? 0 : -1}
                        sx={{
                            width:'40px',
                            height:'35px',
                            margin:'0 auto',
                            backgroundImage:`url(${params.row.thumbnail})`,
                            backgroundSize: "cover",
                            objectFit:'100%'
                        }}
                    />
                )
            },
            {
                field: 'actions',
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
                    onClick={deleteUser(params.row)}
                />
                ],
            },
        ],
        [deleteUser],
    );

    const getCategories = async () => {
        setLoad(true)
        axios.get(`${process.env.REACT_APP_URL_API}/tag`)
        .then(res=>{
            let categories = []
            if(res && res.data && res.data.length > 0){
                res.data.forEach((item,index) => {
                    categories.push({id : index,category:item,thumbnail:'https://th.bing.com/th/id/OIP.5_F_oJDFwGhYBvXt-w2LLQHaE8?pid=ImgDet&rs=1'})
                })
            }
            setRows(categories)
            setLoad(false)
            setError(false)
        }).catch(err=>{
            setLoad(false)
            setError(true)
            setMsg('Error: '+err)
        })
    }

    React.useEffect(()=>{
        if(rows.length == 0) {
            getCategories();
        }
    },[])
   
    return (
        <React.Fragment>
            <Box sx={{ height: 520, width: '100%',position:'relative'}}>
                <DataGrid
                    sx={{color:'#fff'}}
                    rows={rows}
                    columns={columns}
                    rowHeight={38}
                    checkboxSelection={false}
                    disableSelectionOnClick={true}
                    components={{
                        //RowReorderIcon: MoreVertIcon,
                        Toolbar: null
                    }} 
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
                    Add category
                </Button>
                <ModalAdd 
                    open={openModal}
                    onClose={setOpenModal}
                >
                    <CategoriesEdit
                        rows={rows}
                        setRows={setRows}
                        isEdit={isEdit}
                        row={editObj}
                        openModal={setOpenModal}
                        setLoad={setLoad}
                        getCategories={getCategories}
                    />
                </ModalAdd>
            </Box>

            {
                error &&
                msg
            }
        </React.Fragment>
    );
}


export default Categories;