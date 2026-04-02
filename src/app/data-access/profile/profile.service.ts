import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs';
import {BASE_API_URL} from '@tt/tokens/base-api-url.token';
import {Profile, ProfileUpdate} from './profile.interface';
import {Pageable} from '@tt/data-access/shared';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = inject(BASE_API_URL);

  subscribers = signal<Profile[]>([]);

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
    return this.http.patch<ProfileUpdate>(`${this.baseApiUrl}/account/me`, {dto});
  }

  /** Метод, для загрузки изображения в свой профиль. */
  loadImage(image: string) {
    return this.http.post<string>(`${this.baseApiUrl}/account/upload_image`, {image});
  }

  /** Метод, для удаления изображения из своего профиля. */
  deleteImage() {
    return this.http.delete(`${this.baseApiUrl}/account/image`);
  }

  /** Метод, для получения всех профилей пользователей приложения. */
  getAccounts() {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/accounts`);
  }

  /** Метод, для получения определенного профиля по id. */
  getAccount(account_id: number) {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/${account_id}`);
  }

  /** Метод, для подписки на пользователя по id. */
  subscribe(account_id: number) {
    return this.http.post<string>(`${this.baseApiUrl}/account/subscribe/${account_id}`, {});
  }

  /** Метод, для отписки пользователя по id. */
  unsubscribe(account_id: number) {
    return this.http.delete<string>(`${this.baseApiUrl}/account/subscribe/${account_id}`, {});
  }

  /** Метод, для получения подписок по id. */
  getSubscriptionsForId(account_id: number) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscriptions/${account_id}`);
  }

  /** Метод, для получения всех подписок*/
  getSubscriptions() {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscriptions/`);
  }

  /** Метод, для получения подписчиков по id. */
  getSubscribersForId(account_id: number) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscribers/${account_id}`);
  }

  /** Метод, для получения всех подписчиков. */
  getSubscribers(subscribersLength?: number) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscribers/`)
      .pipe(map(res => {
        return res.items.splice(0, subscribersLength);
      }))
  }
}
