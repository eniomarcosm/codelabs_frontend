/* eslint-disable array-callback-return */
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Table,
    TableContainer,
    TableRow,
    TableCell,
    tableCellClasses,
    TableHead,
    Paper,
    TableBody
} from '@mui/material';
import { FormikWrapper, Select } from 'components/forms';
import UserDataContext from 'context/userDataContext';
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { getDisciplinasInscritasConfirmadasNaTemporada, getEstudanteNotasTemporada } from 'services/estudanteService';

export default function PautaEstudante() {
    const initialValues = {
        disciplina: ''
    };

    return (
        <FormikWrapper initialValues={initialValues}>
            <Form />
        </FormikWrapper>
    );
}

function Form() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [notas, setNotas] = useState([]);

    const currentEstudanteData = useContext(UserDataContext);
    const { values } = useFormikContext();

    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const { data } = await getDisciplinasInscritasConfirmadasNaTemporada(currentEstudanteData?.idestudante);
                setDisciplinas(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDisciplinas();
    }, []);

    useEffect(() => {
        if (values.disciplina) {
            const fetchNotasCadeiras = async () => {
                try {
                    const { data } = await getEstudanteNotasTemporada(currentEstudanteData?.idusuario, values.disciplina);
                    setNotas(data);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchNotasCadeiras();
        }
    }, [values.disciplina]);

    // useEffect(() => {}, [disciplinas]);
    const filteredDisciplinas = disciplinas.filter((disciplina) => disciplina.idcurso === values.curso);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Pauta Semestral" titleTypographyProps={{ variant: 'h6' }} />
                    <Divider sx={{ marginBottom: 0 }} />

                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Select label="Disciplinas" name="disciplina" options={filteredDisciplinas} />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ marginBottom: 0 }} />
                            </Grid>

                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Descrição</StyledTableCell>
                                                <StyledTableCell>Nota</StyledTableCell>
                                                <StyledTableCell>Percentagem</StyledTableCell>
                                                <StyledTableCell>Tipo</StyledTableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {notas?.avaliacoes?.map((avaliacao, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>{avaliacao.descricao}</StyledTableCell>
                                                    <StyledTableCell>{avaliacao.nota}</StyledTableCell>
                                                    <StyledTableCell>{avaliacao.percentagem}%</StyledTableCell>
                                                    <StyledTableCell>{avaliacao.avaliacao}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                            {notas?.media_frequencia && (
                                                <StyledTableRow>
                                                    <StyledTableCell colSpan={1}>Media Frequência</StyledTableCell>
                                                    <StyledTableCell align="rigth">{notas.media_frequencia}</StyledTableCell>
                                                </StyledTableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
