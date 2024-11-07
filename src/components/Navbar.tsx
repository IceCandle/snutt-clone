import evIcon from '../assets/evaluation-icon.png';
import friendsIcon from '../assets/friend-icon.png';
import mainIcon from '../assets/mainpage-icon.png';
import mypageIcon from '../assets/mypage-icon.png';
import searchIcon from '../assets/search-icon.png';
import { useNavigation } from '../hooks/useNavigate';

type Menu = 'timetable' | 'mypage';

export const Navbar = ({ selectedMenu }: { selectedMenu: Menu }) => {
  const { toMain, toMypage } = useNavigation();

  const handleClickMenu = (nextMenu: Menu) => {
    switch (nextMenu) {
      case 'timetable':
        toMain();
        break;
      case 'mypage':
        toMypage();
        break;
    }
  };

  return (
    <div className="flex justify-between w-full px-[30px] py-[10px] mb-[34px]">
      <button
        className={`icon ${selectedMenu === 'timetable' ? 'selected' : ''}`}
        onClick={() => {
          handleClickMenu('timetable');
        }}
      >
        <img src={mainIcon} alt="Main" />
      </button>
      <button className="icon">
        <img src={searchIcon} alt="Search" />
      </button>
      <button className="icon">
        <img src={evIcon} alt="Events" />
      </button>
      <button className="icon">
        <img src={friendsIcon} alt="Friends" />
      </button>
      <button
        className={`icon ${selectedMenu === 'mypage' ? 'selected' : ''}`}
        onClick={() => {
          handleClickMenu('mypage');
        }}
      >
        <img src={mypageIcon} alt="My Page" />
      </button>
    </div>
  );
};
