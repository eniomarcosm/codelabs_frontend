import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Success() {
    return (
        <Grid container spacing={3} sx={{ marginTop: 5, marginBottom: 10 }}>
            <Grid item xs={12} sm={12}>
                <Typography variant="h2" align="center">
                    Obrigado!
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Typography component="p" align="center" style={{ marginTop: 40 }}>
                    Receberá um email com as sugestões dos passos subsequentes!
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Link color="primary" to="/login" style={{ marginTop: 40 }}>
                    Voltar ao Login
                </Link>
            </Grid>
        </Grid>
    );
}
