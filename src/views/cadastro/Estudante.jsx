// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
// import { maxWidth } from '@mui/system';
// import { FormikWrapper } from 'components/forms';
// import DateField from 'components/forms/DateField';
// import InputField from 'components/forms/InputField';
// import SelectField from 'components/forms/SelectField';
// import StepForm from 'components/stepForm/StepForm';
// import { getDistritos, getDocumentos, getEstadoCivis, getGrausAcademicos, getPaises, getProvincias } from 'services/comumService';
// import AuthCardWrapper from 'views/pages/authentication/AuthWrapper1';

// import * as Yup from 'yup';
// import { getCursos } from 'services/cursoService';
// import { useFormikContext } from 'formik';
// import { sendConfirmSignupEmail } from 'services/emailService';
// import { toast } from 'react-toastify';
// import { saveEstudante } from 'services/estudanteService';

// export default function Estudante() {
//     const initialValues = {
//         emissao: new Date(''),
//         validade: new Date(''),
//         data_nasc: new Date('')
//     };
//     const validationSchema = Yup.object().shape({
//         nome: Yup.string().required('Nome é obrigatório'),
//         apelido: Yup.string().required('Apelido é obrigatório'),
//         nome_pai: Yup.string(),
//         nome_mae: Yup.string(),
//         morada: Yup.string(),
//         data_nasc: Yup.date().required('Data de Nascimento é obrigatória'),
//         naturalidade: Yup.string(),
//         prov_naturalidade: Yup.string(),
//         nacionalidade: Yup.string(),
//         sexo: Yup.string(),
//         email: Yup.string().email('Email inválido').required('Email é obrigatório'),
//         contato_emergencia: Yup.string(),
//         contato: Yup.string(),
//         estado_civil: Yup.number(),
//         grau: Yup.number(),
//         ano_ingresso: Yup.number(),
//         escola_ensino: Yup.string(),
//         nota_final: Yup.number(),
//         especialidade_ensino: Yup.string(),
//         provincia_ensino: Yup.number(),
//         curso: Yup.number(),
//         iddoc_identifica: Yup.number(),
//         nr: Yup.string(),
//         emissao: Yup.date(),
//         validade: Yup.date()
//     });

//     const onSubmit = async (values) => {
//         try {
//             const { data } = await sendConfirmSignupEmail(values);
//             toast.success('Email enviado!');
//             console.log('email', data);
//             await saveEstudante(values);
//             toast.success('Cadastrado com sucesso confirme o Email!');
//         } catch (error) {
//             console.log(error);
//             toast.error('Erro ao cadastrar');
//         }
//     };

//     return (
//         <FormikWrapper validateOnChange={false} validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
//             <MyForm />
//         </FormikWrapper>
//     );
// }

// function MyForm() {
//     // eslint-disable-next-line consistent-return
//     const handleSteps = (step) => {
//         switch (step) {
//             case 0:
//                 return <Step1 />;
//             case 1:
//                 // return <Step3 />;
//                 return <Step2 />;
//             // case 2:
//             default:
//                 break;
//         }
//     };

//     const labels = ['Dados Pessoais', 'Dados Académicos'];

//     return (
//         <AuthCardWrapper>
//             <Grid container justifyContent="center" sx={{ minHeight: '100vh' }}>
//                 <Grid
//                     container
//                     justifyContent="center"
//                     alignItems="center"
//                     sx={{ minHeight: 'calc(100vh - 68px)', width: 'calc(120vh - 68px)' }}
//                 >
//                     <StepForm handleSteps={handleSteps} labels={labels} title="Formulário de Cadastro de Estudante" />
//                 </Grid>
//             </Grid>
//         </AuthCardWrapper>
//     );
// }

// // nome:Marcia
// // apelido:Makumbi
// // nome_pai:Makumbi Joao
// // nome_mae:Joana txuva
// // morada:Beira, Matacuane
// // data_nasc:2000-03-05
// // naturalidade:1
// // prov_naturalidade:2
// // nacionalidade:1
// // sexo:F
// // email:marcia@gmai.com
// // contato_emergencia:845555555
// // contato:846666666
// // estado_civil:1
// // ano_ingresso:2022
// // grau:1
// // escola_ensino:Escola Secundaria Sansao Mutemba
// // nota_final:12
// // especialidade_ensino:SNM
// // provincia_ensino:5
// // iddoc_identifica:1
// // nr:012456789
// // emissao:2019-12-12
// // validade:2024-12-12
// // curso:7
// const sexos = [
//     { id: 'M', label: 'Masculino' },
//     { id: 'F', label: 'Feminino' }
// ];

// function Step1() {
//     const [pais, setPais] = useState([]);
//     const [distrito, setDistrito] = useState([]);
//     const [provincia, setProvincia] = useState([]);
//     const [tipoId, setTipoId] = useState([]);
//     const [notMz, setNotMz] = useState(true);
//     const [isDistrito, setIsDistrito] = useState(true);
//     const [estadoCivil, setEstadoCivil] = useState([]);

//     const { values } = useFormikContext();

//     useEffect(() => {
//         const getDados = async () => {
//             try {
//                 const { data: paises } = await getPaises();
//                 setPais(paises);

//                 const { data: tipoId } = await getDocumentos();
//                 setTipoId(tipoId);

//                 const { data: estadoCivis } = await getEstadoCivis();
//                 setEstadoCivil(estadoCivis);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         getDados();
//     }, []);

//     useEffect(() => {
//         const getMyProvincias = async () => {
//             if (values.nacionalidade === 1) {
//                 try {
//                     const { data: provincias } = await getProvincias();
//                     setProvincia(provincias);

//                     setNotMz(false);
//                 } catch (error) {
//                     console.error(error);
//                 }
//             } else {
//                 setNotMz(true);
//             }
//         };

//         getMyProvincias();
//     }, [values.nacionalidade]);

//     useEffect(() => {
//         const getMyDistritos = async () => {
//             if (!values.prov_naturalidade || values.prov_naturalidade === 0) {
//                 setIsDistrito(true);
//                 return;
//             }
//             try {
//                 const { data: distritos } = await getDistritos(values.prov_naturalidade);
//                 setDistrito(distritos);
//                 setIsDistrito(false);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         getMyDistritos();
//     }, [values.prov_naturalidade]);

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="nome" label="Nome" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="apelido" label="Apelido" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <SelectField name="sexo" label="Sexo" options={sexos} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="email" type="email" label="E-mail Pessoal" />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//                 <InputField name="nome_pai" label="Nome do Pai" />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//                 <InputField name="nome_mae" label="Nome da Mãe" />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//                 <DateField name="data_nasc" label="Data de Nascimento" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="morada" label="Morada" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="contato" label="Contacto" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="contato_emergencia" label="Contacto de Emergência" />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//                 <SelectField name="nacionalidade" label="Nacionalidade" options={pais} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <SelectField name="prov_naturalidade" label="Provincia de Nascimento" disabled={notMz} options={provincia} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <SelectField name="naturalidade" label="Naturalidade" disabled={isDistrito} options={distrito} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <SelectField name="estado_civil" label="Estado Civil" options={estadoCivil} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//                 <SelectField name="iddoc_identifica" label="Tipo de Documento de Identificação" options={tipoId} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//                 <InputField name="nr" label="Número do Documento" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <DateField name="emissao" label="Data de Emissão" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <DateField name="validade" label="Data de Validade" />
//             </Grid>
//         </Grid>
//     );
// }

// function Step2() {
//     const [provincia, setProvincia] = useState([]);
//     const [curso, setCurso] = useState([]);
//     const [filteredCursos, setFilteredCursos] = useState([]);
//     const [grauAcademico, setGrauAcademico] = useState([]);

//     const { values } = useFormikContext();
//     useEffect(() => {
//         const getDados = async () => {
//             try {
//                 const { data: provincia } = await getProvincias();
//                 setProvincia(provincia);

//                 const { data: cursos } = await getCursos();
//                 setCurso(cursos);

//                 const { data: grauAcademico } = await getGrausAcademicos();
//                 setGrauAcademico(grauAcademico);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         getDados();
//     }, []);

//     useEffect(() => {
//         setFilteredCursos(curso.filter((cursos) => cursos.grau === values.grau));
//     }, [values.grau]);

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//                 <SelectField name="grau" label="Grau Académico" options={grauAcademico} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <SelectField name="curso" label="Curso" options={filteredCursos} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="ano_ingresso" type="number" label="Ano de Ingresso" />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//                 <InputField name="escola_ensino" label="Instituição de Ensino do Grau Anterior" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="nota_final" type="number" label="Nota Final" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <InputField name="especialidade_ensino" label="Especialidade de Ensino" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <SelectField name="provincia_ensino" label="Provincia de Ensino" options={provincia} />
//             </Grid>
//         </Grid>
//     );
// }

// function Step3() {
//     const { values } = useFormikContext();
//     return (
//         <List disablePadding>
//             <Grid container spacing={2}>
//                 {/* <Divider sx={{ marginBottom: 0, width: 200 }} /> */}
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome Completo" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>

//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome do Pai" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>

//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome da Mãe" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Morada" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Data de Nascimento" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome Completo" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome Completo" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome Completo" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome Completo" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome Completo" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome Completo" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 <Grid item xs={12} sm={3}>
//                     <ListItem>
//                         <ListItemText primary="Nome Completo" secondary={`${values.nome} ${values.apelido}` || 'Not Provided'} />
//                     </ListItem>
//                 </Grid>
//                 <Divider />
//                 {/*
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//             <Button sx={{ mr: 1 }} onClick={handleBack}>
//             Back
//             </Button>
//             <Button variant="contained" color="success" onClick={handleSubmit}>
//             Confirm & Continue
//             </Button>
//         </Box> */}
//             </Grid>
//         </List>
//     );
// }
