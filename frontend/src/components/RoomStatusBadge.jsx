import React from 'react';
import Chip from '@mui/material/Chip';

/**
 * RoomStatusBadge
 * Shows a badge for room status.
 * @param {string} status - available | pending | allocated | maintenance
 */
const RoomStatusBadge = ({ status = 'available' }) => {
  const statusColors = {
    available: 'success',
    pending: 'warning',
    allocated: 'error',
    maintenance: 'default',
  };

  return <Chip label={status} color={statusColors[status] || 'default'} size="small" />;
};

export default RoomStatusBadge;


