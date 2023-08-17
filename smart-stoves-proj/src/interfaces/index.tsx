export type SelectOptionType = {
  value: number | string;
  label?: string;
};

export type CommunityData = {
  id: number;
  name: string;
  address: string;
  state: string;
  supervisor: string;
  number: string;
  safety: boolean;
  isClicked: boolean;
  onCommunityClick: (id: number) => void;
};

export type ItemData = {
  id: number;
  name: string;
  address: string;
  state: string;
  supervisor: string;
  number: string;
  safety: boolean;
};

export interface IUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  email: string;
  phone: string;
  currentPassword: string;
}
