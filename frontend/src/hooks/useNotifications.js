import { useEffect, useState } from 'react';
import notificationService from '../services/notification.service';
import Toast from '../components/Toast';

const useNotifications = (pollMs = 60000) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNow = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getMyNotifications();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNow();
    if (!pollMs) return;
    const id = setInterval(fetchNow, pollMs);
    return () => clearInterval(id);
  }, [pollMs]);

  return { items, loading, refetch: fetchNow };
};

export default useNotifications;


