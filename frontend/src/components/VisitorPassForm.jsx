import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import visitorPassSchema from '../validations/visitor-pass.validation';
import { formatDate } from '../utils/formatDate';

/**
 * VisitorPassForm
 * Modal form to request a visitor pass.
 * @param {boolean} open
 * @param {Function} onClose
 * @param {Function} onSubmit
 */
const VisitorPassForm = ({ open = false, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({ visitorName: '', visitorPhone: '', visitDate: '', purpose: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await visitorPassSchema.validate(formData, { abortEarly: false });
      onSubmit && onSubmit(formData);
      onClose && onClose();
    } catch (err) {
      // noop; parent can show Toast
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Request Visitor Pass</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Visitor Name" name="visitorName" fullWidth value={formData.visitorName} onChange={handleChange} />
        <TextField margin="dense" label="Visitor Phone" name="visitorPhone" fullWidth value={formData.visitorPhone} onChange={handleChange} />
        <TextField margin="dense" type="datetime-local" label="Visit Date & Time" name="visitDate" fullWidth InputLabelProps={{ shrink: true }} value={formData.visitDate} onChange={handleChange} />
        <TextField margin="dense" label="Purpose" name="purpose" fullWidth value={formData.purpose} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VisitorPassForm;


