import {inject, Pipe, PipeTransform} from '@angular/core';
import {BASE_API_URL} from '@tt/tokens/base-api-url.token';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {
  private readonly baseApiUrl = inject(BASE_API_URL);

  transform(value: string | null): string | null {
    if (!value) return 'assets/svg/user-placeholder';
    return `${this.baseApiUrl}/${value}`;
  }

}
