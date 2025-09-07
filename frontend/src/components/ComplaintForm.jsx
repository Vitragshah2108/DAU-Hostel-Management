import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import complaintSchema from '../validations/complaint.validation';
import { COMPLAINT_CATEGORIES } from '../utils/constants';

/**
 * ComplaintForm
 * Modal form for submitting complaints.
 * @param {boolean} open
 * @param {Function} onClose
 * @param {Function} onSubmit
 */
const ComplaintForm = ({ open = false, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({ title: '', description: '', category: 'other' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await complaintSchema.validate(formData, { abortEarly: false });
      onSubmit && onSubmit(formData);
      onClose && onClose();
    } catch (err) {
      // noop; surface errors via parent Toast or integrate field-level if needed
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Submit Complaint</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          select
          label="Category"
          name="category"
          fullWidth
          margin="dense"
          value={formData.category}
          onChange={handleChange}
        >
          {COMPLAINT_CATEGORIES.map((c) => (
            <MenuItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplaintForm;


