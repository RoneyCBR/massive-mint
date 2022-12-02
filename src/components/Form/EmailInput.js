import React from 'react';
import PropTypes from 'prop-types';
import {FormControl,FormHelperText} from '@mui/material';
import axios from 'axios';

const EmailInput  = ({setMsg,setError,isEditProfile,form,setForm,pos,validateForm,setValidateForm,placeholder,name,emailTemp}) =>{

    const [validInput,setValidInput] = React.useState(true);
    const [existEmail,setExistEmail] = React.useState(false);
    const api = process.env.REACT_APP_URL_API;
    var typingTimer;

    const validateEmail = (email) =>{
        //return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
        return new RegExp(/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(email)
    }

    const validEmailInBD = (email) => {
      
        axios.get(api+`/user?validate=EMAIL&search=${email}`)
        .then(res => {
            console.log("validEmailInBD finish > existEmail",res.data[0]);

            return res.data[0];
        })
        .catch(err => {
            console.log("validEmailInBD finish error",err);
            setMsg(err.message)
            setError(true)
        })

      
    }

    const handleOnChange = (e)=>{
        clearTimeout(typingTimer)
        const {name,value} = e.target;
 
        if(value != ''){
            setForm({...form, [name]: (value+'').replace(/ /g, "")});  
        }else{
            setForm({...form, [name]: ''});
            setValidInput(true)
        }       
    }


    const handleKeyUp = () =>{
        clearTimeout(typingTimer)
        if(form.email != ''){
            if(emailTemp != form.email){
                if(validateEmail(form.email) ){
                    setValidInput(true)
                    validateForm[pos] = true;
                    setExistEmail(false)
                    setValidateForm(validateForm)
                    typingTimer  = setTimeout(()=>{
                        if(validEmailInBD((form.email+'').replace(/ /g, ""))){
                            setExistEmail(false)
                            validateForm[pos] = true
                        }else{
                            setExistEmail(true)
                            validateForm[pos] = false
                        }
                        clearTimeout(typingTimer)
                    },700)
                    setValidateForm(validateForm)
                }else{
                    setValidInput(false)
                    setExistEmail(false)
                    validateForm[pos] = false
                    setValidateForm(validateForm)
                }
            }else{
                setValidInput(true)
                setExistEmail(true)
                validateForm[pos] = false
                setValidateForm(validateForm)
            }
            
        }else{
            validateForm[pos] = false
            setValidateForm(validateForm)
        }

       
    }

    const handleKeyDown = () =>{
        clearTimeout(typingTimer)
    }


    return (

        <FormControl error={!validInput} variant="standard" sx={{marginLeft:'10px'}}>
            <input 
                aria-describedby={"simple-popover1"}
                type="email"
                autoComplete='off'
                required
                name={name}
                value={form.email}
                disabled = {!isEditProfile}
                placeholder={placeholder}
                onChange={(e)=>{handleOnChange(e)}}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                style={{
                    padding:'8px',
                    borderRadius:'8px',
                    outlineColor:'#ed2891',
                    border:'1px solid #ed2891',
                    width:'200px',
                }} 
            />

        {
            validInput ? '':
            <FormHelperText id="component-error-text">
                {
                    existEmail ?
                    "El correo ya existe"
                    :
                    "Ingresa un correo valido!"
                    
                }
                
            </FormHelperText>
        }
           
        </FormControl>
    )
};


EmailInput .propTypes = {
  setMsg: PropTypes.func,
  setError: PropTypes.func,
  isEditProfile: PropTypes.bool,
  form: PropTypes.object,
  setForm: PropTypes.func,
  pos: PropTypes.number,
  validateForm: PropTypes.array,
  setValidateForm: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  emailTemp: PropTypes.string
};

export default EmailInput ;
