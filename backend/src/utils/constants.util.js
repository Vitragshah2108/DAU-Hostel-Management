const ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
};

const ROOM_STATUSES = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  ALLOCATED: 'allocated',
  MAINTENANCE: 'maintenance',
};

const COMPLAINT_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
};

const VISITOR_PASS_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

module.exports = {
  ROLES,
  ROOM_STATUSES,
  COMPLAINT_STATUSES,
  VISITOR_PASS_STATUSES,
};
