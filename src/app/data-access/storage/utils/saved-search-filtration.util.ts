import {WebStorageService} from '../web-storage.service';
import {hasStorageValue} from './hasStorageValue.util';

import {StorageSearchFilterKeys, StorageType} from '@tt/shared/constants';

export function savedSearchFilter(webStorage: WebStorageService,
                                  key: StorageSearchFilterKeys,
                                  value: unknown,
                                  storage?: StorageType): any {
  if (!value) return;

  if (value && hasStorageValue(value)) {
    webStorage.setItem(key, value, storage);
  } else {
    webStorage.removeItem(key, storage);
  }
}
