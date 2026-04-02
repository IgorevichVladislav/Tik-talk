import {createSelector} from '@ngrx/store';
import {profileFeature} from './reducer';

export const selectTestAccounts = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles)

export const selectProfile = createSelector(
  profileFeature.selectProfile,
  (profile) => profile
)

export const selectAccount = createSelector(
  profileFeature.selectAccount,
  (account) => account
)
