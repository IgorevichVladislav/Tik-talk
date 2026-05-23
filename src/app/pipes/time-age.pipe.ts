import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    format?: string,
    timeZone?: string
  ): string {
    if (!value) {
      return 'Дата неизвестна';
    }

    let date = DateTime.fromISO(value, { zone: 'utc' });

    if (timeZone) {
      date = date.setZone(timeZone);
    } else {
      date = date.toLocal();
    }

    if (!date.isValid) {
      return 'Неверная дата';
    }

    if (format) {
      return date.toFormat(format);
    }

    return date.toRelative({
      locale: 'ru',
      style: 'short',
      round: true,
    }) ?? date.toFormat('HH:mm dd.MM.yyyy');
  }
}
