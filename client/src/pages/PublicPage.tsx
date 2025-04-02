import { CardDecoration } from '../components/publicPageComponents/CardDecoration';
import CoverImage from '../assets/img.png';

export const PublicPage: React.FC = () => {
  return (
    <div
      className="w-full relative h-full grid
      before:absolute before:transform before:rotate-12 before:-top-[5%] before:right-[20%] before:rounded-full before:w-[30%] before:h-[70%] before:bg-violet-600 before:z-999
      after:absolute after:top-[20%] after:-left-[30%] after:rounded-full after:w-[40%] after:h-[50%] after:bg-gray-600 after:z-99

     "
    >
      <div className='backdrop-blur-3xl relative z-999'>
        <CardDecoration />
        <div className="grid items-center justify-start absolute top-0 left-0 w-full h-full z-999
        
        ">
          <div className="flex items-center ml-32 relative flex-col -mt-10  p-4 gap-4">
            <h1 className="font-bold text-6xl">
            DROP EVERY <br/> <span className='text-[5rem] ml-[6rem] text-violet-500'>THOUGHT</span><br/>
             U CAN’T SAY<br/> <span className='text-[5rem] ml-[6rem] text-violet-500'>OUT LOUD</span>
            </h1>
            <p className='self-start text-2xl mt-4'>
            Your safe <span className='text-violet-600 font-bold'>space</span> for daily<span className='text-violet-600 font-bold'> reflection.</span>
            </p>
          <button className="bottom-10 left-10 p-3 rounded-full w-[50%] self-start font-bold cursor-pointer hover:bg-violet-500 bg-violet-600">
            Start Now
          </button>
          </div>
        </div>
        <div
          className="absolute
           before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:to-dark-base before:z-999
        top-24 right-0 h-[80%] w-[50%]"
        >
          <img src={CoverImage} alt="" className="w-full relative z-10" />
        </div>
      </div>
    </div>
  );
};
