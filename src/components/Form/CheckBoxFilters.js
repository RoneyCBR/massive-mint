import React ,{useState} from 'react';
import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
//import {useHistory} from 'react-router-dom';

const CheckBoxFilters = ({name,handleRequestWithFilters}) => {

    //const history = useHistory();

    const [active,setActive] = useState(false)

    const handleChangeCheckbox = (e) => {
       // const {name} = e.target;
        setActive(!active)
        handleRequestWithFilters((e.target.value.includes('true')) ? false: true)
    }



    return (
        <Checkbox 
            defaultChecked={active}
            name={name}
            value={active}
            onChange={(e)=>{handleChangeCheckbox(e)}}
            sx={{
                '&.Mui-checked':{
                    color:'#1B2635'
                }
            }}
        />
    );

}



CheckBoxFilters.propTypes = {
    name: PropTypes.string,
    handleRequestWithFilters: PropTypes.func
}



export default CheckBoxFilters;