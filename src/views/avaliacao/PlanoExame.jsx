import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { DateInput, FormikWrapper, Input, ResetButton, Select, SubmitButton } from 'components/forms';
import MainCard from 'ui-component/cards/MainCard';

import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import { useContext, useEffect, useState } from 'react';
import UserDataContext from 'context/userDataContext';
import { useFormikContext } from 'formik';
import { getTeacherSubjectTemporada } from 'services/docenteService';
import { getDocenteCursos } from 'services/cursoDocente';
import * as Yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';

export default function PlanoExame() {
    const initialValues = {
        disciplina: '',
        avaliacoes: '',
        curso: ''
    };

    const validationSchema = Yup.object().shape({
        avaliacoes: Yup.number(),
        disciplina: Yup.number()
    });

    const onSubmit = async (values) => {
        alert(JSON.stringify(values, null, 2));
    };
    return (
        <FormikWrapper initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <MyForm />
        </FormikWrapper>
    );
}

function MyForm(params) {
    const [myDisciplinaTemporada, setMyDisciplinaTempora] = useState([]);

    const [myCourse, setMyCourse] = useState([]);

    const { values } = useFormikContext();

    const currentDocenteData = useContext(UserDataContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data: tempTeacherSubject } = await getTeacherSubjectTemporada(currentDocenteData?.idfuncionario);
                setMyDisciplinaTempora(tempTeacherSubject);

                const { data: myCourse } = await getDocenteCursos(currentDocenteData?.idfuncionario);
                setMyCourse(myCourse);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    const filteredDisciplinas = myDisciplinaTemporada.filter((disciplina) => disciplina.idcurso === values.curso);

    const columnsExames = [
        { field: 'id', headerName: 'Id', align: 'left', flex: 1, minWidth: 20, hide: true },
        { field: 'tipoexame', headerName: 'Tipo de Exane', align: 'left', flex: 1, minWidth: 20 },
        { field: 'percentagem', headerName: 'Percentagem', align: 'left', flex: 1, minWidth: 180 },
        { field: 'descricao', headerName: 'Descrição', align: 'left', flex: 1, minWidth: 40 },
        {
            field: 'datarderealizacao',
            headerName: 'Data',
            flex: 1,
            align: 'left',
            minWidth: 40
        }
    ];

    const rowsExames = [];

    return (
        <MainCard title="Plano de Exame">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title="Dados da Disciplina">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <Select name="curso" label="Selecione o Curso" options={myCourse} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Select name="disciplina" label="Selecione o Disciplina" options={filteredDisciplinas} />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Avaliações">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={6} sm={3}>
                                <Select
                                    name="tipo_exame"
                                    label="Tipo"
                                    options={[
                                        { id: 1, label: 'Exame Norma' },
                                        { id: 2, label: 'Exame de Recorrência' }
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Input name="percentagem" label="Percentagem" type="number" max={100} />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Input name="descricao" label="Descrição" />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <DateInput name="datarealizacao" label="Data de Realização" />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={4} sm={3}>
                    <SubmitButton size="large">Adicionar</SubmitButton>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <div style={{ width: '100%' }}>
                    <DataGrid autoHeight disableSelectionOnClick disableExtendRowFullWidth columns={columnsExames} rows={rowsExames} />
                </div>
            </Grid>

            <CardActions>
                <SubmitButton>Criar</SubmitButton>
                <ResetButton>Limpar</ResetButton>
            </CardActions>
        </MainCard>
    );
}
