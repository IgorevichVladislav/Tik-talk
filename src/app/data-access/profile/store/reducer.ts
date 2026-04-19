import {createFeature, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Profile} from '../profile.interface';
import {profileActions} from './actions';

export const profilesAdapter = createEntityAdapter<Profile>({
  selectId: profile => profile.id,
  sortComparer: false
});

export interface ProfileState {
  account: Profile | null;
  profile: Profile | null;
  profiles: EntityState<Profile>;
  subscriptions: EntityState<Profile>
  subscriptionsById: EntityState<Profile>;
  subscribers: EntityState<Profile>;
  subscribersById: EntityState<Profile>;
}

export const profileInitialState: ProfileState = {
  account: null,
  profile: null,
  profiles: profilesAdapter.getInitialState(),
  subscriptions: profilesAdapter.getInitialState(),
  subscriptionsById: profilesAdapter.getInitialState(),
  subscribers: profilesAdapter.getInitialState(),
  subscribersById: profilesAdapter.getInitialState(),
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    profileInitialState,
    on(profileActions.testAccountsLoaded, (state, {profiles}) => {
      return {
        ...state,
        profiles: profilesAdapter.setAll(profiles, state.profiles)
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
        profiles: profilesAdapter.setAll(accounts, state.profiles)
      }
    }),

    on(profileActions.accountLoaded, (state, {account}) => {
      return {
        ...state,
        account
      }
    }),

    on(profileActions.subscribe, (state, {profile}) => {
      return {
        ...state,
        subscriptions: profilesAdapter.addOne(profile, state.subscriptions)
      }
    }),

    on(profileActions.unsubscribeSuccess, (state, {account_id}) => {
      return {
        ...state,
        subscriptions: profilesAdapter.removeOne(account_id, state.subscriptions)
      }
    }),

    on(profileActions.subscriptionsByIdLoaded, (state, {subscriptions}) => {
      return {
        ...state,
        subscriptionsById: profilesAdapter.setAll(subscriptions, state.subscriptionsById)
      }
    }),

    on(profileActions.subscriptionsLoaded, (state, {subscriptions}) => {
      return {
        ...state,
        subscriptions: profilesAdapter.setAll(subscriptions, state.subscriptions)
      }
    }),

    on(profileActions.subscribersByIdLoaded, (state, {subscribers}) => {
      return {
        ...state,
        subscribersById: profilesAdapter.setAll(subscribers, state.subscribersById)
      }
    }),

    on(profileActions.subscribersLoaded, (state, {subscribers}) => {
        return {
          ...state,
          subscribers: profilesAdapter.setAll(subscribers, state.subscribers)
        }
      }
    ),
  )
});
