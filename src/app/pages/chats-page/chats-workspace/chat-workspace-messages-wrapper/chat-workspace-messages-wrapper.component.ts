import {ChangeDetectionStrategy, Component} from '@angular/core';

import {ChatWorkspaceMessageComponent} from './chat-workspace-message/index';
import {TtTextInputComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-chat-workspace-messages-wrapper',
  imports: [
    ChatWorkspaceMessageComponent,
    TtTextInputComponent
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapperComponent {

}
