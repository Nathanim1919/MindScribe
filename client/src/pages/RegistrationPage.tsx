import { MdNavigateNext } from 'react-icons/md';
import { CardDecoration } from '../components/publicPageComponents/CardDecoration';

export const RegistrationPage: React.FC = () => {
  return (
    <div
      className="bg-dark-50 relative flex h-screen w-screen items-center justify-center text-light-50
    before:absolute before:top-0 before:left-[30%] before:h-[20%] before:w-[30%] before:bg-violet-500
    after:absolute after:bottom-0 after:right-0 after:h-[40%] after:w-[20%] after:bg-violet-500
    "
    >
      <div className="relative w-screen h-screen grid backdrop-blur-[10rem] bg-dark-50/10 z-10">
        <div className="grid grid-cols-2 w-[70%] h-[90%] m-auto">
          <div className="relative p-4 flex flex-col items-center gap-4 rounded-lg">
            <div>
              <h1 className="text-6xl font-bold text-light-50">
                Your Private Digital{' '}
                <span className="text-violet-500">Sanctuary</span>
              </h1>
              {/* <p>
              A place to capture your thoughts, ideas, and memories. 
              Your personal space for reflection and creativity.
            </p>
            <p>
              Join us in this journey of self-discovery and expression.
            </p>
            <p>
              Sign up now and start creating your own digital sanctuary.
            </p>
            <p>
              Your thoughts matter. Let's make them count.
            </p>
            <p>
              Welcome to your personal space.
            </p>
            */}
              <p>
                Write <span className="text-violet-500">freely</span> ·
                Understand <span className="text-violet-500">deeply</span> ·
                Grow <span className="text-violet-500">mindfully</span>
              </p>
            </div>
            <div className="bg-sky-400/20 relative w-full h-full rounded-lg">
              <div className="absolute opacity-50 left-0 bottom-[20%] w-[60%] h-[50%] grid place-items-center">
                <CardDecoration />
              </div>
              <div className='bg-gradient-to-b from-transparent to-dark-50 absolute w-full py-12 px-4 bottom-0'>
                <h2 className='text-5xl font-bold'>Your <span className='text-violet-500'>thoughts</span> matter.<br/> Let's make them count.</h2>
                <p>Join us in this journey of <span className='text-violet-500'>self-discovery </span>and expression.</p>
              </div>
            </div>
          </div>
          <div className="grid place-items-center">
            <form className="relative w-[80%] h-full flex flex-col gap-4 p-10 rounded-lg">
              <div className={`flex flex-col gap-1`}>
                <label className={`text-violet-500`} htmlFor="username">
                  Full Name
                </label>
                <input
                  autoComplete="off"
                  autoFocus
                  className={`bg-dark-50/30 transition-all duration-300  focus:border-violet-600/70 text-light-50 border border-dark-100 outline-none rounded-md p-2`}
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Enter your Full Name"
                />
              </div>
              <div className={`flex flex-col gap-1`}>
                <label className={`text-violet-500`} htmlFor="email">
                  Email
                </label>
                <input
                  autoComplete="off"
                  className={`bg-dark-50/30 transition-all duration-300  focus:border-violet-600/70 text-light-50 border border-dark-100 outline-none rounded-md p-2`}
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className={`flex flex-col gap-1`}>
                <label className={`text-violet-500`} htmlFor="password">
                  Password
                </label>
                <input
                  autoComplete="off"
                  className={`bg-dark-50/30 transition-all duration-300  focus:border-violet-600/70 text-light-50 border border-dark-100 outline-none rounded-md p-2`}
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="••••••••"
                />
              </div>
              <div className={`flex flex-col gap-1`}>
                <label className={`text-violet-500`} htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  autoComplete="off"
                  className={`bg-dark-50/30 transition-all duration-300  focus:border-violet-600/70 text-light-50 border border-dark-100 outline-none rounded-md p-2`}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                 placeholder="••••••••"
                />
              </div>
              <div>
                <button
                  className={`bg-violet-500 group text-light-50 flex items-center justify-center rounded-md p-2 w-full cursor-pointer hover:bg-violet-600 transition-all duration-300`}
                  id="submit"
                  name="submit"
                  type="submit"
                >
                  Sign Up
                  <MdNavigateNext className="transition-all duration-300 inline-block ml-2 text-2xl justify-self-end opacity-0 transform translate-x-10 group-hover:translate-0 group-hover:opacity-100" />
                </button>
              </div>
              <p className="text-center text-sm mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-violet-500 hover:underline font-medium">
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
