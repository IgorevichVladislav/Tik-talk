import {Injectable} from '@angular/core';
import {StorageType} from '@tt/shared';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {
  private getStorage(storageType: StorageType): Storage {
    return storageType === StorageType.Local ? localStorage : sessionStorage;
  }

  setItem<T>(key: string, value: T, storageType: StorageType = StorageType.Local) {
    const storage = this.getStorage(storageType)
    if (value === null) {
      storage.removeItem(key);
      return;
    }

    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    storage.setItem(key, stringValue);
  }

  getItem(key: string, storageType: StorageType = StorageType.Local) {
    const storage = this.getStorage(storageType);

    const data = storage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch {
      return data as string;
    }
  }

  removeItem(key: string, storageType: StorageType = StorageType.Local): void {
    const storage = this.getStorage(storageType);
    storage.removeItem(key);
  }
}
