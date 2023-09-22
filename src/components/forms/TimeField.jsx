/* eslint-disable react/prop-types */
import { Field } from 'formik';
import { TimePicker } from 'formik-mui-x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function DateField({ name, placeholderText = 'DD-MM-AAAA', label, ...otherProps }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Field
                fullWidth
                component={TimePicker}
                name={name}
                label={label}
                textField={{ fullWidth: true }}
                ampm={false}
                placeholder={placeholderText}
                placeholderText={placeholderText}
                {...otherProps}
            />
        </LocalizationProvider>
    );
}
