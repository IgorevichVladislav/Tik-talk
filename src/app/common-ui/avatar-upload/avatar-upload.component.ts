import {ChangeDetectionStrategy, Component, ElementRef, inject, input, viewChild} from '@angular/core';

import {SvgIconComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Avatar} from '@tt/data-access/profile';

@Component({
  selector: 'tt-avatar-upload',
  imports: [
    TtAvatarCircleComponent,
    SvgIconComponent
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-avatar-upload',
  }
})
export class AvatarUploadComponent {
  //private readonly elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);

  fileInput = viewChild('fileInput', {read: ElementRef})

  readonly avatarData = input<Avatar>();
}
