import { CardDecoration } from "../components/publicPageComponents/CardDecoration";

export const PublicPage: React.FC = () => {
  return (
    <div className="w-full relative h-full grid place-items-center">
     <CardDecoration/>
     <div className="w-full h-full grid place-items-center">
      <div className="flex items-center flex-col mt-30">
      <h1 className="font-bold text-5xl">Where Your Thoughts<br/> <span className="text-8xl">Find Peace</span></h1>
 <p>Your thoughts deserve a safe space. mindScribe is here to help you organize and reflect.</p>
      </div>
     </div>
    </div>
  );
};
