import React from 'react';
import PropTypes from 'prop-types';
import { TextField} from '@mui/material';


const UserNameInputType1  = ({width,setMsg,setError,isEditProfile,form,setForm,placeholder,name}) =>{

    const [validInput,setValidInput] = React.useState(true);
    const [invalidCharacter,setInvalidCharacter] = React.useState('');
    const [existUser,setExistUser] = React.useState(false);
    const [msgInput,setMsgInput] = React.useState('');
    let typingTimer;



    const defineMsg = () =>{
        if(invalidCharacter != '' && !validInput){
            if(invalidCharacter== " "){
                setMsgInput("No puede contener espacios")
            }else{
                setMsgInput("Caracter invalido : "+invalidCharacter)
            }           
        }else{
            if(String(form.username).length >= 30){
                setMsgInput("Max 30 caracteres")
            }else{
                if(existUser){
                    setMsgInput("El nombre de usuario ya existe");
                    setError(false);
                    setMsg('');
                }else{
                    setMsgInput("Enter username")
                }
                
            } 
        }
    }

    const validateUsername = (username) =>{
        let re = /^[a-zA-Z0-9.]+$/;
        return re.test(username);
    }

    const validUsernameInBD = async (username) => {
        console.log(username);
        return true
    }

    const handleOnChange = (e)=>{
        clearTimeout(typingTimer)
        const {name,value} = e.target;
       
        if(value != ''){
            if(String(value).length <= 30){
                if(validateUsername(value) ){
                    setValidInput(true)
                    setForm({...form, [name]: (value+'').replace(/ /g, ""),validateAttr:{...form.validateAttr,username:true}})
                }else{
                    setInvalidCharacter((value+'').charAt(value.length -1));
                    setValidInput(false)
                }

            }
            defineMsg()
        }else{
            setForm({...form,[name]:'',validateAttr:{...form.validateAttr,username:false}});
            setValidInput(true)
        }

    }

  

    const handleFinishWrite = ()=>{
        clearTimeout(typingTimer)
        if(form.username != ''){  
            if(validateUsername(form.username) ){   
              typingTimer  = setTimeout(()=>{
                    if(validUsernameInBD(form.username)){
                        setExistUser(false)
                    }else{
                        setExistUser(true)
                    }
                    setForm({...form,validateAttr:{...form.validateAttr,username:true}});
                    clearTimeout(typingTimer)
                },600)
                            
            }else{
                setInvalidCharacter((form.username+'').charAt(form.username.length -1));
                setValidInput(false)
                setForm({...form,validateAttr:{...form.validateAttr,username:false}});
            }
            defineMsg()
        }
    }

    const handleInitWrite = ()=>{
        clearTimeout(typingTimer)
    }

    const handleFocus = ()=>{
        clearTimeout(typingTimer)
        if(validateUsername(form.username) ){  
            setValidInput(true)
            setForm({...form,validateAttr:{...form.validateAttr,username:true}});
        }else{
            setValidInput(true)
            setForm({...form,validateAttr:{...form.validateAttr,username:false}});
        }
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
                type="text"
                error = {!validInput}
                id="standard-error-helper-text"
                label="Username"
                helperText={msgInput != '' ? msgInput : 'Enter username'}
                variant="standard"
                autoComplete='off'
                required
                name={name}
                disabled={isEditProfile}
                value={form.username}
                placeholder={placeholder ? placeholder : ''}
                onChange={(e)=>{handleOnChange(e)}}
                onKeyDown={handleInitWrite}
                onKeyUp={handleFinishWrite}
                onFocus={handleFocus}
                onMouseOver={handleFocus}
            />
        </React.Fragment>
    )
};

UserNameInputType1.defaultProps = {
    placeholder: 'Username',
    name: 'username',
    width: '45%'
}


UserNameInputType1 .propTypes = {
    setMsg: PropTypes.func,
    setError: PropTypes.func,
    isEditProfile: PropTypes.bool,
    form: PropTypes.object,
    setForm: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.any
};

export default UserNameInputType1 ;
