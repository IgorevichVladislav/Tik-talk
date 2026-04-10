export interface Profile {
  id: number
  username: string
  avatarUrl: string | null
  subscribersAmount: number | null
  firstName: string | null
  lastName: string | null
  isActive: boolean | null
  stack: string[] | null
  city: string | null
  description: string | null
}

export type Avatar = Pick<Profile, 'avatarUrl' | 'username' | 'id'>;

export type ProfileUpdate = Partial<Pick<Profile, 'firstName' | 'lastName' | 'stack' | 'city' | 'description'>>;

export type ProfileFilter = Record<keyof Pick<Profile, 'firstName' | 'lastName' | 'city' | 'stack'>, any>;

export type SubscribeFilter = ProfileFilter | {
  account_id: any;
  firstLastName: any;
};
