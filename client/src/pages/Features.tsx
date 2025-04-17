// sections/FeatureShowcase.tsx
import { FeatureCard } from '../components/FeatureCard';

import darkMoodIllustrationImage from "../assets/feature/darkMoodIllustrationImage.png";
import lightMoodIllustrationImage from "../assets/feature/lightMoodIllustrationImage.png";
import { image } from 'motion/react-client';


export const FeatureShowcase = () => {
  const features = [
    {
        lightImage: lightMoodIllustrationImage,
        darkImage: darkMoodIllustrationImage,
      title: 'Smart Entries',
      description:
        'Your thoughts, structured effortlessly. Just write, mindScribe gets you.',
    },
    {
        lightImage: lightMoodIllustrationImage,
        darkImage: darkMoodIllustrationImage,
      title: 'Mood Tracker',
      description:
        'Spot emotional patterns and trends without overthinking it.',
    },
    {
        lightImage: lightMoodIllustrationImage,
        darkImage: darkMoodIllustrationImage,
      title: 'Streak Journal',
      description: 'Consistency counts. Get subtle nudges, not guilt trips.',
    },
    {
        lightImage: lightMoodIllustrationImage,
        darkImage: darkMoodIllustrationImage,
      title: 'Block-Based Writing',
      description: 'Headers, lists, quotes, dividers. Your page, your flow.',
    },
    {
        lightImage: lightMoodIllustrationImage,
        darkImage: darkMoodIllustrationImage,
      title: 'Private by Default',
      description:
        'What you write is yours. No likes. No shares. Just expression.',
    },
  ];

  return (
    <section className="w-[70%] mx-auto py-24 grid grid-cols-1 gap-2 relative backdrop-blur-[3rem] z-100 dark:bg-dark-base bg-light-base">
      <div className="text-center mb-12">
        <h2 className="text-8xl text-left font-bold text-light-950 dark:text-dark-950 mb-4">
          What Makes <span className="text-violet-500">mindScribe</span>{' '}
          Different
        </h2>
        <p className="text-light-700  text-left text-2xl dark:text-dark-700 w-[80%]">
          Dive into a space built for you, not your followers. Every feature is
          crafted with care and a touch of the future.
        </p>
      </div>

      <div className="grid grid-cols-1 w-full h-full m-auto sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <FeatureCard index={idx} key={idx} {...feature} />
        ))}
      </div>
    </section>
  );
};
