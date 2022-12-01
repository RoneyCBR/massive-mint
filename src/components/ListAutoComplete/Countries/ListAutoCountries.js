import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import PropTypes from 'prop-types';
import {countries} from './utils/options';

const ListAutoCountries = ({options,width,height,onFunction,disabled,value}) => {

    const [country, setCountry] = React.useState(value);

    const handleChange = (e) => {
      const {value} = e.target;
      if(String(value).length < 16){
        setCountry(value);
        onFunction(value);
      }
    }


    const handleClickCountry = (e) => {
      const {innerText} = e.target;
      if(innerText && innerText.length > 0){
        setCountry(String(innerText).substring(innerText.length-3,innerText.length-1))
        onFunction(String(innerText).substring(innerText.length-3,innerText.length-1));
      }
    }


    return (
      <Autocomplete
        className="notranslate"
        sx={{"& div input":{
          width: width ,
          height: height,
          fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '
          }
        }} 
        onChange={(e)=>handleClickCountry(e)} 
        inputValue={country}
        disabled={disabled}
        options={options}
        getOptionLabel={(option) => option.name_en}
        renderInput={(params) => (
          <TextField
            {...params}
            className="notranslate"
            label="Country" 
            margin='none' 
            onChange={(e)=>handleChange(e)} 
          />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.name_en+' - ('+option.code+')', inputValue);
          const parts = parse(option.name_en+' - ('+option.code+')', matches);
  
          return (
            <li {...props}>
              <div className="notranslate" style={{fontFamily:'Futura,Trebuchet MS,Arial,sans-serif '}}>
                {parts.map((part, index) => (
                  <span 
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    );
};


ListAutoCountries.defaultProps = {
    options: countries,
    width: 300,
    height: "auto",
    onFunction: () => {},
    disabled: false,
    value:''
}

ListAutoCountries.propTypes = {
    options: PropTypes.array,
    width: PropTypes.any,
    height: PropTypes.any,
    onFunction: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string
};

export default ListAutoCountries;