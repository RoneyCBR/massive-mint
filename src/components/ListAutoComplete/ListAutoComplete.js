import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import PropTypes from 'prop-types';
import {options} from './utils/options';

const ListAutoComplete = ({options,width,onFunction}) => {

    const [categories, setCategories] = React.useState('');

    const handleChange = (e) => {
      const {value} = e.target;
      setCategories(value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(e.key == 'Enter') {
          onFunction(categories);
      }
    }

    const handleClickCategories = (e) => {
      console.log(e.target.attributes);
      if(e.target.attributes.getNamedItem('pos').value){
        let num = e.target.attributes.getNamedItem('pos').value;
        if(num && num > 0){
            options?.map((item) => {
                if(item.value == num){
                  setCategories(item.type);
                  onFunction(item.type);
                }
            })
        }
      }

      // urlNFT(`${process.env.REACT_APP_URL_API}/nft?domain=${process.env.REACT_APP_DOMAIN}&limit=10&page=0&limit=10&order=created&key_name=CATEGORIES&key_val=${value}`)
    }


    return (
      <Autocomplete
        sx={{
          width: width 
        }}
        onChange={(e)=>handleClickCategories(e)} 
        options={options}
        getOptionLabel={(option) => option.type}
        renderInput={(params) => (
          <TextField {...params} label="" margin="normal" value={categories} onChangeCapture={(e)=>handleChange(e)} onKeyUp={(e)=>handleSubmit(e)} />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.type, inputValue);
          const parts = parse(option.type, matches);
  
          return (
            <li {...props}>
              <div>
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


ListAutoComplete.defaultProps = {
    options: options,
    width: 300,
    onFunction: () => {},
}

ListAutoComplete.propTypes = {
    options: PropTypes.array,
    width: PropTypes.any,
    onFunction: PropTypes.func
};

export default ListAutoComplete;