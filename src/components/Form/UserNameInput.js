import React from 'react';
import PropTypes from 'prop-types';
import {FormControl,FormHelperText} from '@mui/material';
import axios from 'axios';


const UserNameInput  = ({setMsg,setError,isEditProfile,form,setForm,pos,validateForm,setValidateForm,placeholder,name}) =>{

    const [validInput,setValidInput] = React.useState(true);
    const [invalidCharacter,setInvalidCharacter] = React.useState('');
    const api = process.env.REACT_APP_URL_API;
    let typingTimer;

    const validateUsername = (username) =>{
        let re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    }

    const validUsernameInBD = async (username) => {

        axios.get(api+`/user?validate=username&search=${username}`)
        .then(res => {
            setValidInput(res.data[0])
            return res.data[0];
        })
        .catch(err => {
            console.log("validUsernameInBD finish error",err);
            setMsg(err.message)
            setError(true)
        })

    }

    const handleOnChange = (e)=>{
        clearTimeout(typingTimer)
        const {name,value} = e.target;

        if(value != ''){
            if(value.length <= 30){
                if(validateUsername(value) ){
                    setValidInput(true)
                    setForm({...form, [name]: (value+'').replace(/ /g, "")});
                   
                }else{
                    setInvalidCharacter((value+'').charAt(value.length -1));
                    setValidInput(false)
                    validateForm[pos] = false
                }

            }

        }else{
            setForm({...form, [name]: ''});
            setValidInput(true)
            validateForm[pos] = false
        }
        setValidateForm(validateForm)
    }

  

    const handleFinishWrite = ()=>{
        clearTimeout(typingTimer)
        validateForm[pos] = false
        if(form.username != ''){  
            if(validateUsername(form.username) ){   

                typingTimer  = setTimeout(()=>{
                    if(validUsernameInBD(form.username)){
                        setExistUser(false)
                        validateForm[pos] = true
                    }else{
                        setExistUser(true)
                        validateForm[pos] = false
                    }
                    setValidateForm(validateForm)
                    clearTimeout(typingTimer)
                },600)
                               
            }else{
                setInvalidCharacter((form.username+'').charAt(form.username.length -1));
                setValidInput(false)
                validateForm[pos] = false
                setValidateForm(validateForm)
            }
        }

    }

    const handleInitWrite = ()=>{
        clearTimeout(typingTimer)
    }




    return (

        <FormControl error={!validInput} variant="standard" sx={{marginLeft:'10px'}}>
            <input
                aria-describedby={"simple-popover"}
                type="text"
                autoComplete='off'
                required
                name={name}
                disabled={!isEditProfile}
                value={form.username}
                placeholder={placeholder ? placeholder : ''}
                onChange={(e)=>{handleOnChange(e)}}
                onKeyDown={handleInitWrite}
                onKeyUp={handleFinishWrite}
                style={{
                    padding:'8px',
                    borderRadius:'8px',
                    outlineColor:'#ed2891',
                    border:'1px solid #ed2891',
                    width:'200px'
                }}
            />
            {
                validInput && form.username.length == 30 && 
                <FormHelperText id="component-error-text">
                    Max. 30 caracteres
                </FormHelperText>
            }
            {
                !validInput && invalidCharacter == " " ?
                <FormHelperText id="component-error-text">
                    {"No se aceptan espacios en blanco"}
                </FormHelperText>
                :
                <FormHelperText id="component-error-text">
                    {"No se aceptan: "+invalidCharacter+""}
                </FormHelperText>
            }
        </FormControl>
    )
};


UserNameInput .propTypes = {
  setMsg: PropTypes.func,
  setError: PropTypes.func,
  isEditProfile: PropTypes.bool,
  form: PropTypes.object,
  setForm: PropTypes.func,
  pos: PropTypes.number,
  validateForm: PropTypes.array,
  setValidateForm: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string
};

export default UserNameInput ;
