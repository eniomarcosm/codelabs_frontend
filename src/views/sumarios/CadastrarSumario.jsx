// import { useState, useEffect, useContext } from 'react';

// // ** MUI Imports
// import { Card, Grid, Divider, CardHeader, CardContent, CardActions } from '@mui/material';

// import * as Yup from 'yup';

// import { FormikWrapper, ResetButton, Input, Select, SubmitButton, TimeInput, DateInput } from 'components/forms';
// import { toast } from 'react-toastify';
// import { setSumario } from 'services/disciplinaService';
// import { getTeacherSubjectTemporada } from 'services/docenteService';
// import UserDataContext from 'context/userDataContext';
// import { getDocenteCursos } from 'services/cursoDocente';
// import { useFormikContext } from 'formik';

// export default function CadastrarSumario() {
//     // Validation
//     const validationSchema = Yup.object().shape({
//         tipo_aula: Yup.string().required('O tipo de aula é obrigatório'),
//         // horainicio: Yup.string().required('A hora de início é obrigatória'),
//         // horafim: Yup.string().required('A hora de término é obrigatória'),
//         tema_aula: Yup.string().required('O tema da aula é obrigatório'),
//         bibliografia: Yup.string(),
//         data: Yup.date('Data inválida!').required('A data da aula é obrigatória'),
//         disciplina: Yup.number(),
//         leciona: Yup.number()
//     });

//     const initialValues = {
//         id: '',
//         tipo_aula: '',
//         horainicio: new Date(''),
//         data: new Date(''),
//         horafim: new Date(''),
//         tema_aula: '',
//         bibliografia: '',
//         disciplina: ''
//     };

//     // End example data
//     const onSubmit = async (values) => {
//         try {
//             await setSumario(values);
//             toast.success('Dados carregados com sucesso!');
//         } catch (error) {
//             toast.error('Erro ao carregar sumário!');
//         }
//     };
//     return (
//         <FormikWrapper validateOnChange={false} validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
//             <MyForm />
//         </FormikWrapper>
//     );
// }

// // Examples of data

// function MyForm() {
//     const [myDisciplinaTemporada, setMyDisciplinaTempora] = useState([]);
//     const [myCourse, setMyCourse] = useState([]);

//     const currentDocenteData = useContext(UserDataContext);
//     const { values, setFieldValue } = useFormikContext();

//     const getData = async () => {
//         try {
//             const { data: tempTeacherSubject } = await getTeacherSubjectTemporada(currentDocenteData?.idfuncionario);
//             setMyDisciplinaTempora(tempTeacherSubject);

//             const { data: myCourse } = await getDocenteCursos(currentDocenteData?.idfuncionario);
//             setMyCourse(myCourse);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     useEffect(() => {
//         const filteredLeciona = myDisciplinaTemporada.filter((disciplina) => disciplina.id === values.disciplina);

//         setFieldValue('leciona', filteredLeciona[0]?.idleciona);
//     }, [values.disciplina]);

//     const tipoAula = [
//         { id: 'Teoria', label: 'Aula Teórica' },
//         { id: 'Pratica', label: 'Aula Prática' }
//     ];

//     const filteredDisciplinas = myDisciplinaTemporada.filter((disciplina) => disciplina.idcurso === values.curso);

//     return (
//         <Card>
//             <CardHeader title="Formulário de Cadastro de Sumario" titleTypographyProps={{ variant: 'h6' }} />

//             <Divider sx={{ margin: 0 }} />
//             <CardContent>
//                 <Grid container spacing={5}>
//                     <Grid item xs={12} sm={4}>
//                         <Select name="curso" label="Selecione o Curso" options={myCourse} />
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                         <Select required name="disciplina" label="Disciplina" options={filteredDisciplinas} />
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                         <Select required name="tipo_aula" label="Tipo de Aula" options={tipoAula} />
//                     </Grid>

//                     <Grid item xs={12} sm={12}>
//                         <Divider flexItem />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                         <Input required multiline rows={5} name="tema_aula" label="Tema da Aula" />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <Input multiline rows={5} label="Referências Bibliográficas" name="bibliografia" />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <DateInput required name="data" label="Data da Aula" />
//                     </Grid>

//                     <Grid item xs={6} sm={3}>
//                         <TimeInput label="Hora de Início" name="horainicio" />
//                     </Grid>

//                     <Grid item xs={6} sm={3}>
//                         <TimeInput label="Hora de Término" name="horafim" />
//                     </Grid>
//                 </Grid>
//             </CardContent>
//             <Divider sx={{ margin: 0 }} />
//             <CardActions>
//                 <SubmitButton mr={2} size="large">
//                     Guardar
//                 </SubmitButton>

//                 <ResetButton size="large" color="secondary">
//                     Limpar
//                 </ResetButton>
//             </CardActions>
//         </Card>
//     );
// }
