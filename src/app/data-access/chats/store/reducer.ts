import {createFeature, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

import {chatActions} from './actions';
import {Chat, ChatMessage, LastChatMessage} from '../chats.interface';

export const chatAdapter = createEntityAdapter<LastChatMessage>({
  selectId: chat => chat.id,
})

export const chatMessageAdapter = createEntityAdapter<ChatMessage>({
  selectId: message => message.id
})

export interface ChatState {
  chats: EntityState<LastChatMessage>;
  chat: Chat | null;
  chatMessages: EntityState<ChatMessage>
  chatMessage: ChatMessage | null;
  searchFilter: string
}

export const chatInitialState: ChatState = {
  chats: chatAdapter.getInitialState(),
  chat: null,
  chatMessages: chatMessageAdapter.getInitialState(),
  chatMessage: null,
  searchFilter: ''
}

export const chatFeature = createFeature({
  name: 'chatFeature',
  reducer: createReducer(
    chatInitialState,

    on(chatActions.createChatSuccess,
      chatActions.readChatSuccess, (state, {chat}) => {
        return {
          ...state,

          chat: {
            ...chat,
            messages: []
          },

          chatMessages: chatMessageAdapter.setAll(chat.messages ?? [], state.chatMessages)
        }
      }),

    on(chatActions.chatsLoaded, (state, {chats}) => {
      return {
        ...state,
        chats: chatAdapter.setAll(chats, state.chats)
      }
    }),

    on(chatActions.searchChatsFilter, (state, {searchValue}) => {
      return {
        ...state,
        searchFilter: searchValue.toLowerCase()
      }
    }),

    on(chatActions.sendMessageSuccess, (state, {message}) => {
      return {
        ...state,
        chatMessages: chatMessageAdapter.addOne(message, state.chatMessages)
      }
    }),

    on(chatActions.messageLoaded, (state, {message}) => {
      return {
        ...state,
        chatMessages: chatMessageAdapter.setOne(message, state.chatMessages)
      }
    }),

    on(chatActions.patchMessageSuccess, (state, {message}) => {
      return {
        ...state,
        chatMessages: chatMessageAdapter.updateOne(
          {
            id: message.id,
            changes: {
              text: message.text,
              updatedAt: message.updatedAt
            }
          },
          state.chatMessages)
      }
    }),

    on(chatActions.deleteMessageSuccess, (state, {message_id}) => {
      return {
        ...state,
        chatMessages: chatMessageAdapter.removeOne(message_id, state.chatMessages)
      }
    })
  )
});
