import { Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { FormikWrapper, Input, ResetButton, Select, SubmitButton } from 'components/forms';
import DateField from 'components/forms/DateField';
import { toast } from 'react-toastify';
import { setContentor } from 'services/cargaService';
import * as Yup from 'yup';

function CadastrarContentor() {
    // Validation
    const validationSchema = Yup.object().shape({
        label: Yup.string(),
        origem: Yup.string(),
        data_chegada: Yup.date(),
        transportador: Yup.string(),
        qrcoderef: Yup.string()
    });

    const initialValues = {
        label: ''
    };

    const onSubmit = async (values) => {
        try {
            await setContentor(values);
            toast.success('Cadastrado Com Sucesso!');
        } catch (error) {
            toast.error('Erro ao cadastrar!');
        }
    };
    return (
        <FormikWrapper validateOnChange={false} validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            <FormContentor />
        </FormikWrapper>
    );
}

function FormContentor() {
    return (
        <Card>
            <CardHeader title="Contentores" titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            1. Dados das Cargas
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Identificador da Carga" name="label" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Origem" name="origem" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DateField label="Data de Embarque" name="data_chegada" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Transportador" name="transportador" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Referência de QRCODE" name="qrcoderef" />
                    </Grid>
                </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
                <SubmitButton mr={2} size="large">
                    Guardar
                </SubmitButton>

                <ResetButton size="large" color="secondary">
                    Limpar
                </ResetButton>
            </CardActions>
        </Card>
    );
}

export default CadastrarContentor;
