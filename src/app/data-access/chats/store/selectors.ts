import {createSelector} from '@ngrx/store';

import {chatAdapter, chatFeature, chatMessageAdapter} from './reducer';
import {profileFeature} from '@tt/data-access/profile';

const {selectAll: selectAllForChat} = chatAdapter.getSelectors();
const {selectAll: selectAllForChatMessages} = chatMessageAdapter.getSelectors();

export const selectChats = createSelector(
  chatFeature.selectChats,
  selectAllForChat
)

export const selectChatsMessages = createSelector(
  chatFeature.selectChatMessages,
  selectAllForChatMessages
)

export const selectChat = createSelector(
  chatFeature.selectChat,
  selectChatsMessages,
  profileFeature.selectProfile,
  (chat, messages, profile) => {
    if (!chat || !profile) return null;

    return {
      ...chat,

      companion:
        profile.id === chat.userFirst.id
          ? chat.userSecond
          : chat.userFirst,

      messages: messages
        .filter(message => message.personalChatId === chat.id)
        .map(message => {
          const user =
            message.userFromId === chat.userFirst.id
              ? chat.userFirst
              : chat.userSecond;

          return {
            ...message,
            user,
            isMySide: message.userFromId === profile.id,
          };
        }),
    };
  }
);


export const selectSearchFilter = chatFeature.selectSearchFilter;
