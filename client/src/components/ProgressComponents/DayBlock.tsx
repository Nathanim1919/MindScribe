export const DayBlock = ({
  day,
  month,
  year,
}: {
  day: number;
  month: string;
  year: number;
}) => {
  const tooltip = `${month} ${day}, ${year}`;
  return (
    <div className="w-4 h-4 group relative rounded cursor-pointer bg-gray-200 dark:bg-dark-200 hover:bg-dark-300">
      <span className="absolute hidden group-hover:grid border border-dark-200 bg-black z-999 text-[12px] -top-4 left-0 text-white  place-items-center w-[120px]">
        {tooltip}
      </span>
    </div>
  );
};
