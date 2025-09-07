import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ROOM_STATUS_COLORS } from '../utils/constants';

/**
 * RoomGrid
 * Displays a grid of rooms with color-coded statuses.
 * @param {Array} rooms - array of room objects { id, roomNumber, wing, status, occupants }
 * @param {Function} onRoomClick - callback when a room is clicked
 */
const RoomGrid = ({ rooms = [], onRoomClick }) => {
  return (
    <Grid container spacing={2}>
      {rooms.map((room) => (
        <Grid item xs={6} sm={4} md={3} key={room.id}>
          <Tooltip title={`Wing: ${room.wing} | Occupants: ${room.occupants?.length || 0}`}>
            <Paper
              sx={{
                padding: 2,
                textAlign: 'center',
                backgroundColor: ROOM_STATUS_COLORS[room.status?.toUpperCase?.()] || '#f5f5f5',
                cursor: onRoomClick ? 'pointer' : 'default',
              }}
              onClick={() => onRoomClick && onRoomClick(room)}
            >
              <Typography variant="h6">{room.roomNumber}</Typography>
              <Typography variant="caption">{room.status?.toUpperCase?.() || ''}</Typography>
            </Paper>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomGrid;


