import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BASE_API_URL} from '@tt/tokens/base-api-url.token';
import {Post, PostCreateDto} from './post.interface';

@Injectable({providedIn: 'root'})

export class PostService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = inject(BASE_API_URL);

  /** Метод, для получения постов всех пользователей. */
  getPosts(user_id: number) {
    return this.http.get<Post[]>(`${this.baseApiUrl}/post/`, {params: {user_id}});
  }

  /** Метод, для создания поста пользователем. */
  createPost(dto: PostCreateDto) {
    return this.http.post<Post>(`${this.baseApiUrl}/post/`, dto);
  }

  /** Метод, для получения постов подписчиков. */
  getMySubscriptionsPost() {
    return this.http.get<Post[]>(`${this.baseApiUrl}/post/my_subscriptions`);
  }

  /** Метод, для получения одного поста по id. */
  getPost(post_id: number) {
    return this.http.get<Post>(`${this.baseApiUrl}/post/${post_id}`);
  }

  /** Метод, для редактирования поста (Title и Content). */
  updatePost(post_id: number, updateDto: Pick<PostCreateDto, 'title' | 'content'>) {
    return this.http.patch<Post>(`${this.baseApiUrl}/post/${post_id}`, updateDto);
  }

  /** Метод, для удаления поста. */
  deletePost(post_id: number) {
    return this.http.delete<string>(`${this.baseApiUrl}/post/${post_id}`);
  }

  /** Метод, загружает изображение и привязывает его к посту. */
  loadImage(post_id: number, image: File) {
    const fd = new FormData();
    fd.append('image', image);
    return this.http.post<Post>(`${this.baseApiUrl}/post/upload_image/${post_id}`, fd);
  }

  /** Метод, удаляет изображение из поста. */
  deleteImage(post_id: number, image_url: string) {
    return this.http.delete<string>(`${this.baseApiUrl}/post/delete_image/${post_id}`, {params: {image_url}});
  }

  /** Метод, создает лайк для поста. */
  createLike(post_id: number) {
    return this.http.post<Post>(`${this.baseApiUrl}/post/like/${post_id}`, null);
  }

  /** Метод, удаляет лайк для поста. */
  deleteLike(post_id: number) {
    return this.http.delete<string>(`${this.baseApiUrl}/post/like/${post_id}`);
  }
}
