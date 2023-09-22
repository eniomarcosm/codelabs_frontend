import { Autocomplete } from 'formik-mui';
import { TextField } from '@mui/material';
import { Field, useFormikContext } from 'formik';

export default function AutoCompleteField({ name, label, options, variant = 'outlined', ...otherProps }) {
    const { touched, errors } = useFormikContext();

    return (
        <Field
            name={name}
            component={Autocomplete}
            options={options}
            fullWidth
            // getOptionLabel={(option) => option.label}
            {...otherProps}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.label}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={name}
                    error={touched[name] && !!errors[name]}
                    helperText={errors[name]}
                    label={label}
                    variant={variant}
                    {...otherProps}
                />
            )}
        />
    );
}
