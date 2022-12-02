import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@mui/material';


const EmailInputType1  = ({setMsg,setError,isEditProfile,form,setForm,placeholder,name,emailTemp,width}) =>{

    const [validInput,setValidInput] = React.useState(true);
    const [existEmail,setExistEmail] = React.useState(false);
    const [msgInput,setMsgInput] = React.useState('');

    let typingTimer;
    console.log(setMsg)
    console.log(setError)
    const defineMsg = () =>{
        if(!validInput){
            setMsgInput("Enter valid email")
        }else
        if(existEmail){
            setMsgInput("El correo ya existe")
        }else
            setMsgInput("Enter email")
    }

    const validateEmail = (email) =>{
        return new RegExp(/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(email)
    }

    const validEmailInBD = (email) => {
        console.log(email)
        return true

    }

    const handleOnChange = (e)=>{
        clearTimeout(typingTimer)
        const {name,value} = e.target;
 
        if(value != ''){
            setForm({...form, [name]: (value+'').replace(/ /g, ""),validateAttr:{...form.validateAttr,email:false}});  
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
                    setForm({...form,validateAttr:{...form.validateAttr,email:true}});  
                    setExistEmail(false)
                    typingTimer  = setTimeout(()=>{
                        if(validEmailInBD((form.email+'').replace(/ /g, ""))){
                            setExistEmail(false)
                        }else{
                            setExistEmail(true)
                        }
                        clearTimeout(typingTimer)
                    },700)
                }else{
                    setValidInput(false)
                    setExistEmail(false)
                    setForm({...form,validateAttr:{...form.validateAttr,email:false}});  
                }
            }else{
              
                setValidInput(true)
                setExistEmail(true)
              
            }
            defineMsg()
        }

       
    }

    const handleKeyDown = () =>{
        clearTimeout(typingTimer)
    }
    


    return (
        <React.Fragment>
            <TextField
                sx={{
                    width:width,
                    marginTop:'20px',
                    fontFamily:'Futura,Trebuchet MS,Arial,sans-serif ',
                    "@media (max-width:768px)": {
                        width:'100%'
                    }
                }}
                type="email"
                error = {!validInput}
                id="standard-error-helper-text"
                label="Email"
                defaultValue="email"
                helperText={msgInput != '' ? msgInput : 'Enter email'}
                variant="standard"
                autoComplete='off'
                required
                name={name}
                value={form.email}
                disabled = {isEditProfile}
                placeholder={placeholder}
                onChange={(e)=>{handleOnChange(e)}}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
            />
        </React.Fragment>
    )
};

EmailInputType1.defaultProps = {
    placeholder: 'Password',
    name: 'password',
    width: '45%'
}


EmailInputType1 .propTypes = {
    width: PropTypes.any,
    setMsg: PropTypes.func,
    setError: PropTypes.func,
    isEditProfile: PropTypes.bool,
    form: PropTypes.object,
    setForm: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    emailTemp: PropTypes.string
};

export default EmailInputType1 ;
