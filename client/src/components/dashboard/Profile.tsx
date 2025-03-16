import { MdOutlineModeEditOutline } from "react-icons/md";


export const Profile = () => {
    return (
        <div className="text-light-100 w-[90%] mx-auto mt-2">
            <div className="grid">
                <div className="cover w-full h-[150px] rounded-md bg-dark-100"></div>
                <div className="profile relative -top-[5rem] p-4 flex justify-between">
                    <div className="pro-details flex flex-col items-center">
                        <div className="pro-pic w-[150px] h-[150px] border-10 border-dark-base rounded-full bg-dark-100"></div>
                        <div className="pro-info flex flex-col items-center">
                            <h3>Nathanim tadele</h3>
                            <p className="text-dark-500">Joined since Jan 5, 2025</p>
                        </div>
                    </div>
                    <div className="bio self-end  flex flex-col bg-dark-50 w-[70%] justify-self-end rounded-md p-2">
                        <span className="self-end w-8 h-8 rounded-full grid place-items-center bg-dark-100 cursor-pointer">
                            <MdOutlineModeEditOutline/>
                        </span>
                        <p className="text-dark-500 pb-4">
                        Professional overthinker. Amateur dreamer. Full-time diary addict. My thoughts are messy, but my words are sharp.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}