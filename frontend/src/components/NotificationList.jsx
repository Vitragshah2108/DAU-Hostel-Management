import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';

/**
 * NotificationList
 * Dropdown for displaying notifications.
 * @param {Array} notifications - array of notification objects { id, message, read }
 * @param {Function} onItemClick - callback when a notification is clicked
 * @param {Function} onClearAll - optional callback to clear all notifications
 */
const NotificationList = ({ notifications = [], onItemClick, onClearAll }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.length === 0 && (
          <MenuItem disabled>No new notifications</MenuItem>
        )}
        {notifications.map((n) => (
          <MenuItem key={n.id} onClick={() => { handleClose(); onItemClick && onItemClick(n); }}>
            <Typography variant={n.read ? 'body2' : 'subtitle2'}>
              {n.message}
            </Typography>
          </MenuItem>
        ))}
        {notifications.length > 0 && onClearAll && (
          <MenuItem onClick={() => { handleClose(); onClearAll(); }}>
            Clear All
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationList;


