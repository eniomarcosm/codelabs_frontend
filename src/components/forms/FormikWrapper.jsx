import { Formik, Form } from 'formik';

function FormWrapper({ initialValues, validationSchema, onSubmit, children, ...otherProps }) {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...otherProps}>
            {() => <Form>{children}</Form>}
        </Formik>
    );
}

export default FormWrapper;
