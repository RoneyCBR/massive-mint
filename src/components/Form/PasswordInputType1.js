import React from 'react';
import PropTypes from 'prop-types';
import { TextField} from '@mui/material';

const PasswordInputType1  = ({width,setMsg,setError,isEditProfile,form,setForm,placeholder,name}) =>{

    const [errorInput,setErrorInput] = React.useState(false);
    const [msgInput,setMsgInput] = React.useState('');
    let typingTimer;

    const handleOnChange = (e)=>{
        clearTimeout(typingTimer)
        const {name:newName,value} = e.target;
        if(value == ''){
            setForm({...form, [newName]: value,validateAttr:{...form.validateAttr,password:false}})
        }else{
            setForm({...form, [newName]: value,validateAttr:{...form.validateAttr,password:true}})
        }
    }

    const setValue = ()=>{
        if(form.password != ''){  
            setErrorInput(false);
            setMsgInput("")
            setError(false)
            setMsg('')
            setForm({...form,validateAttr:{...form.validateAttr,password:true}})
        }else{
            setErrorInput(true);
            setMsgInput("Enter password")
            setError(true)
            setMsg('')
            setForm({...form,validateAttr:{...form.validateAttr,password:false}})
        }
    }


    const handleFinishWrite = ()=>{
        clearTimeout(typingTimer)
        setValue();
    }

    const handleInitWrite = ()=>{
        clearTimeout(typingTimer)
    }

    const handleBlur = ()=>{
        clearTimeout(typingTimer)
        setValue();
    }

    


    return (
        <React.Fragment>
            <TextField
                sx={{
                    width:width,
                    marginTop:'20px',
                    "@media (max-width:768px)": {
                        width:'100%'
                    }
                }}
                type="password"
                error = {errorInput}
                id="standard-error-helper-text"
                label={"Password"}
                helperText={msgInput != '' ? msgInput : 'Enter password'}
                variant="standard"
                autoComplete='off'
                required
                name={name}
                disabled={isEditProfile}
                value={form.password}
                placeholder={placeholder ? placeholder : ''}
                onChange={(e)=>{handleOnChange(e)}}
                onKeyDown={handleInitWrite}
                onKeyUp={handleFinishWrite}
                onBlur={handleBlur}
            />
        </React.Fragment>
    )
};


PasswordInputType1.defaultProps = {
    placeholder: 'Password',
    name: 'password',
    width: '45%'
}

PasswordInputType1 .propTypes = {
  setMsg: PropTypes.func,
  setError: PropTypes.func,
  isEditProfile: PropTypes.bool,
  form: PropTypes.object,
  setForm: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.any
};

export default PasswordInputType1 ;
