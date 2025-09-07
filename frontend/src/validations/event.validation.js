import * as yup from 'yup';

const eventSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  description: yup.string().trim().required('Description is required'),
  date: yup.date().typeError('Invalid date').required('Date is required'),
  capacity: yup.number().typeError('Capacity must be a number').min(1).max(10000).required('Capacity is required'),
});

export default eventSchema;


