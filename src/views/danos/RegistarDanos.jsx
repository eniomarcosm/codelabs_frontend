import { Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { AutoCompleteField, FormikWrapper, Input, ResetButton, Select, SubmitButton } from 'components/forms';
import SelectField from 'components/forms/SelectField';
import { getCurrentUser } from 'services/authService';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getContentores } from 'services/cargaService';
import * as Yup from 'yup';
import { setDanos } from 'services/danosService';

export const tiposDanos = [
    { id: 1, label: 'Cortador | Cut' },
    { id: 2, label: 'Avariado | Broken' },
    { id: 3, label: 'Amolgado | Scratch' },
    { id: 4, label: 'Dentado | Dent' },
    { id: 5, label: 'Falta | Missing' },
    { id: 6, label: 'Furado | Hole' },
    { id: 7, label: 'Outros Danos | Other Damage' }
];

export const momentos = [
    { id: 1, label: 'Embarque | Loading' },
    { id: 2, label: 'Descarga | Discharge' },
    { id: 3, label: 'Antes do Embarque | Before Loading' },
    { id: 4, label: 'Depois da Descarga | After Discharge' }
];
function RegistarDanos() {
    const validationSchema = Yup.object().shape({
        idContentor: Yup.object(),
        descricao: Yup.string(),
        idTipoDano: Yup.number(),
        idRegistrador: Yup.number()
    });

    // const initialValues = {
    //     label: ''
    // };

    const onSubmit = async (values) => {
        console.log(values);
        try {
            await setDanos(values);
            toast.success('Cadastrado Com Sucesso!');
        } catch (error) {
            toast.error('Erro ao cadastrar!');
        }
    };

    return (
        <FormikWrapper validateOnChange={false} validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            <Form />
        </FormikWrapper>
    );
}

function Form() {
    const [cargas, setCargas] = useState([]);

    // const { setValues } = useFormik();

    // setValues('id', getCurrentUser?.id);

    console.log(getCurrentUser);
    useEffect(() => {
        getContentores()
            .then((res) => setCargas(res.data))
            .catch((error) => console.log(error));
    }, []);

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
                        <AutoCompleteField name="idContentor" label="Contentor" options={cargas} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <SelectField label="Dano" name="idTipoDano" optionsLabel="label" options={tiposDanos} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <SelectField label="Momento do Dano" name="momento" optionsLabel="label" options={momentos} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Input label="Descrição do Dados" rows={4} name="descricao" />
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

export default RegistarDanos;
