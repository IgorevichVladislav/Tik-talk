import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {Store} from '@ngrx/store';

import {postActions, selectSubscriptionsPosts} from '@tt/data-access/post';
import {PostComponent} from '@tt/common-ui';
import {AutoResizeDirective} from '@tt/directives';

@Component({
  selector: 'tt-feed-page',
  imports: [
    PostComponent,
  ],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'tt-feed-page'},
  hostDirectives: [AutoResizeDirective]
})
export class FeedPageComponent {
  private readonly store = inject(Store);

  readonly subscriptionsPosts = this.store.selectSignal(selectSubscriptionsPosts);

  constructor() {
    effect(() => {
      this.store.dispatch(postActions.getMySubscriptionsPost());
    });
  }

}
