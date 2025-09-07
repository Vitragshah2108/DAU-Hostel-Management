import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * EventRegistrationForm
 * Confirmation dialog to register for an event.
 * @param {boolean} open
 * @param {Function} onClose
 * @param {Function} onSubmit
 * @param {string} eventTitle
 */
const EventRegistrationForm = ({ open = false, onClose, onSubmit, eventTitle = '' }) => {
  const handleSubmit = () => {
    onSubmit && onSubmit();
    onClose && onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register for Event</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to register for "{eventTitle}"?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventRegistrationForm;


