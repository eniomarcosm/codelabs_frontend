import { Card, CardActions, CardContent, CardHeader, Chip, Divider, Grid, Typography } from '@mui/material';
import { AutoCompleteField, FormikWrapper, Input, ResetButton, Select, SubmitButton } from 'components/forms';
import SelectField from 'components/forms/SelectField';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { getUsuarios, saveUsuario } from 'services/usuarioService';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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
export const sexos = [
    { id: 'Masculino', label: 'Masculino' },
    { id: 'Feminino', label: 'Feminino' }
];

export const Notificacao = [
    { id: 1, label: 'Push' },
    { id: 2, label: 'Email' }
];

export const tiposUser = [
    { id: 1, label: 'Administrador' },
    { id: 2, label: 'Agente' }
];

function Usuarios() {
    const validationSchema = Yup.object().shape({
        nome: Yup.string(),
        tipo: Yup.number(),
        email: Yup.string().email(),
        senha: Yup.string(),
        contacto: Yup.string(),
        sexo: Yup.string(),
        endereco: Yup.string(),
        notificacao: Yup.number()
    });

    const initialValues = {
        label: ''
    };

    const onSubmit = async (values) => {
        try {
            await saveUsuario(values);
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
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getUsuarios()
            .then((resp) => setUsuarios(resp.data))
            .then((error) => console.log(error));
    }, []);

    return (
        <Card>
            <CardHeader title="Usuarios" titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            1. Dados do Usuário
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Nome" rows={4} name="nome" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Email" name="email" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Senha" type="password" name="senha" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SelectField label="Tipo de Usuário" name="tipo" optionsLabel="id" options={tiposUser} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Contacto" name="contacto" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SelectField label="Sexo" name="sexo" optionsLabel="id" options={sexos} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input label="Endereço" name="endereco" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SelectField label="Tipo de Notificação" name="notificacao" optionsLabel="id" options={Notificacao} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <SubmitButton mr={2} size="large">
                            Guardar
                        </SubmitButton>

                        <ResetButton size="large" color="secondary">
                            Limpar
                        </ResetButton>
                    </Grid>
                </Grid>
            </CardContent>

            <CardContent>
                <Grid item xs={12} sm={12}>
                    <DataGrid
                        autoHeight
                        pagination
                        rows={usuarios}
                        disableDensitySelector
                        columns={columns}
                        checkboxSelection
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10
                                }
                            }
                        }}
                        pageSizeOptions={[10, 25, 50]}
                        slots={{ toolbar: GridToolbar }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 }
                            }
                        }}
                    />
                </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions></CardActions>
        </Card>
    );
}

const columns = [
    {
        flex: 0.4,
        minWidth: 200,
        field: 'nome',
        headerName: 'Nome da Disciplina',
        renderCell: (params) => (
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                {params.row.nome}
            </Typography>
        )
    },

    {
        flex: 0.2,
        minWidth: 110,
        field: 'email',
        headerName: 'Email',
        renderCell: (params) => (
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                {params.row.email}
            </Typography>
        )
    },
    {
        flex: 0.2,
        minWidth: 110,
        field: 'contacto',
        headerName: 'Contacto',
        renderCell: (params) => (
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                {params.row.contacto}
            </Typography>
        )
    },
    {
        flex: 0.2,
        minWidth: 110,
        field: 'tipo',
        headerName: 'Permissão',
        renderCell: (params) => {
            params?.tipo === 1 ? <Chip label="Administrador" color="error" /> : <Chip label="Agente" color="success" />;
        }
    }
];

export default Usuarios;
