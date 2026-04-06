import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'tt-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tt-post',
  }
})
export class PostComponent {

}
