import {ChangeDetectionStrategy, Component, inject, input, Renderer2} from '@angular/core';

import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Avatar} from '@tt/data-access/profile';

@Component({
  selector: 'tt-text-input',
  imports: [
    TtAvatarCircleComponent,
    ButtonComponent
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-text-input'
  }
})
export class TextInputComponent {
  private readonly r2 = inject(Renderer2);

  readonly avatarData = input<Avatar>();

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLInputElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }
}
