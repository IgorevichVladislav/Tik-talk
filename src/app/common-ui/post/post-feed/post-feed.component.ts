import {
  ChangeDetectionStrategy,
  Component,
  computed, DestroyRef,
  effect,
  ElementRef,
  inject,
  input, Renderer2,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, fromEvent} from 'rxjs';
import {Store} from '@ngrx/store';

import {PostComponent} from '../post/post.component';
import {Profile, selectProfile} from '@tt/data-access/profile';
import {PostCreateDto} from '@tt/data-access/post/post.interface';
import {postActions, selectPost, selectPosts} from '@tt/data-access/post/store';
import {SubmittedValue, TtTextInputComponent} from '@tt/ui-kit';

@Component({
  selector: 'tt-post-feed',
  imports: [
    TtTextInputComponent,
    PostComponent,
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-post-feed',
  }
})
export class PostFeedComponent {
  private readonly store = inject(Store);
  private readonly r2 = inject(Renderer2);
  private readonly hostElement = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly profile = input<Profile>();

  private readonly me = this.store.selectSignal(selectProfile);
  readonly posts = this.store.selectSignal(selectPosts);
  readonly post = this.store.selectSignal(selectPost);

  isMePostInput = computed(() => {
    const me = this.me();
    const profile = this.profile();

    if (!me || !profile) return;

    return me.id === profile.id;
  });

  constructor() {
    effect(() => {
      this.store.dispatch(postActions.getPosts({user_id: this.profile()!.id}));
    });
  }

  ngAfterViewInit() {
    this.resizePostFeed()

    fromEvent(window, 'resize')
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.resizePostFeed());
  }

  resizePostFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(event: SubmittedValue) {
    const authorId = this.profile()?.id;
    if (!authorId) return;

    const dto: PostCreateDto = {
      title: 'Посты Reptail',
      content: event.text,
      authorId
    }
    this.store.dispatch(postActions.submitPost({dto, image: event.file ?? null}));
  }
}
