import useAuth from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';

const App = () => {
  const { tableList, title, nickname, error, handleLogin, handleLogout, token } = useAuth();

  return (
    <div className="h-screen w-screen">
      {nickname != null ? (
        <UserInfoPage
          nickname={nickname}
          onLogout={handleLogout}
          tableList={tableList}
          title={title}
          token={token} onNicknameChange={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } }        />
      ) : (
        <LoginPage onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default App;