// components/PreferenceSetupFlow.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_PREFERENCES } from '../lib/defaultPreferences';
import { AiPreference } from './preferenceFlowSteps/aiPreference';
import { userPreferences } from '../contexts/PreferencesContext';
import { AppearancePreference } from './preferenceFlowSteps/appearnacePreference';
import { NotificationPreference } from './preferenceFlowSteps/notificationPreference';
import { CardViewAppearancePreference } from './preferenceFlowSteps/CardViewAppearnace';

const ProgressPill = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => (
  <motion.div
    onClick={onClick}
    className="h-2 rounded-full relative overflow-hidden cursor-pointer"
    initial={{ width: '24px', backgroundColor: '#3f3f46' }}
    animate={{
      width: active ? '48px' : '24px',
      backgroundColor: active ? '#7c3aed' : '#3f3f46',
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    whileHover={{ scaleY: 1.5 }}
  >
    <motion.div
      className="absolute inset-0 bg-violet-300"
      initial={{ scaleX: 0, originX: 0 }}
      animate={{ scaleX: active ? 1 : 0 }}
      transition={{ duration: 1.5, ease: 'circOut' }}
    />
  </motion.div>
);

const NavigationButton = ({
  direction,
  onClick,
  children,
  disabled,
}: {
  direction: 'back' | 'forward';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-md flex items-center gap-2 cursor-pointer ${
      direction === 'back'
        ? 'bg-dark-200 text-gray-300'
        : 'bg-violet-600 text-white'
    }`}
    whileHover={{
      x: direction === 'back' ? -4 : 4,
      backgroundColor: direction === 'back' ? '#3f3f46' : '#8b5cf6',
    }}
    whileTap={{ scale: 0.95 }}
  >
    {direction === 'back' && (
      <motion.span
       
        animate={{ x: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ←
      </motion.span>
    )}
    {children}
    {direction === 'forward' && (
      <motion.span
       
        animate={{ x: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        →
      </motion.span>
    )}
  </motion.button>
);

export const PreferenceSetupFlow: React.FC<{ onComplete?: () => void }> = ({
  onComplete,
}) => {
  const { preferences, updatePreferences } = userPreferences();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [tempPrefs, setTempPrefs] = useState(() =>
    Object.keys(preferences).length > 0 ? preferences : DEFAULT_PREFERENCES,
  );

  const steps = [
    {
      title: 'Customize AI Assistance to Fit Your Needs',
      component: (
        <AiPreference
          prefs={tempPrefs}
          onChange={(key, value) =>
            setTempPrefs((prev) => ({
              ...prev,
              aiAssistant: { ...prev.aiAssistant, [key]: value },
            }))
          }
        />
      ),
    },
    {
      title: 'Personalize Theme Your Experience',
      component: (
        <AppearancePreference
          prefs={tempPrefs}
          onChange={(key, value) =>
            setTempPrefs((prev) => ({
              ...prev,
              appearance: { ...prev.appearance, [key]: value },
            }))
          }
        />
      ),
    },
    {
      title: 'Personalize Card View Your Experience',
      component: (
        <CardViewAppearancePreference
          prefs={tempPrefs}
          onChange={(key, value) =>
            setTempPrefs((prev) => ({
              ...prev,
              appearance: { ...prev.appearance, [key]: value },
            }))
          }
        />
      ),
    },
    {
      title: 'Set Up Notifications',
      component: (
        <NotificationPreference
          prefs={tempPrefs}
          onChange={(key, value) =>
            setTempPrefs((prev) => ({
              ...prev,
              notifications: { ...prev.notifications, [key]: value },
            }))
          }
        />
      ),
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    updatePreferences(tempPrefs);

    // Celebration animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timer);
  };

  return (
    <div className="w-full min-h-screen mx-auto p-12 bg-dark-50 text-light-50">
      <div className="w-full max-w-2xl m-auto relative">
        {/* Animated Progress Indicator */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            key={`title-${step}`}
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {steps[step].title}
          </motion.h2>

          <motion.div className="flex gap-2 mb-4">
            {steps.map((_, index) => (
              <ProgressPill
                key={index}
                active={index <= step}
                onClick={() => {
                  setDirection(index > step ? 1 : -1);
                  setStep(index);
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Step Content with Advanced Transitions */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.5,
            }}
            className="min-h-[400px]"
          >
            {steps[step].component}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Buttons */}
        <motion.div
          className="flex justify-between mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <NavigationButton
            direction="back"
            onClick={handleBack}
            disabled={step === 0}
          >
            Back
          </NavigationButton>

          {step < steps.length - 1 ? (
            <NavigationButton direction="forward" onClick={handleNext}>
              Continue
            </NavigationButton>
          ) : (
            <motion.button
              onClick={handleFinish}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="relative z-10 flex items-center gap-2"
                animate={{ x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Complete Setup
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                >
                  🎉
                </motion.span>
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};
