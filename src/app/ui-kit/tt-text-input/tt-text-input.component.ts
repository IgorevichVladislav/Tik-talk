import {ChangeDetectionStrategy, Component, inject, input, output, Renderer2} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Avatar} from '@tt/data-access/profile';

@Component({
  selector: 'tt-text-input',
  imports: [
    TtAvatarCircleComponent,
    ButtonComponent,
    FormsModule
  ],
  templateUrl: './tt-text-input.component.html',
  styleUrl: './tt-text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-tt-text-input',
    '[class.tt-text-input__comment]': `mode() === "comment"`
  }
})

export class TtTextInputComponent {
  private readonly r2 = inject(Renderer2);

  readonly placeholder = input<string>('Напишите сообщение')
  readonly avatarData = input<Avatar>();
  readonly mode = input<'post' | 'comment'>('post');

  readonly textSubmitted = output<string>();

  text = '';

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  createText() {
    const text = this.text.trim();
    if (!text) return;

    this.textSubmitted.emit(text);

    this.text = '';
  }
}
