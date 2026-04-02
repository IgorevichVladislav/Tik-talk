import {createFeature, createReducer, on} from '@ngrx/store';
import {Profile} from '../profile.interface';
import {profileActions} from './actions';

export interface ProfileState {
  account: Profile | null;
  profile: Profile | null;
  profiles: Profile[];
}

export const profileInitialState: ProfileState = {
  account: null,
  profile: null,
  profiles: []
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    profileInitialState,
    on(profileActions.testAccountsLoaded, (state, {profiles}) => {
      return {
        ...state,
        profiles
      }
    }),

    on(profileActions.getMeLoaded, (state, {profile}) => {
      return {
        ...state,
        profile
      }
    }),

    on(profileActions.accountLoaded, (state, {account}) => {
      return {
        ...state,
        account
      }
    }),
  ),
})
