export interface Profile {
  id: number
  username: string
  avatarUrl: string | null
  subscribersAmount: number | null
  firstName: string | null
  lastName: string | null
  firstLastName?: string | null
  isActive: boolean | null
  stack: string[] | null
  city: string | null
  description: string | null
}

export type Avatar = Pick<Profile, 'avatarUrl' | 'username' | 'id'>;

export type ProfileUpdate = Partial<Pick<Profile, 'firstName' | 'lastName' | 'stack' | 'city' | 'description'>>;

export type ProfileFilter = Record<keyof Pick<Profile, 'firstName' | 'lastName' | 'city' | 'stack'>, any>;
export type savedProfileFilterSearch = Partial<Pick<Profile, 'firstName' | 'lastName' | 'stack' | 'city'>>;

export type SubscriptionFilter = ProfileFilter;
export type savedSubscriptionFilterSearch = savedProfileFilterSearch;

export type SubscribersFilter = Record<keyof Pick<Profile, 'firstLastName' | 'city' | 'stack'>, any>;
export type savedSubscriberFilterSearch = Partial<SubscribersFilter>;
