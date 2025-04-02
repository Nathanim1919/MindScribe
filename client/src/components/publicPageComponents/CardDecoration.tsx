import { EmptyCardSkeleton } from '../LoadingSkeletons/EmptyCardSkeleten';

export const CardDecoration: React.FC = () => {
  return (
    <div className="flex items-center gap-2  bg-sky-400">
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
