import { Injectable } from '@angular/core';
// import { Storage } from '@capacitor/storage';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async store(storageKey: string, value: any) {
    await Preferences.set({
      key: storageKey,
      value: value,
    });
  }

  async get(storageKey: string): Promise<string> {
    const ret = await Preferences.get({ key: storageKey });
    if (ret.value) {
      return ret.value;
    } else {
      return '';
    }
  }

  async delete(storageKey: string) {
    await Preferences.remove({ key: storageKey });
  }

  async clear() {
    await Preferences.clear();
  }
}
