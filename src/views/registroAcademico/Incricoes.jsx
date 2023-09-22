// import { useEffect, useState } from 'react';
// import { Button, Card, CardContent, CardHeader, Chip, Divider, Grid } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { FormikWrapper, Select } from 'components/forms';
// import { getDisciplinasNaUltimaTemporadaInscritas, getEstudantesInscritosNaUltimaTemporada, updateInscricao } from 'services/raService';

// import * as Yup from 'yup';
// import { toast } from 'react-toastify';
// import { useFormikContext } from 'formik';

// export default function Incricoes() {
//     const initialValues = {
//         disciplinas: ''
//     };

//     const validationSchema = Yup.object().shape({});

//     const onSubmit = async (values) => {};
//     return (
//         <FormikWrapper>
//             <MyForm />
//         </FormikWrapper>
//     );
// }

// function MyForm() {
//     const [estudantes, setEstudantes] = useState([]);
//     const [disciplinas, setDisciplinas] = useState([]);
//     const [currentId, setCurrentId] = useState(0);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const { data: estudantes } = await getEstudantesInscritosNaUltimaTemporada();
//                 console.log('Estuante', estudantes);
//                 setEstudantes(estudantes);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleRowClick = async (params) => {
//         const { data } = await getDisciplinasNaUltimaTemporadaInscritas(params.row.id);

//         // console.log(` "${}" clicked`);
//         setDisciplinas(data[0]?.listaDisciplinas);
//         console.log(data[0]?.listaDisciplinas);

//         setCurrentId(params.row.id);
//     };

//     const estudantesInscricoes = [
//         { field: 'id', hide: true },
//         { field: 'apelido', headerName: 'Apelido', align: 'left', flex: 1, minWidth: 120 },
//         { field: 'nome', headerName: 'Nome', align: 'left', flex: 1, minWidth: 120 },
//         { field: 'nome_curso', headerName: 'Curso', align: 'left', flex: 1 },
//         { field: 'contato', headerName: 'Contato', align: 'left', flex: 1 }
//     ];
//     const columns2 = [
//         { field: 'id', hide: true, filterable: false },
//         { field: 'disciplina', headerName: 'Disciplina', align: 'left', flex: 1, minWidth: 200 },

//         {
//             field: 'estadoiscricao',
//             headerName: 'Estado',
//             align: 'left',
//             renderCell: (row) =>
//                 row.value === 1 ? <Chip label="Confirmado" color="success" /> : <Chip label="Não Confimado" color="warning" />,
//             flex: 1,
//             minWidth: 200
//         }
//         // { field: 'curso', headerName: 'Curso', align: 'left', flex: 1 },
//         // { field: 'estado', headerName: 'Estado', align: 'left', flex: 1 }
//         // field: {'curso',align: 'left',flex: 1,hide: true},
//     ];
//     // const estudantes = [{ id: 1, apelido: 'Apelido', nome: 'Nome', curso: 'Curso', estado: 'Estado', contacto: 'Contacto' }];
//     // const disciplinas = [{ id: 1, disciplina: 'Analise', estado: 'Estado' }];
//     const { values, setFieldValue } = useFormikContext();

//     const handleSelect = (selected) => {
//         console.log(selected);
//         // setFieldValue('disciplinas', selected);
//     };
//     const handleConfirm = async () => {
//         try {
//             // if()
//             await updateInscricao(currentId);

//             toast.success('Inscrição anulada com Sucesso');
//         } catch (error) {
//             console.log(error);
//             toast.error('Erro ao Confirmar Inscrição');
//         }
//     };

//     const handleAnular = async () => {};

//     return (
//         <Card>
//             <CardHeader title="Lista de Estudantes Inscritos" titleTypographyProps={{ variant: 'h6' }} />
//             <Divider sx={{ margin: 0 }} />

//             <CardContent>
//                 <Grid container spacing={3}>
//                     <Grid item xs={6} sm={4}>
//                         <Select label="Nível" name="nivel" options={[{ value: '', label: 'Todos' }]} />
//                     </Grid>
//                     <Grid item xs={6} sm={4}>
//                         <Select label="Curso" name="curso" options={[{ value: '', label: 'Todos' }]} />
//                     </Grid>
//                     <Grid item xs={6} sm={4}>
//                         <Select label="Semestre" name="semestre" options={[{ value: '', label: 'Todos' }]} />
//                     </Grid>
//                     <Grid item xs={12} mb={8} sm={8}>
//                         <div style={{ height: 500, width: '100%' }}>
//                             <DataGrid
//                                 rows={estudantes}
//                                 onRowClick={handleRowClick}
//                                 disableColumnFilter
//                                 rowsPerPageOptions={[20, 30, 100]}
//                                 disableDensitySelector
//                                 columns={estudantesInscricoes}
//                                 components={{ Toolbar: GridToolbar }}
//                                 componentsProps={{
//                                     toolbar: {
//                                         showQuickFilter: true,
//                                         quickFilterProps: { debounceMs: 500 }
//                                     }
//                                 }}
//                             />
//                         </div>
//                     </Grid>
//                     <Grid item xs={12} md={4} sm={4}>
//                         <div style={{ width: '100%' }}>
//                             <DataGrid
//                                 rows={disciplinas}
//                                 checkboxSelection
//                                 getRowId={(row) => row.disciplina}
//                                 autoHeight
//                                 disableColumnFilters
//                                 disableColumnSelector
//                                 disableDensitySelector
//                                 hideFooterPagination
//                                 onSelectionModelChange={handleSelect}
//                                 columns={columns2}
//                             />

//                             <Button
//                                 variant="contained"
//                                 disabled={currentId === 0}
//                                 color="primary"
//                                 onClick={handleConfirm}
//                                 sx={{ mt: 2, mr: 4 }}
//                             >
//                                 Confirmar
//                             </Button>
//                             <Button variant="contained" disabled={currentId === 0} color="secondary" onClick={handleAnular} sx={{ mt: 2 }}>
//                                 Anular
//                             </Button>
//                         </div>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// }
