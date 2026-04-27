import {ChangeDetectionStrategy, Component, input, output, signal,} from '@angular/core';

import {ButtonComponent, SvgIconComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Avatar} from '@tt/data-access/profile';
import {DndDirective} from '@tt/directives/dnd.directive';

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
  }
})
export class AvatarUploadComponent {
  readonly avatarData = input<Avatar>();
  readonly avatarPreview = signal<string | null>(null);

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
