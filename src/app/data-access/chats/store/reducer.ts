import {createFeature, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

import {Chat} from '../chats.interface';
import {chatActions} from './actions';

export const chatAdapter = createEntityAdapter<Chat>({
  selectId: chat => chat.id,
})

export interface ChatState {
  chats: EntityState<Chat>;
  chat: Chat | null;
}

export const chatInitialState: ChatState = {
  chats: chatAdapter.getInitialState(),
  chat: null,
}

export const chatFeature = createFeature({
  name: 'chatFeature',
  reducer: createReducer(
    chatInitialState,

    on(chatActions.chatsLoaded, (state, {chats}) => {
      return {
        ...state,
        chats: chatAdapter.setAll(chats, state.chats)
      }
    })
  )
});
