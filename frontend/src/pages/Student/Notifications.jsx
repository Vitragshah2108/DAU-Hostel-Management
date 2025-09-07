import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import StudentLayout from '../../layouts/StudentLayout';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import notificationService from '../../services/notification.service';

/**
 * Notifications Page
 * Displays hostel/system notifications.
 */

const Notifications = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await notificationService.getMyNotifications();
        setItems(data);
      } catch (err) {
        Toast.error(err?.message || 'Failed to load notifications');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <StudentLayout title="Notifications">
      {loading ? <Loader /> : (
        <Card>
          <CardHeader title="Announcements" />
          <CardContent>
            <List>
              {items.map((n) => (
                <ListItem key={n.id} divider>
                  <ListItemText primary={n.message} secondary={n.read ? 'Read' : 'Unread'} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </StudentLayout>
  );
};

export default Notifications;


