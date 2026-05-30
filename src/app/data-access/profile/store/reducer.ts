import {createFeature, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {
  Profile,
  savedProfileFilterSearch,
  savedSubscriberFilterSearch,
  savedSubscriptionFilterSearch
} from '../profile.interface';
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

  searchProfileFilter: savedProfileFilterSearch;
  searchSubscriptionFilter: savedSubscriptionFilterSearch;
  searchSubscriberFilter: savedSubscriberFilterSearch;
}

export const profileInitialState: ProfileState = {
  account: null,
  profile: null,

  profiles: profilesAdapter.getInitialState(),

  subscriptions: profilesAdapter.getInitialState(),
  subscriptionsById: profilesAdapter.getInitialState(),

  subscribers: profilesAdapter.getInitialState(),
  subscribersById: profilesAdapter.getInitialState(),

  searchProfileFilter: {},
  searchSubscriptionFilter: {},
  searchSubscriberFilter: {}
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
      profileActions.uploadAvatarSuccess,
      profileActions.deleteAvatarSuccess,
      (state, {profile}) => {
        return {
          ...state,
          profile
        }
      }),

    on(profileActions.deleteMeSuccess, (state) => {
      return {
        ...state,
        profile: null,
        account: null
      }
    }),

    on(profileActions.getAccounts, (state, {accountsFilter}) => {
      return {
        ...state,
        searchProfileFilter: accountsFilter ?? state.searchProfileFilter,
      };
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

    on(profileActions.getSubscriptions, (state, {subscriptionsFilter}) => {
      return {
        ...state,
        searchSubscriptionFilter: subscriptionsFilter ?? state.searchSubscriptionFilter
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

    on(profileActions.getSubscribers, (state, {subscribersFilter}) => {
      return {
        ...state,
        searchSubscriberFilter: subscribersFilter ?? state.searchSubscriberFilter,
      };
    }),

    on(profileActions.subscribersLoaded, (state, {subscribers}) => {
        return {
          ...state,
          subscribers: profilesAdapter.setAll(subscribers, state.subscribers)
        }
      }
    ),

    on(profileActions.restoreSearchFiltrationSuccess, (state, {
      profileFilter,
      subscribersFilter,
      subscriptionFilter
    }) => {
      return {
        ...state,
        searchProfileFilter: profileFilter,
        searchSubscriberFilter: subscribersFilter,
        searchSubscriptionFilter: subscriptionFilter
      }
    })
  )
});
