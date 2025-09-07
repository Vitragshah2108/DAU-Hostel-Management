import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import adminService from '../../services/admin.service';

const Analytics = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await adminService.getAnalytics();
        setData(res);
      } catch (err) {
        Toast.error(err?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <Card>
      <CardHeader title="Analytics" />
      <CardContent>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
      </CardContent>
    </Card>
  );
};

export default Analytics;


