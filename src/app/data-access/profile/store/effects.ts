import {inject, Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {ProfileService} from '../profile.service';
import {profileActions} from './actions';
import {profileFeature} from '@tt/data-access/profile';
import {createFeature} from '@ngrx/store';

@Injectable({providedIn: 'root'})

export class ProfileEffects {
  private readonly profileService = inject(ProfileService);
  private readonly actions$ = inject(Actions);

  /** Effect для загрузки 5 тестовых аккаунтов. */
  getTestAccounts = createEffect(() => {
    return this.actions$
      .pipe(ofType(profileActions.getTestAccounts),
        switchMap(() => this.profileService.getTestAccounts()),
        map(testProfiles => profileActions.testAccountsLoaded({profiles: testProfiles}))
      )
  });

  /** Effect для загрузки текущего профиля пользователя. */
  getMe = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getMe),
        switchMap(() => this.profileService.getMe()),
        map(me => profileActions.getMeLoaded({profile: me}))
      )
  });

  deleteMe = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.deleteMe),
        switchMap(() => this.profileService.deleteMe()
          .pipe(
            map(() => profileActions.deleteMeSuccess())
          ))
      )
  });

  /** Effect для для обновления аккаунта текущего пользователя. */
  updateMe = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.updateMe),
        switchMap(({updateDto}) => this.profileService.updateMe(updateDto)),
        map(update => profileActions.updateMeSuccess({profile: update}))
      )
  });

  uploadAvatar = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.uploadAvatar),
        switchMap(({avatarImage}) => this.profileService.uploadImage(avatarImage)),
        map(profile => profileActions.uploadAvatarSuccess({profile}))
      )
  });

  deleteAvatar = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.deleteAvatar),
        switchMap(() => this.profileService.deleteImage()
          .pipe(
            map(profile => profileActions.deleteAvatarSuccess({profile}))
          ))
      )
  });

  /** Effect для загрузки всех аккаунтов пользователей. */
  getAccounts = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getAccounts),
        switchMap(({accountsFilter}) => this.profileService.getAccounts(accountsFilter)),
        map(accounts => profileActions.accountsLoaded({accounts: accounts.items}))
      )
  });

  /** Effect для загрузки аккаунта пользователя по id. */
  getAccount = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getAccount),
        switchMap(({accountId}) => this.profileService.getAccount(accountId)),
        map(account => profileActions.accountLoaded({account: account}))
      )
  });

  subscribe = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.subscribe),
        switchMap(({profile}) => this.profileService.subscribe(profile.id)
          .pipe(map(() => profileActions.subscribeSuccess({account_id: profile.id}))))
      )
  });

  unsubscribe = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.unsubscribe),
        switchMap(({account_id}) => this.profileService.unsubscribe(account_id)
          .pipe(map(() => profileActions.unsubscribeSuccess({account_id})))
        )
      )
  });

  /** Effect для загрузки списка подписок (Subscriptions) с обязательной передачей account_id. */
  getSubscriptionsById = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getSubscriptionsById),
      switchMap(({
                   account_id,
                   subscriptionsFilter
                 }) => this.profileService.getSubscriptionsById(account_id, subscriptionsFilter)),
      map(subscriptions => profileActions.subscriptionsByIdLoaded({subscriptions: subscriptions.items}))
    )
  });

  /** Effect для загрузки списка подписок (Subscriptions). */
  getSubscriptions = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getSubscriptions),
        switchMap(({subscriptionsFilter}) => this.profileService.getSubscriptions(subscriptionsFilter)),
        map(subscriptions => profileActions.subscriptionsLoaded({subscriptions: subscriptions.items}))
      )
  });

  /** Effect для загрузки списка подписчиков (Subscribers) с обязательной передачей account_id. */
  getSubscribersById = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getSubscribersById),
        switchMap(({
                     account_id,
                     subscribersFilter
                   }) => this.profileService.getSubscribersById(account_id, subscribersFilter)),
        map(subscribers => profileActions.subscribersByIdLoaded({subscribers: subscribers.items}))
      )
  });

  /** Effect для загрузки списка подписчиков (Subscribers). */
  getSubscribers = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getSubscribers),
        switchMap(({subscribersFilter}) => this.profileService.getSubscribers(subscribersFilter)),
        map(subscribers => profileActions.subscribersLoaded({subscribers: subscribers.items}))
      )
  });
}
