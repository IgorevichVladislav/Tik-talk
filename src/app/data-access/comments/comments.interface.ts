import {Profile} from '../profile/profile.interface';

export interface CommentCreateDto {
  text: string
  authorId: number | null
  postId: number
  commentId: number | null
}

export interface Comment {
  id: number
  text: string
  author: Profile
  postId: number
  commentId: number | null
  createdAt: string
  updatedAt: string | null
}
