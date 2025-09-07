import * as yup from 'yup';
import { COMPLAINT_CATEGORIES } from '../utils/constants';

const complaintSchema = yup.object({
  title: yup.string().trim().max(100, 'Max 100 characters').required('Title is required'),
  description: yup.string().trim().max(1000, 'Max 1000 characters').required('Description is required'),
  category: yup.string().oneOf(COMPLAINT_CATEGORIES).required('Category is required'),
});

export default complaintSchema;


