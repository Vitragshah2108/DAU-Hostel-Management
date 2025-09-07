// Thin wrapper to match naming: re-export from hostel-event.service
import hostelEventService from './hostel-event.service';

const eventService = {
  getAll: hostelEventService.getAll,
  create: hostelEventService.create,
  register: hostelEventService.registerForEvent,
};

export default eventService;


