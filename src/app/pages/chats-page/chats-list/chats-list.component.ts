import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, startWith} from 'rxjs';
import {Store} from '@ngrx/store';

import {ChatBtnComponent} from '../chat-btn/chat-btn.component';
import {TtInputComponent} from '@tt/ui-kit';
import {chatActions, selectChats, selectSearchFilter} from '@tt/data-access/chats';
import {AutoResizeDirective} from '@tt/directives/auto-resize.directive';

@Component({
  selector: 'tt-chats-list',
  imports: [
    TtInputComponent,
    ChatBtnComponent,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-chats-list'},
  hostDirectives: [AutoResizeDirective],
})
export class ChatsListComponent {
  private readonly store = inject(Store);

  private readonly SEARCH_FILTER_VALUE_KEY = 'searchValue';
  private readonly getSearchValue = localStorage.getItem(this.SEARCH_FILTER_VALUE_KEY) ?? '';

  private readonly chatsSearchFilter = this.store.selectSignal(selectSearchFilter);
  readonly chats = this.store.selectSignal(selectChats);

  readonly filterChatControl = new FormControl<string>(this.getSearchValue, {
    nonNullable: true,
  });

  constructor() {

    this.filterChatControl.valueChanges
      .pipe(
        startWith(this.filterChatControl.value),
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(searchValue => {
        if (searchValue) {
          localStorage.setItem(this.SEARCH_FILTER_VALUE_KEY, searchValue);
        } else {
          localStorage.removeItem(this.SEARCH_FILTER_VALUE_KEY);
        }

        this.store.dispatch(chatActions.searchChatsFilter({searchValue}
        ))
      });
  }

  readonly filteredChats = computed(() => {
    const search = this.chatsSearchFilter();
    const chats = this.chats();

    if (!search) {
      return chats;
    }

    return chats.filter(chat => {
      return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`.toLowerCase().includes(search);
    });

  });
}
