import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BASE_API_URL} from '@tt/tokens/base-api-url.token';
import {Profile, ProfileFilter, ProfileUpdate, SubscribeFilter} from './profile.interface';
import {Pageable} from '@tt/data-access/shared';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = inject(BASE_API_URL);

  /** Получить 5 тестовых пррофилей. */
  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }

  /** Метод, для получения своего профиля. */
  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`);
  }

  /** Метод, для удаления своего профиля. */
  deleteMe() {
    return this.http.delete(`${this.baseApiUrl}/account/me`);
  }

  /** Метод, для обновления данных своего профиля. */
  updateMe(dto: ProfileUpdate) {
    return this.http.patch<Profile>(`${this.baseApiUrl}/account/me`, dto);
  }

  /** Метод, для загрузки изображения в профиль пользователя. */
  loadImage(image: string) {
    const fd = new FormData();
    fd.append('image', image);
    return this.http.post<string>(`${this.baseApiUrl}/account/upload_image`, {fd});
  }

  /** Метод, для удаления изображения из своего профиля. */
  deleteImage() {
    return this.http.delete(`${this.baseApiUrl}/account/image`);
  }

  /** Метод, для получения всех профилей пользователей приложения.
   * Query параметры служат для фильтрации, которая прикручена на беке.*/
  getAccounts(params?: ProfileFilter) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/accounts`, {params});
  }

  /** Метод, для получения определенного профиля по id. */
  getAccount(account_id: number) {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/${account_id}`);
  }

  /** Метод, для подписки на пользователя по id. */
  subscribe(account_id: number) {
    return this.http.post<Profile>(`${this.baseApiUrl}/account/subscribe/${account_id}`, {});
  }

  /** Метод, для отписки пользователя по id. */
  unsubscribe(account_id: number) {
    return this.http.delete<Profile>(`${this.baseApiUrl}/account/subscribe/${account_id}`);
  }

  /** Метод, для получения подписок отдельного клиента по id с необязательной фильтрацией. */
  getSubscriptionsById(account_id: number, params?: SubscribeFilter) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscriptions/${account_id}`, {params});
  }

  /** Метод, для получения всех подписок с необязательной фильтрацией*/
  getSubscriptions(params?: SubscribeFilter) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscriptions/`, {params});
  }

  /** Метод, для получения подписчиков отдельного клиента по id с необязательной фильтрацией. */
  getSubscribersById(account_id: number, params?: SubscribeFilter) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscribers/${account_id}`, {params});
  }

  /** Метод, для получения всех подписчиков с необязательной фильтрацией. */
  getSubscribers(params?: Record<string, any>) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscribers/`, {params})
  }
}
