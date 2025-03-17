import { MdOutlineModeEditOutline } from 'react-icons/md';
import { IoCamera } from 'react-icons/io5';

export const Profile = () => {
  return (
    <div className="dark:text-light-100 w-[80%] mx-auto mt-2">
      <div className="grid">
        <div className="group cover w-full h-[150px] rounded-md bg-light-50 dark:bg-dark-50">
          <div className="w-full hidden h-full group-hover:grid cursor-pointer justify-end p-4 bg-dark-400/40">
            <IoCamera className="text-3xl hover:text-dark-500" />
          </div>
        </div>
        <div className="profile relative w-full -top-[5rem] py-4 flex justify-between">
          <div className="pro-details flex flex-col items-center">
            <div className="pro-pic group relative overflow-hidden w-[150px] h-[150px] border-10 border-light-100 dark:border-dark-base rounded-full bg-light-50 dark:bg-dark-50">
              <div className="w-full hidden  h-full group-hover:grid cursor-pointer place-items-center bg-dark-400/40">
                <IoCamera className="text-3xl hover:text-dark-500" />
              </div>
            </div>
            <div className="pro-info flex flex-col items-center">
              <h3>Nathanim tadele</h3>
              <p className="text-dark-500">Joined since Jan 5, 2025</p>
            </div>
          </div>
          <div className="bio self-end  flex flex-col bg-light-50 dark:bg-dark-50 w-[70%] justify-self-end rounded-md p-2">
            <span className="self-end w-8 h-8 rounded-full grid place-items-center hover:bg-light-100 dark:hover:bg-dark-100 cursor-pointer">
              <MdOutlineModeEditOutline />
            </span>
            <p className="text-dark-500 px-4 text-center pb-4">
              Professional overthinker. Amateur dreamer. Full-time diary addict.
              My thoughts are messy, but my words are sharp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
