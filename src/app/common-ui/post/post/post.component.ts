import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';

import {ButtonComponent, TtAvatarCircleComponent} from '@tt/ui-kit';
import {Post} from '@tt/data-access/post/post.interface';

@Component({
  selector: 'tt-post',
  imports: [
    TtAvatarCircleComponent,
    DatePipe,
    ButtonComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-post',
  }
})
export class PostComponent {
  readonly post = input<Post>();
}
