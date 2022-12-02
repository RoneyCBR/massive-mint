import React from 'react';
import {FormControl,FormHelperText,Input} from '@mui/material';
import {useTranslation} from 'react-i18next'
import PropTypes from 'prop-types';


const NumberInput  = (
    {
        value,
        setValue,
        placeholder,
        name,
        isTopOffer,
        initSign,
        nStep
    }) =>{
    
    const {t} = useTranslation("translate")
    const [validInput,setValidInput] = React.useState(true);

    const handleChange = (e) =>{
      
        const {value} = e.target;
        if(value >= 0 && (value+'').length <= 10){
            setValue(value);
            setValidInput(true);
        }
    }



    return (

        <FormControl error={!validInput} variant="standard">

            <Input
                disableUnderline
                inputProps={{pattern:"^[0-9]+", min: 0, inputMode: 'numeric', maxLength: 8}}
                type='number'
                disabled={isTopOffer && !isTopOffer  || initSign || nStep &&  nStep==2}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={(e)=>{handleChange(e)}}
                onKeyUp={(e)=>{handleChange(e)}}
                sx={
                    {
                        padding:'8px',
                        borderRadius:'8px',
                        outlineColor:'#000',
                        border:'1px solid #000',
                        width:'auto',
                        height:'40px'
                    }
                }
            />

            {
                validInput &&
                  
                <FormHelperText id="component-error-text">
                    {t('components.inputs.message_max_number')}
                </FormHelperText>
            }

        </FormControl>
    )
};


NumberInput .propTypes = {
    value: PropTypes.number,
    setValue: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    isTopOffer: PropTypes.bool,
    initSign: PropTypes.bool,
    nStep: PropTypes.number
};

export default NumberInput ;
