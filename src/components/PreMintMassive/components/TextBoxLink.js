import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const TextBoxLink = ({link,value,setLink,nameLink,width,size,disabled,label,t}) =>{

    const [error,setError] = React.useState(null);
    const [message,setMessage] = React.useState(t("pre_mint_nft_massive.validate_link.enter_link"));
    const [first,setFirst] = React.useState(true);
   
    const handleValidateUrl = (value) =>{
        let url;
        try {
          url = new URL(value);
        } catch (_) {
          return false;  
        }
        return url.protocol === "https:";
    }

    const handleChange = (e) =>{
        setFirst(false);
        const {value,name} = e.target;
        if(nameLink === name){
            let isValid = false;
            if(handleValidateUrl(value)){
                setError(false)
                setMessage(t("pre_mint_nft_massive.validate_link.valid_link"))
                isValid = true;
            }else{
                setError(true)
                if(value == ""){
                    setError(false)
                    setMessage(t("pre_mint_nft_massive.validate_link.enter_link"))
                }else
                if(String(value).slice(0,7).includes("http:")){
                    setMessage(t("pre_mint_nft_massive.validate_link.only_https"))
                }else{
                    setMessage(t("pre_mint_nft_massive.validate_link.invalid_link"))
                }
            }
            setLink({...link,[name]:String(value).trim(),isValid:{...link.isValid,[name]:isValid}});
        }
    }

    return (
        <TextField
            
            sx={{
                width:width,
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
            id={"outlined-helperText"+nameLink}
            label={disabled?'':label}
            helperText={first || disabled?'':message}
            disabled={disabled}
            size={size}
            name={nameLink}
            value={value}
            error={error}
            onChange={handleChange}
            InputProps={{
                autoComplete:"off",
                style:{color:'#fff'}
            }}
        />
    )
}

TextBoxLink.defaultProps ={
    value:'',
    width: 'auto',
    size:'large',
    disabled: false,
    label:''
}

TextBoxLink.propTypes = {
    link: PropTypes.object,
    value: PropTypes.string,
    setLink: PropTypes.func,
    nameLink: PropTypes.string,
    width: PropTypes.any,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    t: PropTypes.any
}

export default TextBoxLink;