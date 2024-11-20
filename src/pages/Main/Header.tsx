import alarm from '../../assets/header-alarm-icon.png';
import lecturelist from '../../assets/header-lecturelist-icon.png';
import share from '../../assets/header-share-icon.png';
import toptab from '../../assets/top-tab.png';
import { useNavigation } from '../../hooks/useNavigate';

interface HeaderProps {
  totalCredit: number;
  title: string | null;
  onMenuClick: () => void;
  tableId: string;
}

export const Header = ({
  totalCredit,
  title,
  onMenuClick,
  tableId,
}: HeaderProps) => {
  const { toLectureList } = useNavigation();

  return (
    <div className="flex w-full justify-between pt-2 pb-1.5 pl-4 p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex gap-2 items-center">
        <button
          className="text-xl focus:outline-none"
          aria-label="Open Menu"
          onClick={onMenuClick}
        >
          <img src={toptab} alt="Menu" className="dark:invert" />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {`(${totalCredit} 학점)`}
        </span>
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <button
          onClick={() => {
            toLectureList(tableId);
          }}
          className="text-xs text-primary"
        >
          <img
            src={lecturelist}
            alt="강의 목록"
            className="w-6 h-6 dark:invert"
          />
        </button>
        <button className="text-xs text-primary">
          <img src={share} alt="공유" className="w-6 h-6 dark:invert" />
        </button>
        <button className="text-xs text-primary">
          <img src={alarm} alt="알림" className="w-6 h-6 dark:invert" />
        </button>
      </div>
    </div>
  );
};
