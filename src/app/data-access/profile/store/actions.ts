import {createActionGroup, emptyProps, props} from '@ngrx/store';

import {Profile} from '../profile.interface';
import {Pageable} from '@tt/data-access/shared';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    /** Action для получения 5 тестовых профилей. */
    'get test accounts': emptyProps(),
    /** Кладем 5 тестовых профилей в стор. */
    'test accounts loaded': props<{ profiles: Profile[] }>(),

    /** Action для получения Get Me аккаунта. */
    'getMe': emptyProps(),
    /** Кладем в стор свой Get Me. */
    'getMeLoaded': props<{ profile: Profile }>(),

    /** Action для получения Account по id. */
    'get account': props<{ accountId: number }>(),
    /** Кладем Account по id в стор. */
    'account loaded': props<{ account: Profile }>(),


    /** Action для получения Get Subscribers. */
    'get subscribers': props<{
      subscribers: Partial<{
        account_id?: number | null,
        firstLastName?: string | null,
        stack?: string | null,
        city?: string | null,
        orderBy?: string | null,
      }>
    }>(),
    /** Кладем в стор Subscribers. */
    'subscribers loaded': props<{ subscribers: Pageable<Profile[]> }>()

  }
});
