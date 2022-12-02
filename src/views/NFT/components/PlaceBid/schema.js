import * as Yup from 'yup';

export const bidSchema = Yup.object().shape({
    bid: Yup.number()
        .min(0, 'Bid must be greater than 0')
        .positive('The bid must be positive')
        .required('The bid is required'),
});

export const initialState = {
    days: 0, 
    hours: 0,
    minutes: 0,
    seconds: 0,
}