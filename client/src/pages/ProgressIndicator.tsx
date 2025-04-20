import { YearSection } from '../components/ProgressComponents/YearSection';

const currentYear = new Date().getFullYear();
const years = [currentYear]; // You can load more dynamically

export const ProgressIndicator = () => {
  return (
    <div className="space-y-2 w-[70%] mx-auto">
      {years.map((year) => (
        <YearSection key={year} year={year} />
      ))}
    </div>
  );
};
