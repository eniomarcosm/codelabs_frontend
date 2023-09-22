import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { getContentores } from 'services/cargaService';

export default function ListarContentor() {
    const [cargas, setCargas] = useState([]);

    const columns = [
        { field: 'label', headerName: 'label', minWidth: 200, flex: 0.2 },
        { field: 'origem', headerName: 'Origem', minWidth: 180, flex: 0.3 },
        { field: 'data_chegada', headerName: 'Data de Embarque', minWidth: 120, flex: 0.2 },
        {
            field: 'qrcoderef',
            headerName: 'Referência de QR code',
            minWidth: 120,
            flex: 0.2
        },
        {
            field: 'transportador',
            headerName: 'Transportador',
            minWidth: 120,
            flex: 0.3
        }
    ];

    useEffect(() => {
        getContentores().then((resp) => setCargas(resp.data));
    }, []);

    return (
        <Card>
            <CardHeader title="Lista de Cargas" titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />

            <CardContent>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={12} sx={{ margin: '10px' }}>
                        <div style={{ height: 700, width: '100%' }}>
                            <DataGrid
                                rows={cargas}
                                disableColumnFilter
                                rowsPerPageOptions={[20, 30, 100]}
                                disableDensitySelector
                                columns={columns}
                                components={{ Toolbar: GridToolbar }}
                                componentsProps={{
                                    toolbar: {
                                        showQuickFilter: true,
                                        quickFilterProps: { debounceMs: 500 }
                                    }
                                }}
                            />
                        </div>

                        {/* <StepTable columns={columns} rows={cursos} actions /> */}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
