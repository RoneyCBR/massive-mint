import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '@mui/material';

const optionsArray = [
    { type: 'Photography'},
    { type: 'Ilustration'},
    { type: 'Painted'},
    { type: 'Collage'},
    { type: 'Animation'},
    { type: '3D'},
    { type: 'Generative art'},
    { type: 'Fashion and warables'},
    { type: 'Music'},
    { type: 'IA'},
    { type: 'Other'}
];

const List = ({options,setOptions}) => {


    const [value,setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        setOptions({...options,categories:event.target.value});
    };

    return (
        <Select
            value={value}
            label=""
            name="categories"
            onChange={handleChange}
            sx={{ 
                width: '100%',
                height:'45px',
                border:'1px solid #E5E5E5'
            }}
        >
            {optionsArray?.map((option,index) => (
                <MenuItem key={index} value={option.type}>
                    {option.type}
                </MenuItem>
            ))}
        </Select>

    );
};

List.propTypes = {
    options: PropTypes.object,
    setOptions: PropTypes.func
};

export default List;