export interface AvatarType {
  profile?: string;
  setProfile?: (url: string) => void;
  variant?: 'square' | 'circular' | 'rounded';
  showEditIcon?: boolean;
}
