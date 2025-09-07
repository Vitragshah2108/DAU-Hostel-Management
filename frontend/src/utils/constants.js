// Room status colors and complaint categories/statuses centralized
export const ROOM_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
};

export const ROOM_STATUS_COLORS = {
  [ROOM_STATUS.AVAILABLE]: '#4caf50',
  [ROOM_STATUS.OCCUPIED]: '#f44336',
  [ROOM_STATUS.MAINTENANCE]: '#ff9800',
};

export const COMPLAINT_CATEGORIES = ['electrical', 'plumbing', 'geyser', 'other'];

export const COMPLAINT_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default {
  ROOM_STATUS,
  ROOM_STATUS_COLORS,
  COMPLAINT_CATEGORIES,
  COMPLAINT_STATUS,
};


