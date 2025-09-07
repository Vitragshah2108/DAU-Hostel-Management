import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StudentLayout from '../../layouts/StudentLayout';
import RoomGrid from '../../components/RoomGrid';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import roomService from '../../services/room.service';

/**
 * RoomSelection
 * Shows rooms and lets student submit a room request.
 */

const RoomSelection = () => {
  const [loading, setLoading] = React.useState(true);
  const [rooms, setRooms] = React.useState([]);
  const [currentStatus, setCurrentStatus] = React.useState(null);
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const [list, myRequests] = await Promise.all([
        roomService.getRooms(),
        roomService.getMyRequests(),
      ]);
      setRooms(list);
      const latest = Array.isArray(myRequests) && myRequests.length > 0 ? myRequests[0] : null;
      setCurrentStatus(latest ? { status: latest.status, roomNumber: latest.room?.roomNumber } : null);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const handleConfirm = async () => {
    try {
      await roomService.createRequest(selectedRoom.id);
      Toast.success('Room request submitted');
      setSelectedRoom(null);
      load();
    } catch (err) {
      Toast.error(err?.message || 'Failed to submit request');
    }
  };

  return (
    <StudentLayout title="Room Selection">
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentStatus ? (
            <Typography sx={{ mb: 2 }} variant="body2">Current request: {currentStatus.status} {currentStatus.roomNumber ? `for ${currentStatus.roomNumber}` : ''}</Typography>
          ) : null}
          <RoomGrid rooms={rooms} onRoomClick={setSelectedRoom} />

          <Dialog open={!!selectedRoom} onClose={() => setSelectedRoom(null)}>
            <DialogTitle>Request Room</DialogTitle>
            <DialogContent>
              <Typography>Do you want to request room {selectedRoom?.roomNumber}?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedRoom(null)}>Cancel</Button>
              <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </StudentLayout>
  );
};

export default RoomSelection;


