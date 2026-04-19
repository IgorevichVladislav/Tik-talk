import {createActionGroup, emptyProps, props} from '@ngrx/store';

import {Profile, ProfileFilter, ProfileUpdate, SubscribeFilter} from '../profile.interface';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    /** Action для загрузки 5 тестовых профилей. */
    'get test accounts': emptyProps(),
    /** Action успешной загрузки 5 тестовых профилей. */
    'test accounts loaded': props<{ profiles: Profile[] }>(),

    /** Action для загрузки текущего профиля пользователя. */
    'getMe': emptyProps(),
    /** Action успешной загрузки текущего профиля пользователя. */
    'getMeLoaded': props<{ profile: Profile }>(),

    /** Action для обновления профиля текущего пользователя. */
    'update me': props<{ updateDto: ProfileUpdate }>(),
    /** Action после успешного обновления профиля текущего пользователя. */
    'update me success': props<{ profile: Profile }>(),

    /** Action для загрузки аккаунтов пользователей с необязательной фильтрацией. */
    'get accounts': props<{ accountsFilter?: ProfileFilter }>(),
    /** Action успешной загрузки аккаунтов пользователей. */
    'accounts loaded': props<{ accounts: Profile[] }>(),

    /** Action для загрузки аккаунта пользователя по id. */
    'get account': props<{ accountId: number }>(),
    /** Action успешной загрузки аккаунта пользователя. */
    'account loaded': props<{ account: Profile }>(),

    /** Action для подписки на текущего пользователя. */
    'subscribe': props<{ profile: Profile }>(),
    /** Action для успешной подписки на текущего пользователя. */
    'subscribe success': props<{ account_id: number }>(),

    /** Action для отписки от текущего пользователя. */
    'unsubscribe': props<{ account_id: number }>(),
    /** Action для успешной подписки на текущего пользователя. */
    'unsubscribe success': props<{ account_id: number }>(),

    /** Action для запроса подписок (Subscriptions) с необязательными параметрами фильтрации. */
    'get subscriptions': props<{ subscriptionsFilter?: SubscribeFilter }>(),
    /** Action успешной загрузки подписок (Subscriptions) в store. */
    'subscriptions loaded': props<{ subscriptions: Profile[] }>(),

    /** Action для запроса подписок (Subscriptions) с обязательной передачей account_id и необязательным параметром фильтрации. */
    'get subscriptions by id': props<{ account_id: number, subscriptionsFilter?: SubscribeFilter }>(),
    /** Action успешной загрузки подписчиков (Subscriptions) в store с обязательным параметром id. */
    'subscriptions by id loaded': props<{ subscriptions: Profile[] }>(),

    /** Action для запроса подписчиков (Subscribers) с необязательными параметрами фильтрации. */
    'get subscribers': props<{ subscribersFilter?: SubscribeFilter }>(),
    /** Action успешной загрузки подписчиков (Subscribers) в store. */
    'subscribers loaded': props<{ subscribers: Profile[] }>(),

    /** Action для запроса подписчиков (Subscribers) с обязательной передачей account_id и необязательным параметром фильтрации. */
    'get subscribers by id': props<{ account_id: number, subscribersFilter?: SubscribeFilter }>(),
    /** Action успешной загрузки подписчиков (Subscribers) в store с обязательным параметром id. */
    'subscribers by id loaded': props<{ subscribers: Profile[] }>(),

  }
});

// subscribersFilter?: Partial<{
//   account_id?: number | null,
//   firstLastName?: string | null,
//   stack?: string | null,
//   city?: string | null,
// }>
