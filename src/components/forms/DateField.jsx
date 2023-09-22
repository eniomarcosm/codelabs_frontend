/* eslint-disable react/prop-types */
import { Field } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DatePicker } from 'formik-mui-x-date-pickers';

export default function DateField({ name, format = 'dd/MM/yyyy', placeholderText = 'DD-MM-AAAA', label, ...otherProps }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Field
                fullWidth
                component={DatePicker}
                inputFormat={format}
                name={name}
                label={label}
                textField={{ fullWidth: true }}
                placeholderText={placeholderText}
                {...otherProps}
            />
        </LocalizationProvider>
    );
}
