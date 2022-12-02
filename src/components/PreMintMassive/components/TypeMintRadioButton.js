import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const TypeMintRadioButton = ({options,label,type,setType,name,colorRadioButtons,autoSelectedFirst,load}) => {
    const [value, setValue] = React.useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        setType({...type,[name]:e.target.value});
    };
    
    React.useEffect(()=>{
        if(options.length > 0 && options[0] && options[0].value && autoSelectedFirst){
            setValue(options[0].value)
        }
    },[])

    return (
        <FormControl size='small'>
            <FormLabel id="radio-group-label" sx={{color:'#fff',"&.Mui-focused":{color:'#fff'}}}><h3 style={{margin:'0px 0px',color:'#fff'}}>{label}</h3></FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="radio-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={(e)=>handleChange(e)}
                    sx={{
                        color:'#fff'
                    }}
                >
                    {
                        options.map((option,index)=>{
                            return <FormControlLabel key={index} disabled={load} value={option.value} control={
                                <Radio sx={{
                                    color:colorRadioButtons,
                                    '&.Mui-checked': {
                                        color: colorRadioButtons,
                                    }
                                }}
                                />
                                } 
                                label={option.label} 
                            />
                        })
                    }
                </RadioGroup>
        </FormControl>
    );
};

TypeMintRadioButton.defaultProps = {
    options: [],
    label: 'Radio button Groups',
    type:{typeMint:''},
    setType:()=>{},
    name:'typeMint',
    colorRadioButtons:'primary',
    autoSelectedFirst:true,
    load:false
};


TypeMintRadioButton.propTypes = {
    options: PropTypes.array,
    label: PropTypes.string,
    type: PropTypes.object,
    setType: PropTypes.func,
    name: PropTypes.string,
    colorRadioButtons: PropTypes.string,
    autoSelectedFirst: PropTypes.bool,
    load: PropTypes.bool
};

export default TypeMintRadioButton;