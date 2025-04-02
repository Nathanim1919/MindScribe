import { MdNavigateNext, MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { CardDecoration } from '../components/publicPageComponents/CardDecoration';

export const LoginPage: React.FC = () => {
  return (
    <div className="bg-dark-50 relative flex h-screen w-screen items-center justify-center text-light-50
      before:absolute before:top-0 before:left-[30%] before:h-[20%] before:w-[30%] before:bg-violet-500
      after:absolute after:bottom-0 after:right-0 after:h-[40%] after:w-[20%] after:bg-violet-500
    ">
      <div className="relative w-screen h-screen grid backdrop-blur-[10rem] bg-dark-50/30 z-10">
        <div className="grid grid-cols-2 w-[70%] h-[90%] m-auto">
          {/* Hero Section */}
          <div className="relative p-4 flex flex-col items-center gap-4 rounded-lg">
            
            <div className="bg-sky-400/20 relative w-full h-full rounded-lg overflow-hidden">
              <div className="absolute opacity-50 left-0 bottom-[20%] w-[60%] h-[50%] grid place-items-center">
                <CardDecoration />
              </div>
              <div className="bg-gradient-to-b from-transparent to-dark-50 absolute w-full h-[50%] py-12 px-4 bottom-0">
                <h2 className="text-6xl font-bold mb-2">
                  Your mind's <span className="text-violet-500">journey</span> matters
                </h2>
                <p className="opacity-90">Every login is a step in self-discovery</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid place-items-center">
            <form className="relative w-[80%] h-full flex flex-col justify-center gap-6 p-10 rounded-lg">
              <div>
                <h2 className="text-4xl font-bold mb-2">Welcome back</h2>
                <p className="text-light-50/70">Continue your reflective journey</p>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-violet-500 flex items-center gap-2" htmlFor="email">
                  <MdOutlineEmail /> Email
                </label>
                <input
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  maxLength={30}
                  minLength={5}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                  className="bg-dark-50/30 transition-all duration-300 focus:border-violet-600/70 text-light-50 border border-dark-100 outline-none rounded-md p-3"
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-violet-500 flex items-center gap-2" htmlFor="password">
                  <MdLockOutline /> Password
                </label>
                <input
                  className="bg-dark-50/30 transition-all duration-300 focus:border-violet-600/70 text-light-50 border border-dark-100 outline-none rounded-md p-3"
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="••••••••"
                />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-violet-500" />
                  Remember me
                </label>
                <a href="#" className="text-violet-500 hover:underline">Forgot password?</a>
              </div>
              
              <button
                className="bg-violet-500 group text-light-50 flex items-center justify-center rounded-md p-3 w-full cursor-pointer hover:bg-violet-600 transition-all duration-300 mt-4"
                type="submit"
              >
                Sign In
                <MdNavigateNext className="transition-all duration-300 inline-block ml-2 text-2xl justify-self-end opacity-0 transform translate-x-10 group-hover:translate-0 group-hover:opacity-100" />
              </button>
              
              <p className="text-center text-sm mt-4">
                Don't have an account?{' '}
                <a href="/register" className="text-violet-500 hover:underline font-medium">
                  Create one
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};