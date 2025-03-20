interface CommandOptionPropType {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

export const CommandOption: React.FC<CommandOptionPropType> = ({
  icon,
  title,
  onClick,
}) => {
  return (
    <div
      className="command-item flex text-[20px] items-center gap-2 rounded-md hover:bg-light-200 px-1 hover:dark:bg-dark-200 dark:text-light-100 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      {title}
    </div>
  );
};
