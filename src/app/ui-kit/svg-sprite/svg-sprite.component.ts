import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href()"></svg:use>',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  icon = input<string | null>(null);

  href = computed(() => {
    const icon = this.icon();
    return `/assets/svg/${icon}.svg#${icon}`;
  })
}
