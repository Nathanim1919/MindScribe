import { CardDecoration } from '../components/publicPageComponents/CardDecoration';
import { LoginForm } from '../components/forms/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="dark:bg-dark-50 relative flex h-screen w-screen items-center justify-center dark:text-light-50 before:absolute before:top-0 before:left-[30%] before:h-[20%] before:w-[30%] before:bg-violet-500 after:absolute after:bottom-0 after:right-0 after:h-[40%] after:w-[20%] after:bg-violet-500">
      <div className="relative w-screen h-screen grid backdrop-blur-[10rem] dark:bg-dark-50/10 z-10 overflow-hidden">
        <div className="grid grid-cols-2 w-[70%] h-[90%] m-auto overflow-hidden">
        <div className="relative p-4 flex flex-col items-center gap-4 rounded-lg">
            
            <div className="bg-sky-400/20 relative w-full h-full rounded-lg overflow-hidden">
              <div className="absolute opacity-50 left-0 bottom-[20%] w-[60%] h-[50%] grid place-items-center">
                <CardDecoration />
              </div>
              <div className="bg-gradient-to-b from-transparent dark:to-dark-50 absolute w-full h-[50%] py-12 px-4 bottom-0">
                <h2 className="text-6xl font-bold mb-2">
                  Your mind's <span className="text-violet-500">journey</span> matters
                </h2>
                <p className="opacity-90">Every login is a step in self-discovery</p>
              </div>
            </div>
          </div>

          <div className="grid place-items-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};


