/* eslint-disable global-require */
/* eslint-disable react/prop-types */
// ** MUIWithImage Imports
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// eslint-disable-next-line react/prop-types
function CardWithImage({ option }) {
    return (
        <Card>
            <CardMedia sx={{ height: '9rem' }} image={require('../../assets/images/cards/graduation.png')} />
            <CardContent sx={{ padding: (theme) => `${theme.spacing(3, 2, 2)} !important` }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {option.nome}
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>{option.semestre_cadeira}</Typography>
                <Typography variant="h2"> {option.label}</Typography>
            </CardContent>
            <Button
                // disabled={!option.status}
                variant="contained"
                sx={{
                    py: 2,
                    width: '100%',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                }}
            >
                Mais Informações
            </Button>
        </Card>
    );
}

export default CardWithImage;
