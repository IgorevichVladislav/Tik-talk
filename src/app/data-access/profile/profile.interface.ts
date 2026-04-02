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

export type ProfileUpdate = Partial<Pick<Profile, 'firstName' | 'lastName' | 'stack' | 'city' | 'description'>>;

