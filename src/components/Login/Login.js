import React from 'react';
import { Box, Button } from '@mui/material';
import UserNameInputType1 from 'components/Form/UserNameInputType1';
import PasswordInputType1 from 'components/Form/PasswordInputType1';
import PropTypes from 'prop-types';

let defaultForm = {
    username: '',
    password: '',
    validateAttr: {
        username: false,
        password: false,
    }
}

const Login = ({setSessionStorage,open}) => {
    const [msg, setMsg] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [form, setForm] = React.useState(defaultForm);

    const auth = {
        username: process.env.REACT_APP_USERTEMP,
        password: process.env.REACT_APP_PASSWORD
    }

    let SecretKey = process.env.REACT_APP_SECRET_KEY;
    const encryptPassword = () => {
        const encrypt = require('crypto');
        const hash = encrypt.createHmac('sha256', SecretKey);
        return hash.digest('hex');
    }      

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMsg('');
        try {
            if((auth.username == form.username) && (auth.password == form.password)){
                setMsg('Login success');
                setLoading(true);
                setError(false);
                let timeOut = setTimeout(() => {
                    setSessionStorage('user', {
                        username: form.username,
                        password: form.password
                    });

                    window.sessionStorage.setItem('sessionStorage', JSON.stringify({
                        username: encryptPassword(),
                        password: encryptPassword()
                    }));
                    setSessionStorage(JSON.parse(window.sessionStorage.getItem('sessionStorage')));
                    open(false);
                    clearTimeout(timeOut);
                }, 2000);
            }else{
                setError(true);
                setMsg('User or password incorrect');
            }
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        setForm(defaultForm);
    },[])


    return (

        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '220px',
                        flexDirection: 'column',

                    }}
                >
                    <UserNameInputType1
                        setMsg={setMsg}
                        setError={setError}
                        isEditProfile={loading} 
                        form={form} 
                        setForm={setForm} 
                        name={"username"} 
                        placeholder={"Username"} 
                        width={"100%"}
                    />

                    <PasswordInputType1
                        setMsg={setMsg}
                        setError={setError}
                        isEditProfile={loading} 
                        form={form} 
                        setForm={setForm} 
                        name={"password"} 
                        placeholder={"Password"} 
                        width={"100%"}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                            width: '100%',
                            "@media (max-width:768px)": {
                                width: '80%'
                            }
                        }}
                    >
                        <Button
                            disabled={loading || (!form.validateAttr.username || !form.validateAttr.password)}
                            type="submit"
                            onClick={(e)=>{handleSubmit(e)}}
                            sx={{
                                "&.Mui-disabled":{
                                    background: '#fff',
                                    border:'1px solid #ccc',
                                }
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                    <br/>
                    <Box
                        sx={{
                            color:error?'red':'green',
                            textAlign: 'center'
                        }}
                    >
                        {msg}
                    </Box>
                
                </Box>

                
            </Box>
        </form>
    );
};
Login.propTypes = {
    setSessionStorage: PropTypes.func,
    open: PropTypes.func
}


export default Login;
