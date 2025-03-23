import { EmptyCardSkeleton } from '../LoadingSkeletons/EmptyCardSkeleten';

export const CardDecoration: React.FC = () => {
  return (
    <div className="flex items-center absolute gap-2  bg-sky-400 max-w-[300px] opacity-25 top-[40%] left-[45%] transform translate-[-50% -50%]">
      <div className="absolute left-20 rotate-12">
        <EmptyCardSkeleton middle={true} />
      </div>
      <div className="absolute -top-32 z-10">
        <EmptyCardSkeleton middle={true} />
      </div>
      <div className="absolute -right-30 -rotate-12">
        <EmptyCardSkeleton middle={true} />
      </div>
    </div>
  );
};
