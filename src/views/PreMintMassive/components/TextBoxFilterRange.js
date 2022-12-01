import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';


const TextBoxFilterRange = ({range,setRange,value,nameRange,width,size,disabled,label,maxNumber}) =>{

    const validate = (value,name)=>{
        let newVAlue = Number(value);
        if(name=="rangeBottom" && newVAlue <= maxNumber && newVAlue <= range.rangeTop){
            if((range.rangeTop-newVAlue) <= 30){
                setRange({...range,[name]:newVAlue});
            }else{
                if(newVAlue < 30){
                    setRange({...range,
                        rangeTop:30,
                        [name]:newVAlue
                    });
                }else{
                    setRange({...range,
                        rangeTop:newVAlue,
                        [name]:newVAlue
                    });
                }
            }
            return null;
        }

        if(name=="rangeTop" && newVAlue <= maxNumber && (newVAlue-range.rangeBottom) <= 29){
            if(newVAlue >= range.rangeBottom){
                setRange({...range,[name]:newVAlue});
            }else{
                setRange({...range,
                    rangeBottom:newVAlue,
                    [name]:newVAlue
                });
            }
        }
    }

    const handleChange = (e) =>{
        const {value,name} = e.target;
        if(nameRange === name && value > 0){
            validate(value,name);
        }else{
            setRange({...range,[name]:1});
        }
    }

    return (
        <TextField
            sx={{
                width:width,
                color:'#fff',
                "& ,input":{
                    color:'#fff'
                },
                "& label.Mui-focused":{
                    color:'#fff'
                },
                "& label":{
                    color:'#fff'
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'green',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#43B02A',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#43B02A',
                    }
                }
            }}
            type="number"
            size={size}
            label={label}
            disabled={disabled}
            name={nameRange}
            value={value}
            onChange={handleChange}
        />
    )
}

TextBoxFilterRange.defaultProps ={
    range: {rangeBottom:0,rangeTop:0},
    setRange: ()=>{},
    value:0,
    width: 'auto',
    size:'large',
    disabled: false,
    label:'',
    maxNumber:0
}

TextBoxFilterRange.propTypes = {
    range: PropTypes.object,
    setRange: PropTypes.func,
    nameRange: PropTypes.string,
    value: PropTypes.number,
    width: PropTypes.any,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    maxNumber: PropTypes.number
}

export  default TextBoxFilterRange;
