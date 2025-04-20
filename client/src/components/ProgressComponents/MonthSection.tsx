import { motion } from 'motion/react';
import { DayBlock } from './DayBlock';

export const MonthSection = ({
  year,
  monthIndex,
  monthName,
}: {
  year: number;
  monthIndex: number;
  monthName: string;
}) => {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return (
    <div>
      <h3 className="text-sm font-semibold dark:text-dark-600 py-2">{monthName}</h3>
      <motion.div
      initial={{
        opacity:0, translateY:"50px"
      }}
      animate={{
        opacity:1, translateY:0
      }}
      transition={{duration:monthIndex/10}}
       className="grid grid-cols-7 w-full h-full gap-0">
        {[...Array(daysInMonth)].map((_, dayIndex) => (
          <DayBlock
            key={dayIndex}
            day={dayIndex + 1}
            month={monthName}
            year={year}
          />
        ))}
      </motion.div>
    </div>
  );
};
