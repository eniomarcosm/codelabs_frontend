import { Button, Divider, List, ListItem, ListItemText } from '@mui/material';

export default function Confirm({ handleNext, handleBack, values }) {
    return (
        <>
            <List>
                {values?.map((value, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={index} secondary={value} />
                        <Divider />
                    </ListItem>
                ))}
            </List>

            <div style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}>
                <Button variant="contained" color="default" onClick={handleBack}>
                    Voltar
                </Button>
                <Button style={{ marginLeft: 20 }} variant="contained" color="secondary" onClick={handleNext}>
                    Confirmar
                </Button>
            </div>
        </>
    );
}
