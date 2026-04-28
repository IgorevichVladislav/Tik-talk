import {Profile} from '../profile/profile.interface';
import {PostComment} from '../comments/comment.interface';

export interface PostCreateDto {
  title: string | null
  content: string | null
  authorId: number | null
  communityId: number | null
}

export interface Post {
  id: number
  title: string
  communityId: number | null
  content: string | null
  author: Profile
  images: string[] | null
  createdAt: string
  updatedAt: string | null
  likes: number | null
  likesUsers: number[] | null
  comments: PostComment[] | null
}
