import toptab from '../../assets/top-tab.png';

export const Header = ({
  totalCredit,
  title,
}: {
  totalCredit: number;
  title: string;
}) => {
  return (
    <div className="flex w-full justify-between pt-2 pb-1.5 pl-4 p-3 border-b-[1px] border-solid  border-b-lineLight">
      <div className="flex gap-2 items-center">
        <button className="text-xl focus:outline-none" aria-label="Open Menu">
          <img src={toptab} />
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
        <span className="text-xs text-gray-400">{`(${totalCredit} 학점)`}</span>
      </div>
      <div className="flex gap-2 items-center">
        {/* <span>
          <img src={list} />
        </span>
        <span>
          <img src={share} />
        </span>
        <span>
          <img src={bell} />
        </span> */}
      </div>
    </div>
  );
};
