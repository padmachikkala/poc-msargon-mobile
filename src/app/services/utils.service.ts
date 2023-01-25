import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private userId: string = '';

  constructor(
    private toastController: ToastController,
    private storage: StorageService
  ) {}

  async getUserDetails(): Promise<any> {
    const userDetails = await this.storage.get('userDetails');
    return JSON.parse(userDetails);
  }

  async getUserId() {
    const response = await this.getUserDetails();
    this.userId = response?.userId;
    console.log(this.userId);
    return this.userId;
  }

  toast(message: string) {
    this.toastController
      .create({
        color: 'dark',
        duration: 2000,
        message: message,
        translucent: true,
        animated: true,
      })
      .then((toast) => {
        toast.present();
      });
  }

  ValidateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    this.toast('Please enter a valid email address');
    return false;
  }
}
