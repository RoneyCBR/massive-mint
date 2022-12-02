import * as Yup from 'yup';

export const buySchema = Yup.object().shape({
    price: Yup.number()
        .min(0, 'El precio debe ser mayor a 0')
        .positive('El precio debe ser positivo')
        .required('El precio es requerido'),
});