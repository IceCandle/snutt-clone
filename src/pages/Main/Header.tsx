import toptab from '../../assets/top-tab.png';

interface HeaderProps {
  totalCredit: number;
  title: string | null;
  onMenuClick: () => void;
}

export const Header = ({ totalCredit, title, onMenuClick }: HeaderProps) => {
  return (
    <div className="flex w-full justify-between pt-2 pb-1.5 pl-4 p-3 border-b-[1px] border-solid border-b-lineLight">
      <div className="flex gap-2 items-center">
        <button
          className="text-xl focus:outline-none"
          aria-label="Open Menu"
          onClick={onMenuClick}
        >
          <img src={toptab} alt="Menu" />
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
        <span className="text-xs text-gray-400">{`(${totalCredit} 학점)`}</span>
      </div>
      <div className="flex gap-2 items-center"></div>
    </div>
  );
};
