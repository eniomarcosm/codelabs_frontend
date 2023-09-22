/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import { Button, Grid } from '@mui/material';
import { DateInput, FormikWrapper, Input, Select, SubmitButton } from 'components/forms';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';
import UserDataContext from 'context/userDataContext';
import { getDocenteByIdUser, getTeacherSubjectTemporada, getTestesCriados } from 'services/docenteService';
import { getDocenteCursos } from 'services/cursoDocente';
import { getTiposAvaliacao } from 'services/comumService';
import { DataGrid, GridApi } from '@mui/x-data-grid';
import { getCurrentUser } from 'services/authService';
import { toast } from 'react-toastify';
import { criarAvaliacao } from 'services/notaService';

export default function PlanoAvaliacao() {
    const initialValues = {
        descricao: '',
        datarealizacao: '',
        percentagem: '',
        tipo_avaliacao: '',
        curso: '',
        disciplina: ''
    };

    const validationSchema = Yup.object().shape({
        disciplina: Yup.number(),
        curso: Yup.number().required('O curso é obrigatório'),
        descricao: Yup.string().required('O campo descrição é obrigatório'),
        datarealizacao: Yup.string().required('O campo data de realização é obrigatório'),
        percentagem: Yup.number().required('O campo percentagem é obrigatório'),
        tipo_avaliacao: Yup.number().required('O campo tipo de avaliação é obrigatório')
    });

    const onSubmit = async (values) => {
        try {
            const user = getCurrentUser();
            const { data: docente } = await getDocenteByIdUser(user?.id);
            // console.log(docente);

            await criarAvaliacao(values, docente[0]?.iddocente);
            // await criarAvaliacao(values, 4);
            toast.success('Avaliação criada com sucesso!');
        } catch (error) {
            console.log('erro', error);
            toast.error('Erro ao salvar o plano de avaliação');
        }
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
    const [tipoAvaliacao, setTipoAvaliacao] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);

    const { values } = useFormikContext();

    const currentDocenteData = useContext(UserDataContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data: tempTeacherSubject } = await getTeacherSubjectTemporada(currentDocenteData?.idfuncionario);
                setMyDisciplinaTempora(tempTeacherSubject);

                const { data: myCourse } = await getDocenteCursos(currentDocenteData?.idfuncionario);
                setMyCourse(myCourse);

                const { data: tipoAvaliacao } = await getTiposAvaliacao();
                setTipoAvaliacao(tipoAvaliacao.filter((r) => ![3, 4, 7].includes(r.id)));

                // setTipoAvaliacao(tipoAvaliacao);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        const getAvaliacoes = async () => {
            try {
                const user = getCurrentUser();
                const { data: docente } = await getDocenteByIdUser(user?.id);

                const { data: avaliacoes } = await getTestesCriados(values.disciplina, docente[0]?.iddocente);
                // const { data: avaliacoes } = await getTestesCriados(values.disciplina, 4);
                setAvaliacoes(avaliacoes);
            } catch (error) {
                console.log(error);
            }
        };
        getAvaliacoes();
    }, [values.disciplina]);

    const filteredDisciplinas = myDisciplinaTemporada.filter((disciplina) => disciplina.idcurso === values.curso);

    const columnsAvaliacoes = [
        { field: 'id', headerName: 'Id', align: 'left', flex: 1, minWidth: 20, hide: true },
        { field: 'tipodeteste', headerName: 'Tipo de Avaliação', align: 'left', flex: 1, minWidth: 20 },
        { field: 'percentagem', headerName: 'Percentagem', align: 'left', flex: 1, minWidth: 180 },
        { field: 'descricao', headerName: 'Descrição', align: 'left', flex: 1, minWidth: 40 },
        {
            field: 'datarderealizacao',
            headerName: 'Data',
            flex: 1,
            align: 'left',
            minWidth: 40
        },
        {
            field: 'action',
            headerName: 'Acção',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== '__check__' && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    return alert(JSON.stringify(thisRow, null, 4));
                };

                return <Button onClick={onClick}>Eliminar</Button>;
            }
        }
    ];

    // const avaliacoes = [
    //     { id: 1, tipo_avaliacao: 'Teste', percentagem: '10', descricao: 'Avaliação 1', datarealizacao: '01/01/2022' },
    //     { id: 2, tipo_avaliacao: 'Teste', percentagem: '20', descricao: 'Avaliação 2', datarealizacao: '01/01/2022' },
    //     { id: 3, tipo_avaliacao: 'Trabalho', percentagem: '30', descricao: 'Avaliação 3', datarealizacao: '01/01/2022' }
    // ];

    return (
        <MainCard title="Plano de Avaliação">
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
                                <Select name="tipo_avaliacao" label="Tipo" options={tipoAvaliacao} />
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

                <Grid item xs={12}>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            autoHeight
                            disableSelectionOnClick
                            disableExtendRowFullWidth
                            columns={columnsAvaliacoes}
                            rows={avaliacoes}
                        />
                    </div>
                </Grid>
            </Grid>
        </MainCard>
    );
}
