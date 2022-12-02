import React from 'react';
import {Button, FormGroup, FormLabel, Input} from '@mui/material';
import List from '../List';
import PropTypes from 'prop-types';
import axios from 'axios';

const SectionEdit = ({rows,setRows,isEdit,row,openModal,setLoad}) => {

    const [sectionForm,setSectionForm] = React.useState({
        id: '',
        name:'',
        filter:'',
    });

    React.useEffect(() => {
        if(isEdit){
            setSectionForm(row);
        }
    },[isEdit]);

    const resetForm = () => {
        setSectionForm({
            id: '',
            name:'',
            filter:''
        });
    }

    const addSection = async () => {
        setLoad(true);
        console.log('sectionForm ::', sectionForm)
        let section = {
            name : sectionForm.name,
            filter : sectionForm.filter,
            domain : process.env.REACT_APP_DOMAIN
        }
        axios.post(process.env.REACT_APP_URL_API+`/section`, section)
        .then(res=>{
            console.log('save section',res)
            let timeOut = setTimeout(() => {
                setRows([...rows,sectionForm]);
                resetForm();
                setLoad(false);
                clearTimeout(timeOut);
                return null;
            },3000);
        }).catch(err=>{
            setLoad(false)
            //setError(true)
            alert('Error: '+err)
        })

    }

    const updateSection = async () => {
        setLoad(true);
        let timeOut = setTimeout(() => {
            setRows(rows.map(item => item.id === sectionForm.id ? sectionForm : item));  
            resetForm();
            openModal(false);
            setLoad(false);
            clearTimeout(timeOut);
            return null;
        },3000);    
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(isEdit){
            updateSection();
        }else{
            addSection();
        }
    }

    const handleChangeName = (e) => {
        if(isEdit){
            setSectionForm({...sectionForm,name:e.target.value});
        }else{
            setSectionForm({...sectionForm,id:e.target.value,name:e.target.value})
        }      
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
                padding: '20px',
                gap: '20px'
            }}
        >
            <FormGroup
                sx={{
                    width: '90%',
                }}
            >
                <FormLabel>Name</FormLabel>
                <Input 
                    name="name" 
                    type="text"
                    placeholder="Nombre"
                    onChange={(e) =>handleChangeName(e)}
                    value={sectionForm.name}
                />
            </FormGroup>
            <FormGroup
                sx={{
                    width: '90%'
                }}
            >
                <FormLabel>Filter</FormLabel>
                <List 
                    name="filer" 
                    options={sectionForm}
                    setOptions={setSectionForm}
                    val={sectionForm.filter}
                />
            </FormGroup>
            <FormGroup>
                <Button 
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    disabled={sectionForm.name === '' || sectionForm.filter === ''}
                    sx={{
                        "&.Mui-disabled":{
                            background: '#fff',
                            border:'1px solid #ccc',
                        }
                    }}
                >
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

SectionEdit.propTypes = {
    rows: PropTypes.array,
    setRows: PropTypes.func,
    isEdit: PropTypes.bool,
    row: PropTypes.object,
    openModal: PropTypes.func,
    setLoad: PropTypes.func
};

export default SectionEdit;