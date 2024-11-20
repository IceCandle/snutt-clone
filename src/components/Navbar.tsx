import { useLocation, useNavigate } from 'react-router-dom';

import evIcon from '../assets/evaluation-icon.png';
import friendsIcon from '../assets/friend-icon.png';
import mainIcon from '../assets/mainpage-icon.png';
import mypageIcon from '../assets/mypage-icon.png';
import searchIcon from '../assets/search-icon.png';

interface NavbarProps {
  selectedMenu?: 'timetable' | 'search' | 'evaluation' | 'friends' | 'mypage';
}

export const Navbar = ({ selectedMenu }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuOpacity = (menuName: NavbarProps['selectedMenu']) => {
    if (selectedMenu != null) {
      return selectedMenu === menuName ? 'opacity-100' : 'opacity-50';
    }
    const pathToMenu: Record<string, NavbarProps['selectedMenu']> = {
      '/': 'timetable',
      '/mypage': 'mypage',
    };
    return pathToMenu[location.pathname] === menuName
      ? 'opacity-100'
      : 'opacity-50';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-[30px] py-[10px]">
      <div className="max-w-[375px] mx-auto flex justify-between items-center">
        <button
          className={`flex flex-col items-center ${getMenuOpacity('timetable')}`}
          onClick={() => {
            navigate('/');
          }}
        >
          <img src={mainIcon} alt="Main" className="w-6 h-6 dark:invert" />
          <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">
            시간표
          </span>
        </button>
        <button
          className={`flex flex-col items-center ${getMenuOpacity('search')}`}
        >
          <img src={searchIcon} alt="Search" className="w-6 h-6 dark:invert" />
          <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">
            검색
          </span>
        </button>
        <button
          className={`flex flex-col items-center ${getMenuOpacity('evaluation')}`}
        >
          <img src={evIcon} alt="Events" className="w-6 h-6 dark:invert" />
          <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">
            강의평
          </span>
        </button>
        <button
          className={`flex flex-col items-center ${getMenuOpacity('friends')}`}
        >
          <img
            src={friendsIcon}
            alt="Friends"
            className="w-6 h-6 dark:invert"
          />
          <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">
            친구
          </span>
        </button>
        <button
          className={`flex flex-col items-center ${getMenuOpacity('mypage')}`}
          onClick={() => {
            navigate('/mypage');
          }}
        >
          <img src={mypageIcon} alt="My Page" className="w-6 h-6 dark:invert" />
          <span className="text-xs mt-1 text-gray-900 dark:text-gray-100">
            마이페이지
          </span>
        </button>
      </div>
    </div>
  );
};
