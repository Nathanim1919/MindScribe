export type SidebarElementPropType = {
  title: string;
  icon: React.ReactNode;
  redirectTo?: string;
  active?: boolean;
  onClick?: () => void; // Optional click handler for logout
};


// types.ts or directly in your component file
export interface ImageProps {
  url: string;
  caption: string;
  date: string;
  entryId: string;
  sentiment?: string;
}


export interface ImageCardProps {
  url: string;
  caption: string;
  date: string;
  entrieId: string;
}