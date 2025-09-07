import * as yup from 'yup';

const visitorPassSchema = yup.object({
  visitorName: yup.string().trim().required('Visitor name is required'),
  visitorPhone: yup.string().trim().matches(/^[0-9]{10,15}$/,'Enter valid phone').required('Visitor phone is required'),
  visitDate: yup.date().typeError('Invalid date').required('Visit date/time is required'),
  purpose: yup.string().trim().required('Purpose is required'),
});

export default visitorPassSchema;


