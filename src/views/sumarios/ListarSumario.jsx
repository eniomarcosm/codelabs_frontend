// import { useContext, useEffect, useState } from 'react';
// import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
// import { ExpandCircleDown } from '@mui/icons-material';
// import * as Yup from 'yup';

// import { FormikWrapper, Select } from 'components/forms';
// import { useFormikContext } from 'formik';
// import { getTeacherSubjectTemporada } from 'services/docenteService';
// import { getDocenteCursos } from 'services/cursoDocente';
// import UserDataContext from 'context/userDataContext';
// // import { getSumariosDisciplinaAnoLectivo } from 'services/sumarioService';

// const cursos = [
//     { capitulo: 'Capitulo 1', sumario: 'Introdução ao Estudo da Informática' },
//     { capitulo: 'Capitulo 2', sumario: 'Historial do computador' }
// ];
// const columns = [
//     { id: 'capitulo', label: 'Capitulo' },
//     { id: 'sumario', label: 'Tópico' }
// ];

// export default function ListarSumario() {
//     const initialValues = {
//         ano: '',
//         curso: '',
//         semestre: '',
//         disciplina: ''
//     };

//     const validationSchema = Yup.object().shape({
//         ano: Yup.number(),
//         curso: Yup.number(),
//         semetre: Yup.number(),
//         disciplina: Yup.number()
//     });

//     const onSubmit = (values) => {
//         alert(JSON.stringify(values, null, 2));
//     };

//     return (
//         <FormikWrapper onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
//             <MyForm />
//         </FormikWrapper>
//     );
// }

// function MyForm() {
//     const [myDisciplinaTemporada, setMyDisciplinaTempora] = useState([]);
//     const [myCourse, setMyCourse] = useState([]);
//     const [sumarios, setSumarios] = useState([]);

//     const currentDocenteData = useContext(UserDataContext);
//     const { values } = useFormikContext();

//     const getData = async () => {
//         try {
//             const { data: tempTeacherSubject } = await getTeacherSubjectTemporada(currentDocenteData?.idfuncionario);
//             setMyDisciplinaTempora(tempTeacherSubject);

//             const { data: myCourse } = await getDocenteCursos(currentDocenteData?.idfuncionario);
//             setMyCourse(myCourse);

//             console.log(myCourse);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     const getSumarios = async () => {
//         // const { data: sumarios } = await getSumariosDisciplinaAnoLectivo(values.disciplina);
//         // console.log(sumarios);
//         setSumarios(sumarios);
//     };

//     useEffect(() => {
//         try {
//             getSumarios();
//         } catch (error) {
//             console.log(error);
//         }
//     }, [values.disciplina]);

//     const filteredDisciplinas = myDisciplinaTemporada.filter((disciplina) => disciplina.idcurso === values.curso);

//     function formatDate(date) {
//         return date.toISOString().slice(0, 19).replace('T', ' ');
//     }

//     return (
//         <Card>
//             <CardHeader title="Sumários da Disciplina" titleTypographyProps={{ variant: 'h6' }} />
//             <Divider sx={{ margin: 0 }} />

//             <CardContent>
//                 <Grid container spacing={3}>
//                     {/* <Grid item xs={6} sm={3}>
//                             <Select
//                                 name="ano"
//                                 label="Ano"
//                                 options={[
//                                     { id: 1, label: 2020 },
//                                     { id: 2, label: 2021 },
//                                     { id: 3, label: 2022 }
//                                 ]}
//                             />
//                         </Grid> */}
//                     {/* <Grid item xs={6} sm={3}>
//                             <Select
//                                 name="semestre"
//                                 label="Semestre"
//                                 options={[
//                                     { id: 1, label: 'I Semestre' },
//                                     { id: 2, label: 'II Semestre' }
//                                 ]}
//                             />
//                         </Grid> */}
//                     <Grid item xs={6} sm={6}>
//                         <Select name="curso" label="Selecione o Curso" options={myCourse} />
//                     </Grid>
//                     <Grid item xs={6} sm={6}>
//                         {/* <Select
//                                 name="disciplina"
//                                 label="Disciplina"
//                                 options={[
//                                     { id: 1, label: 'Fisica I' },
//                                     { id: 2, label: 'Analise Matematica 1' },
//                                     { id: 3, label: 'Algebra' }
//                                 ]}
//                             /> */}
//                         <Select required name="disciplina" label="Disciplina" options={filteredDisciplinas} />
//                     </Grid>
//                     {sumarios && (
//                         <Grid item xs={12} sm={12}>
//                             {sumarios.map((c) => (
//                                 <Accordion>
//                                     <AccordionSummary expandIcon={<ExpandCircleDown />} aria-controls="panel1a-content" id="panel1a-header">
//                                         <Typography sx={{ width: '33%', flexShrink: 0 }}>{c.tema_aula}</Typography>
//                                         <Typography sx={{ color: 'text.secondary', alignContent: 'right', alignItems: 'right' }}>
//                                             Tipo de Aula: {c.tipo_aula}, Data: {c.data}
//                                         </Typography>
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <Typography>Hora de Início: {c.horainicio}</Typography>
//                                         <Typography>Hora de Fim: {c.horafim}</Typography>
//                                         <Typography>Referências Bibliográficas: {c.bibliografia}</Typography>
//                                     </AccordionDetails>
//                                 </Accordion>
//                             ))}
//                         </Grid>
//                     )}
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// }
