/* eslint-disable react/jsx-no-useless-fragment */
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { SubmitButton } from 'components/forms';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import Success from './Success';

export default function StepForm({ handleSteps, values, handleReset, labels, title }) {
    const [steps, setSteps] = useState(0);

    const handleNext = () => setSteps(steps + 1);
    const handleBack = () => setSteps(steps - 1);

    const { submitForm, values: value } = useFormikContext();

    const handleSubmit = () => {
        console.log(value);
        submitForm();
        handleNext();
    };
    return (
        <>
            <Card>
                <CardHeader title={title} />
                <Divider sx={{ margin: 0 }} />
                {steps === labels.length ? (
                    <Success />
                ) : (
                    <>
                        <CardContent>
                            <Stepper activeStep={steps} style={{ marginTop: 40, paddingBottomL: 40, marginBottom: 40 }} alternativeLabel>
                                {labels.map((label, index) => (
                                    <Step key={index}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {handleSteps(steps, handleNext, handleBack, values)}
                        </CardContent>
                        <Divider sx={{ marginBottom: 0 }} />
                        <CardActions>
                            {steps !== 0 && (
                                <Button variant="contained" color="secondary" onClick={handleBack} style={{ marginRight: 20 }}>
                                    Anterior
                                </Button>
                            )}
                            {steps === 0 && (
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    Próximo
                                </Button>
                            )}
                            {steps === 1 && (
                                <Button onClick={handleSubmit} variant="contained" color="primary">
                                    Cadastrar-se
                                </Button>
                            )}
                        </CardActions>
                    </>
                )}
            </Card>
        </>
    );
}
