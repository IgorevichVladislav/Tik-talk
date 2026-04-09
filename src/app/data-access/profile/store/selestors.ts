import {createSelector} from '@ngrx/store';
import {profileFeature} from './reducer';

export const selectTestAccounts = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles)

export const selectProfile = createSelector(
  profileFeature.selectProfile,
  (profile) => profile
)

/** Selector для получения всех аккаунтов пользователей. */
export const selectAccounts = createSelector(
  profileFeature.selectProfiles,
  (accounts) => accounts
)

export const selectAccount = createSelector(
  profileFeature.selectAccount,
  (account) => account
)

export const selectSubscriptions = createSelector(
  profileFeature.selectSubscriptions,
  (subscriptions) => subscriptions
)

export const selectSubscribers = createSelector(
  profileFeature.selectSubscribers,
  (subscribers) => subscribers
)

export const selectSubscribersLimit = (subscribersLimit: number) => createSelector(
  profileFeature.selectSubscribers,
  (subscribers) => subscribers.slice(0, subscribersLimit)
)
