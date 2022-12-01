import * as Yup from 'yup';

export const initialValues = {
    email: ''
}
export const schemaLayout = Yup.object().shape({
    email: Yup.string().email()
        .required('Email is required')
});