import {ChangeDetectionStrategy, Component} from '@angular/core';

import {ChatWorkspaceHeaderComponent} from './chat-workspace-header/index';
import {ChatWorkspaceMessagesWrapperComponent} from './chat-workspace-messages-wrapper/index';

@Component({
  selector: 'tt-chats-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent
  ],
  templateUrl: './chats-workspace.component.html',
  styleUrl: './chats-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsWorkspaceComponent {

}
