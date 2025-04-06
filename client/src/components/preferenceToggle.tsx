// components/PreferenceToggle.tsx
import { TiInputChecked } from 'react-icons/ti';
import { motion } from 'framer-motion';

interface PreferenceToggleProps {
  icon?: string;
  image?: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const cardVariants = {
  initial: {
    y: 20,
    opacity: 0,
    scale: 0.95,
  },

  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      mass: 0.5,
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)',
    transition: {
      type: 'spring',
      stiffness: 500,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const checkmarkVariants = {
  initial: {
    scale: 0,
    rotate: -90,
  },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 15,
    },
  },
};

export const PreferenceToggle = ({
  icon,
  image,
  label,
  description,
  checked,
  onChange,
}: PreferenceToggleProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      onClick={() => onChange(!checked)}
      className={`relative cursor-pointer border p-4 w-full max-w-[300px] h-full overflow-hidden rounded-md ${
        checked
          ? 'border-violet-500 bg-violet-500/10 text-violet-500'
          : 'border-dark-700 dark:border-dark-300 bg-gray-100 dark:bg-dark-100 hover:border-violet-500/50 hover:text-violet-500'
      } transition-colors duration-200`}
    >
      {checked && (
        <motion.div
          variants={checkmarkVariants}
          className="w-5 h-5 bg-violet-500 shadow-2xl  text-dark-950 font-bold grid place-items-center rounded-bl-[10px] absolute z-100 -top-[0rem] -right-[0rem]"
        >
          <TiInputChecked />
        </motion.div>
      )}

      <div className="flex flex-col items-center">
        <motion.span
          className="text-lg font-semibold"
          animate={{
            color: checked ? 'rgba(124, 58, 237)' : 'inherit',
          }}
        >
          {
            image? (
              <img src={image} alt={label} className="relative w-full mr-2" />
            ): 
            <div className='flex items-center flex-col justify-center'>
              {icon && 
              <motion.img  initial="initial"
                                animate="animate" src={icon} alt={label} className="relative w-[100px] m-0" />}
            <span className={`m-0 font-bold text-light-950 dark:text-dark-950 ${checked?"text-violet-600":""}`}>{  label}</span>
            </div>
          }
          
        </motion.span>
        {description && (
          <motion.span
            className="text-sm text-gray-500"
            animate={{
              color: checked
                ? 'rgba(124, 58, 237, 0.8)'
                : 'rgba(107, 114, 128)',
            }}
          >
            {description}
          </motion.span>
        )}
      </div>

      {checked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 bg-violet-500"
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};
