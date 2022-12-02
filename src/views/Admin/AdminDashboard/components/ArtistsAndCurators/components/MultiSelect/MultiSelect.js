import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import axios from 'axios';
//import {curators} from './utils/curators';

const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
  width: 100%;
`,
);



const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 100%;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

const MultiSelect =  ({id,name,params,rows,setRows}) => {

    const [curatorsList, setCuratorsList] = React.useState(params.formattedValue);
    const [curators, setCurators] = React.useState([]);

    React.useEffect(()=>{
      if(curators.length == 0) {
          axios.get(process.env.REACT_APP_URL_API+`/user?domain=${process.env.REACT_APP_DOMAIN}&limit=${1000}&page=${0}&search=ALL`)
          .then(res=>{
              let newCurators = []
              res.data.forEach(user => {
                  if (user.role == 5) {
                    newCurators.push({id : user.id, name : user.username, wallet : user.wallet})
                  }
              })
              setCurators(newCurators)
          }).catch(err=>{
              alert('Error: '+err)
          })
      }
    },[])


    const handleChangeList = (e,v) => {
      e.preventDefault();
      setCuratorsList(v);
      rows.map(artist => {
        if(artist.id == params.id){
          artist.curators = v && v.length > 0 ? v : [];
          artist.formattedValue = v && v.length > 0 ? v : [];
          artist.isEdit = true;
        }
      });
      setRows(rows);
    }

    


    const {
      getRootProps,
      getInputProps,
      getTagProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
      value,
      focused,
      setAnchorEl,
    } = useAutocomplete({
      id: id,
      name: name,
      defaultValue: curators,
      multiple: true,
      value: curatorsList,
      options: curators,
      getOptionLabel: (option) => option.name,
      onChange: (event, value) => {
        handleChangeList(event, value);
      },
      isOptionEqualToValue: (option, value) => option.id === value.id
    });

    return (
    <Root>
      <div {...getRootProps()} >
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}  >
          {value.map((option, index) => (
            <StyledTag key={index} label={option.name} {...getTagProps({ index })} />
          ))}

          <input {...getInputProps()} 
            name={name}
          />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>{option.name+'('+option.wallet+')'}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};

MultiSelect.defaultProps = {
    id: '',
    name: '',
    params: {},
    rows: [],
    setRows: () => {console.log("")}
}

MultiSelect.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    params: PropTypes.object,
    rows: PropTypes.array,
    setRows: PropTypes.func
};


export default MultiSelect;