import { TextField } from 'formik-mui';
import { Field } from 'formik';

export default function InputField({ label, name, id, variant, type = 'text', ...props }) {
    return <Field id={id} label={label} variant={variant} fullWidth name={name} type={type} component={TextField} {...props} />;
}
