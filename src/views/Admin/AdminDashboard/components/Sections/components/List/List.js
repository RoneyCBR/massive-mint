import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '@mui/material';

const optionsArray = [
    "Hot_Auctions",
    "Auctions",
    "Hot_Sales",
    "Collections",
    "Artists",
    "Curators",
    "Categories",
    "Recently_Sold",
    "New_Pieces_Created"
];

const List = ({options,setOptions,name,val}) => {



    const handleChange = (event) => {
        setOptions({...options,filter:event.target.value});
    };

    return (
        <Select
            value={val}
            label=""
            name={name}
            onChange={handleChange}
            sx={{ 
                width: '100%',
                height:'45px',
                border:'1px solid #E5E5E5'
            }}
        >
            {optionsArray?.map((option,index) => (
                <MenuItem key={index} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>

    );
};

List.defaultProps = {
    options: {},
    setOptions: () => {},
    name:'',
    val:''
}

List.propTypes = {
    options: PropTypes.object,
    setOptions: PropTypes.func,
    name: PropTypes.string,
    val: PropTypes.string
};

export default List;