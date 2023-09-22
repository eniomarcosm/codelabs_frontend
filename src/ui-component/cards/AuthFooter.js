// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

function AuthFooter() {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1" component={Link} href="https://site.unipiaget.ac.mz/dt" target="_blank" underline="hover">
                Divisão Tecnológica
            </Typography>
            <Typography variant="subtitle1" component={Link} href="https://site.unipiaget.ac.mz" target="_blank" underline="hover">
                &copy; Universidade Jean Piaget de Moçambique
            </Typography>
        </Stack>
    );
}

export default AuthFooter;
