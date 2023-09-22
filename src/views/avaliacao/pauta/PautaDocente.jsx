import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { DataGrid, GridCellEditStopReasons, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { FormikWrapper, Select } from 'components/forms';
import UserDataContext from 'context/userDataContext';
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getDocenteCursos } from 'services/cursoDocente';
import { getDisciplinasDocente } from 'services/disciplinaService';
import { getTeacherSubjectTemporada } from 'services/docenteService';

const columns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'av1', headerName: 'Teste 1 (30%)', type: 'number', editable: true, flex: 1 },
    {
        field: 'av2',
        headerName: 'Teste 2 (30%)',
        type: 'number',
        editable: true,
        flex: 1
    },
    {
        field: 'av3',
        headerName: 'Teste 3 (40%)',
        type: 'number',
        editable: true,
        flex: 1
    },

    {
        field: 'media',
        headerName: 'Média',
        type: 'number',
        editable: true,
        flex: 1
    },
    {
        field: 'resultado',
        headerName: 'Resultado',
        flex: 1
    }
];

const rows = [
    {
        id: 1,
        nome: 'Enio Marcos',
        av1: 12,
        av2: 10,
        av3: 9,
        media: 10,
        resultado: 'Aprovado'
    },
    {
        id: 2,
        nome: 'Mucando Lazaro',
        av1: 8,
        av2: 3,
        av3: 9,
        media: 7,
        resultado: 'Reprovado'
    },
    {
        id: 3,
        nome: 'Orazal Odnacum',
        av1: 15,
        av2: 12,
        av3: 5,
        media: 12,
        resultado: 'Aprovado'
    }
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default function PautaDocente() {
    const initialValues = {
        disciplina: ''
    };

    const onSubmit = (values) => {};
    return (
        <FormikWrapper validateOnChange onSubmit={onSubmit} initialValues={initialValues}>
            <Form />
        </FormikWrapper>
    );
}

const useFakeMutation = () =>
    useCallback(
        (user) =>
            new Promise((resolve, reject) =>
                // eslint-disable-next-line no-promise-executor-return
                setTimeout(() => {
                    if (user.name?.trim() === '') {
                        reject(new Error("Error while saving user: name can't be empty."));
                    } else {
                        resolve({ ...user, name: user.name?.toUpperCase() });
                    }
                }, 200)
            ),
        []
    );

function Form() {
    const [myCourse, setMyCourse] = useState([]);
    const [nrows, setnRows] = useState([rows]);

    const [disciplinas, setDisciplinas] = useState([]);

    const currentDocenteData = useContext(UserDataContext);
    const { values } = useFormikContext();

    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const { data } = await getTeacherSubjectTemporada(currentDocenteData?.idfuncionario);
                setDisciplinas(data);

                const { data: myCourse } = await getDocenteCursos(currentDocenteData?.idfuncionario);
                setMyCourse(myCourse);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDisciplinas();
    }, []);

    const handleEdit = (event) => {};

    const filteredDisciplinas = disciplinas.filter((disciplina) => disciplina.idcurso === values.curso);

    const processRowUpdate = useCallback(
        async (newRow) => {
            console.log(newRow);
        },
        [nrows]
    );

    const handleProcessRowUpdateError = useCallback((error) => toast.error({ children: error.message, severity: 'error' }), []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Pautas" titleTypographyProps={{ variant: 'h6' }} />
                    <Divider sx={{ marginBottom: 0 }} />

                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={4}>
                                <Select label="Curso" name="curso" options={myCourse} />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Select label="Disciplinas" name="disciplina" options={filteredDisciplinas} />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Divider sx={{ marginBottom: 0 }} />
                            </Grid> */}
                            <Grid item xs={12} sm={12} sx={{ margin: '10px' }}>
                                <DataGrid
                                    autoHeight
                                    rows={rows}
                                    columns={columns}
                                    onCellEditCommit={handleEdit}
                                    processRowUpdate={processRowUpdate}
                                    onProcessRowUpdateError={handleProcessRowUpdateError}
                                    components={{ Toolbar: CustomToolbar }}
                                    experimentalFeatures={{ newEditingApi: true }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
