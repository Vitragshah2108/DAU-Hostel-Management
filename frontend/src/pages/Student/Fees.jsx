import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StudentLayout from '../../layouts/StudentLayout';
import DataTable from '../../components/DataTable';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import feeService from '../../services/fee.service';

/**
 * Fees Page
 * Shows due fees and payment history.
 */

const Fees = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await feeService.getMyFees();
      setData(res);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load fees');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []);

  const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'status', headerName: 'Status' },
  ];

  return (
    <StudentLayout title="Fees">
      {loading ? <Loader /> : (
        <>
          <Card sx={{ mb: 2 }}>
            <CardHeader title="Due Amount" />
            <CardContent>
              <Typography variant="h6">₹ {data?.dueAmount ?? 0}</Typography>
              <Box sx={{ mt: 1 }}>
                <Button variant="contained" disabled={(data?.dueAmount ?? 0) <= 0} onClick={() => Toast.info('Payment flow TODO')}>Pay Now</Button>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Payment History" />
            <CardContent>
              <DataTable rows={data?.history || []} columns={columns} getRowId={(r) => r.id} />
            </CardContent>
          </Card>
        </>
      )}
    </StudentLayout>
  );
};

export default Fees;


