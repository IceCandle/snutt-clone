import useAuth from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';

const App = () => {
  const { nickname, error, handleLogin, handleLogout } = useAuth();

  return (
    <div className="h-screen w-screen">
      {nickname != null ? (
        <UserInfoPage nickname={nickname} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default App;
