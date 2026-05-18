import {createSelector} from '@ngrx/store';

import {chatAdapter, chatFeature, chatMessageAdapter} from './reducer';

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
