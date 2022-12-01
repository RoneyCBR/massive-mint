import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import ModalCustom from 'components/ModalCustom';

const Authenticated = ({openModalForm,setOpenModalForm,setSessionStorage}) => {
   
    return (
        <ModalCustom 
            isOpen={openModalForm}
            onCloseModal={()=>setOpenModalForm(false)}
            title={"Authenticator"}
            height={'auto'}   
        >
            <Login setSessionStorage={setSessionStorage} open={setOpenModalForm}  />
        </ModalCustom>
    )
}

Authenticated.propTypes = {
    openModalForm: PropTypes.bool.isRequired,
    setOpenModalForm: PropTypes.func.isRequired,
    setSessionStorage: PropTypes.func.isRequired,
}

export default Authenticated;