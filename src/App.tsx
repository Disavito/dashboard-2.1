import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import People from './pages/People';
import Accounts from './pages/Accounts';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Settings from './pages/Settings';
import AuthPage from './pages/Auth';
import AccountDetails from './pages/AccountDetails';
import PartnerDocuments from './pages/PartnerDocuments';
import { useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user && window.location.pathname !== '/auth') {
        navigate('/auth');
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user && window.location.pathname !== '/auth') {
        navigate('/auth');
      } else if (session?.user && window.location.pathname === '/auth') {
        navigate('/');
      }
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        
        {/* Rutas protegidas usando resourcePath */}
        <Route element={<ProtectedRoute resourcePath="/people" />}>
          <Route path="people" element={<People />} />
        </Route>
        <Route element={<ProtectedRoute resourcePath="/partner-documents" />}>
          <Route path="partner-documents" element={<PartnerDocuments />} />
        </Route>

        <Route element={<ProtectedRoute resourcePath="/accounts" />}>
          <Route path="accounts" element={<Accounts />} />
          <Route path="accounts/:id" element={<AccountDetails />} />
        </Route>
        <Route element={<ProtectedRoute resourcePath="/expenses" />}>
          <Route path="expenses" element={<Expenses />} />
        </Route>
        <Route element={<ProtectedRoute resourcePath="/income" />}>
          <Route path="income" element={<Income />} />
        </Route>
        
        <Route element={<ProtectedRoute resourcePath="/settings" />}>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
