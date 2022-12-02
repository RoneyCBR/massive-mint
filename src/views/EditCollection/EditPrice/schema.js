import * as Yup from 'yup';

export const updatePriceSchema = Yup.object().shape({
    price: Yup.number()
        .min(0)
        .required("")
});
