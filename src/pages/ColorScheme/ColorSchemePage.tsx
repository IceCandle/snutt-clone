import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../contexts/ThemeContext';

export const ColorSchemePage = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col h-screen max-w-[375px] mx-auto bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button
          onClick={() => {
            navigate('/mypage');
          }}
          className="mr-4 text-gray-600 dark:text-gray-300"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold dark:text-white">화이트 모드</h1>
      </div>

      <div className="p-4">
        <button
          onClick={toggleTheme}
          className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
        >
          <span className="text-gray-900 dark:text-white">다크 모드</span>
          <div
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${
              isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
