import {ChangeDetectionStrategy, Component, ElementRef, inject, input, output, signal, viewChild,} from '@angular/core';

import {ButtonComponent, SvgIconComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Avatar, profileActions} from '@tt/data-access/profile';
import {DndDirective} from '@tt/directives/dnd.directive';
import {Store} from '@ngrx/store';

@Component({
  selector: 'tt-avatar-upload',
  imports: [
    TtAvatarCircleComponent,
    SvgIconComponent,
    DndDirective,
    ButtonComponent
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-avatar-upload',
    '(mouseover)': 'removeAvatar.set(true)',
    '(mouseleave)': 'removeAvatar.set(false)',
  }
})
export class AvatarUploadComponent {
  readonly avatarData = input<Avatar>();
  readonly avatarPreview = signal<string | null>(null);

  readonly removeAvatar = signal<boolean>(false);
  readonly deleteAvatarHandler = output();

  avatarFile: File | null = null;

  private processFile(file: File | null | undefined) {
    if (!file || !file?.type.match('image')) return;

    const reader = new FileReader();
    reader.onload = event => {
      this.avatarPreview.set(event.target?.result?.toString() ?? '');
    }

    reader.readAsDataURL(file);
    this.avatarFile = file;
  }

  onChooseImage(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);
  }

  onDroppedFile(file: File) {
    this.processFile(file);
  }
}
