import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href()"></svg:use>',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  readonly icon = input<string | null>(null);

  readonly href = computed(() => {
    const icon = this.icon();
    return `/assets/svg/${icon}.svg#${icon}`;
  })
}
