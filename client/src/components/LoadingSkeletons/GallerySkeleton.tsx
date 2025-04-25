export const GallerySkeleton: React.FC = () => {
  // Array of different height classes to simulate masonry layout
  const skeletonItems = [
    { height: 'h-40' }, // short
    { height: 'h-64' }, // medium
    { height: 'h-80' }, // tall
    { height: 'h-52' }, // medium-short
    { height: 'h-72' }, // medium-tall
    { height: 'h-48' }, // short-medium
    { height: 'h-60' }, // medium
    { height: 'h-64' }, // medium 
    { height: 'h-80' }, // tall
    { height: 'h-52' }, // medium-short
    { height: 'h-72' }, // medium-tall
    { height: 'h-40' }, // short
    { height: 'h-64' }, // medium
    { height: 'h-80' }, // tall
    { height: 'h-52' }, // medium-short
    { height: 'h-72' }, // medium-tall
    { height: 'h-48' }, // short-medium
    { height: 'h-60' }, // medium
    { height: 'h-64' }, // medium
    { height: 'h-80' }, // tall
    { height: 'h-52' }, // medium-short
    { height: 'h-72' }, // medium-tall
  ];

  return (
    <div className="p-4 h-[95vh] overflow-hidden overflow-y-auto">
      <div className="columns-2 md:columns-3 lg:columns-7 gap-3 space-y-3">
        {skeletonItems.map((item, index) => (
          <div key={index} className={`relative rounded-xl overflow-hidden dark:bg-dark-200 bg-light-200 animate-pulse ${item.height}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
