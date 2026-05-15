import {createSelector} from '@ngrx/store';

import {chatAdapter, chatFeature} from './reducer';

const {selectAll} = chatAdapter.getSelectors();

export const selectChats = createSelector(
  chatFeature.selectChats,
  selectAll
)
