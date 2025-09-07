import React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/**
 * ProfileMenu
 * Dropdown for user profile actions.
 * @param {Object} user - current logged-in user { name, email, avatar }
 * @param {Function} onLogout - callback to log out
 * @param {Function} onSettings - optional callback for settings
 */
const ProfileMenu = ({ user, onLogout, onSettings }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar alt={user?.name || 'User'} src={user?.avatar || ''} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem disabled>{user?.name || 'Unknown User'}</MenuItem>
        {onSettings && <MenuItem onClick={() => { handleClose(); onSettings(); }}>Settings</MenuItem>}
        <MenuItem onClick={() => { handleClose(); onLogout && onLogout(); }}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;


