import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

// eslint-disable-next-line react/prop-types
export default function ButtonField({ fullWidth, variant = 'contained', color, type, size = 'large', mr, children, ...otherProps }) {
    const { dirty, isValid, submitForm, isSubmitting } = useFormikContext();

    return (
        <Button
            disabled={!dirty || !isValid || isSubmitting}
            variant={variant}
            color={color}
            type={type}
            fullWidth={fullWidth}
            sx={{ mr }}
            size={size}
            {...otherProps}
            onClick={submitForm}
        >
            {children}
        </Button>
    );
}
