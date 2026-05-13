import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  Renderer2, signal
} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {EmojiEvent} from '@ctrl/ngx-emoji-mart/ngx-emoji';

import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Avatar} from '@tt/data-access/profile';
import {PickerComponent} from '@ctrl/ngx-emoji-mart';

export interface SubmittedValue {
  text: string;
  file?: File | null;
}

@Component({
  selector: 'tt-text-input',
  imports: [
    TtAvatarCircleComponent,
    ButtonComponent,
    FormsModule,
    PickerComponent
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

  readonly submitted = output<SubmittedValue>();

  showEmojiPicker = signal<boolean>(false);
  imagePreview = signal<string>('');

  text = '';
  image: File | null = null;

  onTextareaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  createText() {
    const text = this.text.trim();
    const image = this.image;
    if (!text && !image) return;

    this.submitted.emit({text, file: image});

    this.text = '';
    this.image = null;
    this.imagePreview.set('');
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file || !file?.type.match('image')) return;

    const reader = new FileReader();
    reader.onload = event => {
      this.imagePreview.set(event.target?.result?.toString() as string);
    }
    reader.readAsDataURL(file);

    this.image = file;

  }

  addEmoji(event: EmojiEvent) {
    this.text += event.emoji.native;
  }

  readonly emojiI18n = {
    search: 'Поиск',
    emojilist: 'Список эмодзи',
    notfound: 'Эмодзи не найдены',
    clear: 'Очистить',

    categories: {
      search: 'Результаты поиска',
      recent: 'Недавние',
      people: 'Смайлы и люди',
      nature: 'Животные и природа',
      foods: 'Еда и напитки',
      activity: 'Активность',
      places: 'Путешествия и места',
      objects: 'Предметы',
      symbols: 'Символы',
      flags: 'Флаги',
      custom: 'Свои',
    },

    skintones: {
      1: 'Обычный тон кожи',
      2: 'Светлый тон кожи',
      3: 'Средне-светлый тон кожи',
      4: 'Средний тон кожи',
      5: 'Средне-тёмный тон кожи',
      6: 'Тёмный тон кожи',
    },
  };
}
