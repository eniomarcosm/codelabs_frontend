import { DataGrid } from '@mui/x-data-grid';
import { checkPropTypes } from 'prop-types';

export default function SelectTable({ rows, columns, ...otherProps }) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection {...otherProps} />
        </div>
    );
}

SelectTable.propTypes = {
    rows: checkPropTypes.array,
    columns: checkPropTypes.array
};
