import { MonthSection } from './MonthSection';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const YearSection = ({ year }: { year: number }) => {
  return (
    <section className='pt-4'>
     <div className="flex justify-between items-center flex-wrap gap-4 text-light-950 dark:text-dark-950">
  <h2 className="text-xl font-bold mb-6">{year}</h2>
  <div className="flex  text-sm items-end gap-1">
    <span className="bg-light-200 dark:bg-dark-100 px-2 py-1 rounded-full">
      📈 April - Most productive
    </span>
    <span className="bg-light-200 dark:bg-dark-100 px-2 py-1 rounded-full">
      📝 132 total entries
    </span>
    <span className="bg-light-200 dark:bg-dark-100 px-2 py-1 rounded-full">
      🔥 45-day streak
    </span>
  </div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
        {months.map((month, index) => (
          <MonthSection
            key={month}
            year={year}
            monthIndex={index}
            monthName={month}
          />
        ))}
      </div>
    </section>
  );
};
