import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import { ADMIN, STUDENT } from './utils/roles';
import AuthLayout from './layouts/AuthLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/Shared/NotFound';
import Profile from './pages/Shared/Profile';
import StudentDashboard from './pages/Student/StudentDashboard';
import RoomSelection from './pages/Student/RoomSelection';
import Fees from './pages/Student/Fees';
import Complaints from './pages/Student/Complaints';
import VisitorPass from './pages/Student/VisitorPass';
import HostelEvents from './pages/Student/HostelEvents';
import LostFound from './pages/Student/LostFound';
import Notifications from './pages/Student/Notifications';
import LeaveRequest from './pages/Student/LeaveRequest';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RoomManagement from './pages/Admin/RoomManagement';
import RoomRequests from './pages/Admin/RoomRequests';
import FeeManagement from './pages/Admin/FeeManagement';
import ComplaintManagement from './pages/Admin/ComplaintManagement';
import VisitorPassManagement from './pages/Admin/VisitorPassManagement';
import HostelEventManagement from './pages/Admin/HostelEventManagement';
import LostFoundManagement from './pages/Admin/LostFoundManagement';
import Announcements from './pages/Admin/Announcements';
import Analytics from './pages/Admin/Analytics';

const App = () => (
  <>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<RoleRoute allowedRoles={[STUDENT]} redirectTo="/login" />}> 
        <Route element={<StudentLayout />}> 
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/rooms" element={<RoomSelection />} />
          <Route path="/student/fees" element={<Fees />} />
          <Route path="/student/complaints" element={<Complaints />} />
          <Route path="/student/visitor-pass" element={<VisitorPass />} />
          <Route path="/student/events" element={<HostelEvents />} />
          <Route path="/student/lost-found" element={<LostFound />} />
          <Route path="/student/notifications" element={<Notifications />} />
          <Route path="/student/leave" element={<LeaveRequest />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<RoleRoute allowedRoles={[ADMIN]} redirectTo="/login" />}> 
        <Route element={<AdminLayout />}> 
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<RoomManagement />} />
          <Route path="/admin/room-requests" element={<RoomRequests />} />
          <Route path="/admin/fees" element={<FeeManagement />} />
          <Route path="/admin/complaints" element={<ComplaintManagement />} />
          <Route path="/admin/visitor-passes" element={<VisitorPassManagement />} />
          <Route path="/admin/hostel-events" element={<HostelEventManagement />} />
          <Route path="/admin/lost-found" element={<LostFoundManagement />} />
          <Route path="/admin/announcements" element={<Announcements />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;


