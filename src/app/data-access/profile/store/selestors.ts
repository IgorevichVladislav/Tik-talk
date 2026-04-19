import {createSelector} from '@ngrx/store';
import {profileFeature, profilesAdapter} from './reducer';

const {selectAll, selectEntities} = profilesAdapter.getSelectors();
const {selectAll: selectAllSubscribersById} = profilesAdapter.getSelectors(profileFeature.selectSubscribersById);

/** Selector возвращает список 5 тестовых профилей. */
export const selectTestAccounts = createSelector(
  profileFeature.selectProfiles,
  selectAll,
);

/** Selector возвращает текущей профиль пользователя. */
export const selectProfile = profileFeature.selectProfile;

/** Selector возвращает список всех аккаунтов (профилей). */
export const selectAccounts = createSelector(
  profileFeature.selectProfiles,
  selectAll
);

/** Selector возвращает аккаунт пользователя по id. */
export const selectAccount = profileFeature.selectAccount;

/** Selector для получения списка подписок пользователя по id. */
export const selectSubscriptionsById = createSelector(
  profileFeature.selectSubscriptionsById,
  (subscriptions) => subscriptions
);

//todo Alias для Selector получения списка подписок текущего пользователя.
export const selectSubscriptionsState = profileFeature.selectSubscriptions;

/** Selector для получения списка подписок текущего пользователя. */
export const selectSubscriptions = createSelector(
  selectSubscriptionsState,
  selectAll
);

/** Selector для получения списка подписок текущего пользователя по id.
 * Возвращает словарь по id, необходим для отображения информации в карточке пользователя Подписан / Не подписан */
export const selectSubscriptionsEntity = createSelector(
  selectSubscriptionsState,
  selectEntities
);

/** Selector для получения списка подписчиков определенного пользователя пользователя по id. */
export const selectSubscribersById = (subscribersLimit: number) => createSelector(
  selectAllSubscribersById,
  subscribers => subscribers.slice(0, subscribersLimit)
);

/** Selector для получения списка подписчиков текущего пользователя. */
export const selectSubscribers = createSelector(
  profileFeature.selectSubscribers,
  selectAll
);

/** Selector для получения списка подписчиков текущего пользователя, но с возможностью установления лимита для UI. */
export const selectSubscribersLimitList = (subscribersLimit?: number) => createSelector(
  selectSubscribers,
  (subscribers) => subscribers.slice(0, subscribersLimit)
);
