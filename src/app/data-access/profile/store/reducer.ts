import {createFeature, createReducer, on} from '@ngrx/store';
import {Profile} from '../profile.interface';
import {profileActions} from './actions';

export interface ProfileState {
  account: Profile | null;
  profile: Profile | null;
  profiles: Profile[];
  subscribers: Profile[];
  subscriptions: Profile[];
}

export const profileInitialState: ProfileState = {
  account: null,
  profile: null,
  profiles: [],
  subscribers: [],
  subscriptions: [],
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

    on(profileActions.getMeLoaded,
      profileActions.updateMeSuccess,
      (state, {profile}) => {
        return {
          ...state,
          profile
        }
      }),

    on(profileActions.accountsLoaded, (state, {accounts}) => {
        return {
          ...state,
          profiles: accounts
        }
      }
    ),

    on(profileActions.accountLoaded, (state, {account}) => {
      return {
        ...state,
        account
      }
    }),

    on(profileActions.subscriptionsLoaded, (state, {subscriptions}) => {
      return {
        ...state,
        subscriptions
      }
    }),

    on(profileActions.subscribersLoaded, (state, {subscribers}) => {
      return {
        ...state,
        subscribers
      }
    })
  ),
})
