import React, { createContext, useState } from 'react';
import { sign } from 'services/Utils/signature';
import PropTypes from 'prop-types';

export const StatusTx = createContext(null);

const StatusTxProvider = ({ children }) => {
    const [statusTx, setStatusTx] = useState(false);
    const { Provider } = StatusTx;
    return (
        <Provider value={{statusTx, setStatusTx, sign}}>
            {children}
        </Provider>
    );
};

StatusTxProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default StatusTxProvider;
