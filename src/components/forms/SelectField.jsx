import { FormControl, MenuItem } from '@mui/material';
import { Field } from 'formik';
// import { TextField } from 'formik-mui';
import { Select, TextField } from 'formik-mui';

function SelectField({ id, label, labelId, optionsLabel, helperText, name, options, sxFormControl, ...otherProps }) {
    return (
        <FormControl fullWidth>
            <Field
                component={TextField}
                name={name}
                label={label}
                select
                helperText={helperText}
                // InputLabelProps={{
                //     shrink: true
                // }}
                InputProps={{
                    label
                }}
                {...otherProps}
            >
                {/* <Field component={Select} name={name} label={label} formHelperText={helperText} {...otherProps}> */}
                {options?.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                        {option[optionsLabel] && option.label}
                    </MenuItem>
                ))}
            </Field>
        </FormControl>
        // <TextField
        //     select
        //     id="course"
        //     label="Course Category"
        //     value={values.course}
        //     onChange={handleChange('course')}
        //     helperText={touched.course ? errors.course : ''}
        //     error={touched.course && Boolean(errors.course)}
        //     margin="dense"
        //     variant="outlined"
        //     fullWidth
        // >
        //     {courseCategory.map((option) => (
        //         <MenuItem key={option.value} value={option.value}>
        //             {option.label}
        //         </MenuItem>
        //     ))}
        // </TextField>
    );
}

export default SelectField;
