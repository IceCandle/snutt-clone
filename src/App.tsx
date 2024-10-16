import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { queryClient } from './api/api';
import { useUser } from './hooks/useUser';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (user == null) return <Navigate to="/" replace />;

  return children;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="h-screen w-screen">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/user-info"
              element={
                <ProtectedRoute>
                  <UserInfoPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
