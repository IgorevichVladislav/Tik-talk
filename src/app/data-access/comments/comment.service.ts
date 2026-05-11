import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BASE_API_URL} from '@tt/tokens/base-api-url.token';
import {CommentCreateDto, PostComment} from './comment.interface';

@Injectable({providedIn: 'root'})

export class CommentService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = inject(BASE_API_URL);

  createComment(dto: CommentCreateDto) {
    return this.http.post<PostComment>(`${this.baseApiUrl}/comment/`, dto);
  }

  getComment(comment_id: number) {
    return this.http.get<PostComment>(`${this.baseApiUrl}/comment/${comment_id}`);
  }

  updateComment(comment_id: number, text: string) {
    return this.http.patch<string>(`/${this.baseApiUrl}/comment/${comment_id}`, text);
  }

  deleteComment(comment_id: number) {
    return this.http.delete<void>(`${this.baseApiUrl}/comment/${comment_id}`);
  }
}
