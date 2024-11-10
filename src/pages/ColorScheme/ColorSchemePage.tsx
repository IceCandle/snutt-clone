import { useNavigate } from 'react-router-dom';

interface ColorSchemePageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const ColorSchemePage = ({
  isDarkMode,
  onToggleTheme,
}: ColorSchemePageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button
          onClick={() => {
            navigate('/mypage');
          }}
          className="mr-4 text-gray-600 dark:text-gray-300"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold dark:text-white">화면 모드</h1>
      </div>

      <div className="p-4">
        <button
          onClick={onToggleTheme}
          className="w-full p-4 text-left bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
        >
          <span className="dark:text-white">다크 모드</span>
          <div
            className={`w-10 h-6 rounded-full p-1 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
                isDarkMode ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
