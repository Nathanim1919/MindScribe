import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'I never thought writing for myself would feel this freeing. mindScribe gave me a place to breathe.',
    name: 'Leila M.',
    role: 'Freelance Designer',
  },
  {
    quote:
      'mindScribe became my safe zone. No pressure, no filters. Just me and my thoughts.',
    name: 'Jonas K.',
    role: 'Software Engineer',
  },
  {
    quote:
      'Every time I open it, I feel heard—even if no one reads what I write.',
    name: 'Anika R.',
    role: 'Medical Student',
  },
  {
    quote: 'It feels like a friend that just listens. No judgment. No noise.',
    name: 'Mohamed A.',
    role: 'Journalist',
  },
  {
    quote:
      'The interface is so soothing, it makes writing something I look forward to.',
    name: 'Ellie T.',
    role: 'Photographer',
  },
  {
    quote:
      'I don’t need to share with the world—just with myself. That’s freedom.',
    name: 'Carlos B.',
    role: 'UI/UX Designer',
  },
  {
    quote: 'Writing daily changed how I talk to myself. I’m finally kind.',
    name: 'Riya P.',
    role: 'Psychology Student',
  },
  {
    quote: 'mindScribe is like a digital sanctuary.',
    name: 'Simon K.',
    role: 'Remote Dev',
  },
  {
    quote: 'This is the one app I actually use daily without pressure.',
    name: 'Ava N.',
    role: 'Content Strategist',
  },
  {
    quote: 'Writing became my reset button. mindScribe made that possible.',
    name: 'Daniel G.',
    role: 'Fitness Coach',
  },
];

const marqueeVariants = {
  animateLeft: {
    x: ['0%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 100,
        ease: 'linear',
      },
    },
  },
  animateRight: {
    x: ['-100%', '0%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 100,
        ease: 'linear',
      },
    },
  },
};

const TestimonialCard = ({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) => (
  <div className="min-w-[300px] max-w-[300px] p-2 md:p-6 bg-light-base dark:bg-dark-base rounded-xl border border-light-300 dark:border-dark-100 mx-2">
    <p className="text-base italic text-light-900 dark:text-dark-900 mb-3">
      “{quote}”
    </p>
    <p className="text-sm font-medium text-light-600 dark:text-dark-600">
      — {name}, <span className="font-normal">{role}</span>
    </p>
  </div>
);

export const RealVoices = () => {
  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);

  return (
    <section className="md:w-[70%] mx-auto py-24 overflow-hidden dark:bg-dark-base bg-light-base relative z-999 p-4">
      <div className="tflex felx-col mb-8">
        <h1 className="text-3xl md:text-6xl capitalize font-bold text-light-950 dark:text-dark-950">
          They found a <span className="text-violet-500">place</span> to feel
          again.
        </h1>
        <p className="text-xl text-light-500 dark:text-dark-500">
          What they couldn’t say out loud, they wrote here — and they were
          finally heard.
        </p>
      </div>

      <div
        className="space-y-4 overflow-hidden relative
      before:absolute before:top-0 before:left-0 before:w-[30%] before:h-full before:bg-gradient-to-r before:from-light-base dark:before:from-dark-base  before:z-999
            after:absolute after:top-0 after:right-0 after:w-[30%] after:h-full after:bg-gradient-to-l after:from-light-base dark:after:from-dark-base  after:z-999

      "
      >
        <motion.div
          className="flex w-full"
          variants={marqueeVariants}
          animate="animateLeft"
        >
          {firstRow.concat(firstRow).map((t, i) => (
            <TestimonialCard key={`row1-${i}`} {...t} />
          ))}
        </motion.div>

        <motion.div
          className="flex w-[200%]"
          variants={marqueeVariants}
          animate="animateRight"
        >
          {secondRow.concat(secondRow).map((t, i) => (
            <TestimonialCard key={`row2-${i}`} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
