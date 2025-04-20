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
      <div className="flex justify-between items-center text-light-950 dark:text-dark-950">
        <h2 className="text-xl font-bold text-center mb-6">{year}</h2>
        <p>April - Productive month</p>
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
