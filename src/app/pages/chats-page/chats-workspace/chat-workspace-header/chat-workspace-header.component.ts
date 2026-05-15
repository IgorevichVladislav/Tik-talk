import {ChangeDetectionStrategy, Component} from '@angular/core';

import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-chat-workspace-header',
  imports: [
    ButtonComponent,
    TtAvatarCircleComponent
  ],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-chat-workspace-header'}
})
export class ChatWorkspaceHeaderComponent {

}
