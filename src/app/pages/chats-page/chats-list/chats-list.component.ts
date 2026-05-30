import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, startWith} from 'rxjs';
import {Store} from '@ngrx/store';

import {ChatBtnComponent} from '../chat-btn/chat-btn.component';
import {chatActions, selectChats, selectSearchFilter} from '@tt/data-access/chats';
import {WebStorageService} from '@tt/data-access/storage/web-storage.service';
import {StorageSearchFilterKeys, StorageType} from '@tt/shared/constants';
import {AutoResizeDirective} from '@tt/directives';
import {TtInputComponent} from '@tt/ui-kit';

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
  private readonly webStorage = inject(WebStorageService);

  private readonly searchFilterKey = StorageSearchFilterKeys.ChatSearchFilterKey;
  private readonly getSearchValue = this.webStorage.getItem(this.searchFilterKey, StorageType.Session) ?? '';

  private readonly chatsSearchFilter = this.store.selectSignal(selectSearchFilter);
  readonly chats = this.store.selectSignal(selectChats);

  readonly filterChatControl = new FormControl<string>(this.getSearchValue);

  constructor() {

    this.filterChatControl.valueChanges
      .pipe(
        startWith(this.filterChatControl.getRawValue()),
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(searchValue => {
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
