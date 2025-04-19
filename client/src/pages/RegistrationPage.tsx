import { CardDecoration } from '../components/publicPageComponents/CardDecoration';
import { motion } from 'framer-motion';
import { RegistrationForm } from '../components/forms/RegistrationForm';

export const RegistrationPage: React.FC = () => {
  return (
    <div className="bg-dark-50 relative flex h-screen w-screen items-center justify-center text-light-50 before:absolute before:top-0 before:left-[30%] before:h-[20%] before:w-[30%] before:bg-violet-500 after:absolute after:bottom-0 after:right-0 after:h-[40%] after:w-[20%] after:bg-violet-500">
      <div className="relative w-screen h-screen grid backdrop-blur-[10rem] bg-dark-50/10 z-10 overflow-hidden">
        <div className="grid grid-cols-2 w-[70%] h-[90%] m-auto overflow-hidden">
          <div className="relative p-4 flex flex-col items-center gap-4 rounded-lg">
            <motion.div
              initial={{ opacity: 0, translateY: '100px' }}
              animate={{ opacity: 1, translateY: '0' }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl font-bold text-light-50">
                Your Private Digital{' '}
                <span className="text-violet-500">Sanctuary</span>
              </h1>
              <p>
                Write <span className="text-violet-500">freely</span> ·
                Understand <span className="text-violet-500">deeply</span> ·
                Grow <span className="text-violet-500">mindfully</span>
              </p>
            </motion.div>

            <div className="bg-sky-400/20 relative w-full h-full rounded-lg">
              <motion.div
                initial={{ opacity: 0, translateY: '300px' }}
                animate={{ opacity: 0.5, translateY: '0px' }}
                transition={{ duration: 0.5 }}
                className="absolute opacity-50 left-0 bottom-[20%] w-[60%] h-[50%] grid place-items-center"
              >
                <CardDecoration />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, translateY: '50px' }}
                animate={{ opacity: 1, translateY: '0' }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-b from-transparent to-dark-50 absolute w-full py-12 px-4 bottom-0"
              >
                <h2 className="text-5xl font-bold">
                  Your <span className="text-violet-500">thoughts</span> matter.
                  <br /> Let's make them count.
                </h2>
                <p>
                  Join us in this journey of{' '}
                  <span className="text-violet-500">self-discovery </span>and
                  expression.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid place-items-center">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};
