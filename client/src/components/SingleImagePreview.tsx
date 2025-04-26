export const SingleImagePreview: React.FC<{
  url: string | null;
}> = ({ url }) => {
  if (url === null) return;
  return (
    <div className="fixed top-0 bg-red-500 w-[70%] h-full grid place-items-center z-999 backdrop-blur-2xl">
      <div>
        <img className="w-full" src={url ?? ''} alt={url ?? ''} />
      </div>
    </div>
  );
};
