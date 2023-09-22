import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

export default function ResetButtonField({ label, variant = 'contained', color = 'secondary', type, size, children, ...otherProps }) {
    const { resetForm } = useFormikContext();
    return (
        <Button variant={variant} color={color} type={type} size={size} {...otherProps} onClick={resetForm}>
            {children}
        </Button>
    );
}
