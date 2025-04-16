import { motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

// sentiments.ts
export const SENTIMENTS = [
  // Positive Spectrum
  { label: 'happy', emoji: '😊' },
  { label: 'joyful', emoji: '😄' },
  { label: 'excited', emoji: '🤩' },
  { label: 'grateful', emoji: '🙏' },
  { label: 'content', emoji: '☺️' },
  { label: 'optimistic', emoji: '😌' },
  { label: 'proud', emoji: '🦚' },
  { label: 'inspired', emoji: '💡' },
  { label: 'playful', emoji: '😜' },
  { label: 'loved', emoji: '🥰' },

  // Negative Spectrum
  { label: 'sad', emoji: '😢' },
  { label: 'lonely', emoji: '🥺' },
  { label: 'anxious', emoji: '😰' },
  { label: 'angry', emoji: '😠' },
  { label: 'frustrated', emoji: '😤' },
  { label: 'overwhelmed', emoji: '😵' },
  { label: 'guilty', emoji: '😔' },
  { label: 'ashamed', emoji: '😳' },
  { label: 'disappointed', emoji: '😞' },
  { label: 'heartbroken', emoji: '💔' },

  // Neutral/States
  { label: 'neutral', emoji: '😐' },
  { label: 'calm', emoji: '🧘' },
  { label: 'tired', emoji: '🥱' },
  { label: 'bored', emoji: '😑' },
  { label: 'confused', emoji: '😕' },
  { label: 'curious', emoji: '🤔' },
  { label: 'surprised', emoji: '😲' },
  { label: 'sick', emoji: '🤒' },

  // Activity-Based
  { label: 'motivated', emoji: '🔥' },
  { label: 'focused', emoji: '🎯' },
  { label: 'creative', emoji: '🎨' },
  { label: 'productive', emoji: '📈' },
];

type Sentiment = {
  label: string;
  emoji: string;
} | null;

export const SentimentPicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState<Sentiment>(null);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute right-0 top-0 flex flex-col items-center p-2 gap-2">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToggle}
        className="flex items-center group cursor-pointer  gap-2 hover:dark:bg-dark-100 p-1 px-2 rounded-md hover:bg-light-100"
      >
        {selected ? (
          <h2 className="text-sm w-full flex items-center gap-1 text-light-500 dark:text-dark-500">
            <motion.span
              initial={{
                x: -20,
              }}
              animate={{
                opacity: isOpen || isHovered ? 1 : 0,
                x: isOpen || isHovered ? 0 : -20,
              }}
              exit={{
                x: -20,
              }}
              transition={{
                duration: 0.2,
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              className={`
            
                `}
            >
              Today I feel
            </motion.span>
            <motion.span
              initial={{
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: isOpen || isHovered ? 0 : -20,
              }}
              exit={{
                x: -20,
              }}
              transition={{
                duration: 0.2,
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              className={`capitalize text-sm flex items-center gap-1 font-semibold text-light-900 dark:text-dark-900`}
            >
              <span className="text-md w-6 h-6 grid place-items-center border-3 border-light-300 bg-light-200 dark:border-dark-300 dark:bg-dark-100 rounded-full">
                {selected.emoji}
              </span>
              {selected.label}
            </motion.span>
          </h2>
        ) : (
          <h2 className="text-sm text-light-500 dark:text-dark-500">
            Nathanim, What do you feel today?
          </h2>
        )}
      </button>
      <motion.div
        ref={pickerRef}
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: isOpen ? 1 : 0,
          x: isOpen ? 0 : 20,
        }}
        exit={{
          opacity: 0,
          x: 20,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        className="max-h-[80vh] shadow-2xl bg-light-50 dark:bg-dark-50 rounded-md border border-light-300 dark:border-dark-100 relative overflow-y-auto p-2"
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        role="dialog"
        aria-label="Sentiment Picker"
        aria-modal="true"
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {SENTIMENTS.map((sentiment) => (
            <SentimentButton
              key={sentiment.label}
              sentiment={sentiment}
              selected={selected}
              onSelect={(label) => {
                setSelected(label);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const SentimentButton = ({
  sentiment,
  selected,
  onSelect,
}: {
  sentiment: (typeof SENTIMENTS)[number];
  selected: {
    label: string;
    emoji: string;
  } | null;
  onSelect: (
    label: {
      label: string;
      emoji: string;
    } | null,
  ) => void;
}) => (
  <motion.button
    key={sentiment.label}
    whileTap={{ scale: 0.98 }}
    aria-selected={selected?.label === sentiment.label}
    aria-label={`Select sentiment: ${sentiment.label}`}
    onClick={() => onSelect(sentiment)}
    className={`flex items-center text-sm group hover:dark:text-dark-950 hover:text-light-950 gap-2 p-[3px] w-full hover:bg-light-100 hover:dark:bg-dark-100 cursor-pointer rounded-md border-light-200 dark:border-dark-200 transition-colors
        ${
          selected?.label === sentiment.label
            ? 'bg-gray-100 dark:bg-dark-200 font-semibold text-light-950 dark:text-dark-900'
            : 'hover:bg-light-50 dark:hover:bg-dark-200'
        }`}
  >
    <motion.span
      className="text-sm w-6 h-6 transition-transform duration-300 group-hover:rotate-45 grid place-items-center border border-light-300 bg-light-200 dark:border-dark-300 dark:bg-dark-100 rounded-full"
      whileHover={{ rotate: 10 }}
    >
      {sentiment.emoji}
    </motion.span>
    <span className="capitalize text-sm">{sentiment.label}</span>
  </motion.button>
);
