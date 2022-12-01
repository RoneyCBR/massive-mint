import axios from 'axios';

export const getUsdPrice = () => {
    let url = 'https://api.coinbase.com/v2/prices/ETH-USD/spot';
    return axios.get(url)
            .then((response) => response)
            .catch((error) => error)
};

export const convertEthToUsd = (eth, current) => {
    const converted = (current * eth) / 1;
    return converted;
};
 