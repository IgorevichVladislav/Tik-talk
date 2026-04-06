import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {TextInputComponent} from '../../text-input';
import {PostComponent} from '../post/post.component';
import {Profile} from '@tt/data-access/profile';

@Component({
  selector: 'tt-post-feed',
  imports: [
    TextInputComponent,
    PostComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-post-feed'
  }
})
export class PostFeedComponent {
  profile = input<Profile>();
}
