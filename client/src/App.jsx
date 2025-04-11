import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Jobs from './pages/Jobs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected Routes with Shared Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/jobs" element={<Jobs />} />
              {/* You can add more routes here like: /jobs, /settings */}
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
