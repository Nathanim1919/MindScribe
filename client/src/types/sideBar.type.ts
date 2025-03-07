export type SidebarElementPropType = {
  title: string;
  icon: React.ReactNode;
  redirectTo?: string;
  onClick?: () => void; // Optional click handler for logout
};
