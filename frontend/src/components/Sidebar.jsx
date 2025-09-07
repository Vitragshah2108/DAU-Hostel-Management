import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const Sidebar = ({ open, onClose, menuItems = [] }) => {
  const defaultMenu = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
    { text: 'Rooms', icon: <MeetingRoomIcon />, path: '/rooms' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
  ];

  const items = menuItems.length ? menuItems : defaultMenu;

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {items.map((item, index) => (
          <ListItem button key={index} onClick={() => window.location.href = item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
