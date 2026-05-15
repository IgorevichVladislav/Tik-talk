import {Profile} from '../profile/profile.interface';

export interface ChatCreateDto {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  message: ChatMessage[] | null;
}

export interface Chat {
  id: number;
  userFrom: Profile;
  message: string;
  createdAt: string;
  unreadMessages: number;
}

export interface ChatMessage {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
}
