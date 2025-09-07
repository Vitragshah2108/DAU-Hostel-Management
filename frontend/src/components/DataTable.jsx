import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ rows, columns, pageSize = 5 }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
