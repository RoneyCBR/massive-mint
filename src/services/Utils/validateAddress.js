import web3 from 'web3';

export const validateAddress = (address) => {
    if (address === '') {
        return {
            isValid: false,
            error: 'Address is required',
        };
    }

    if (!web3.utils.isAddress(address)) {
        return {
            isValid: false,
            error: 'Address is invalid',
        };
    }

    return {
        isValid: true,
    };
}
