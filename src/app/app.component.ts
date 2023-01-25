import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AuthenticationService } from './services/authentication.service';
import { HeadersService } from './services/headers.service';
import { StorageService } from './services/storage.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public userName: string = '';
  public userEmail: string = '';
  public Role: string = '/d';

  options: AnimationOptions = {
    path: '/assets/Lottie/G2SnlNwEHm.json',
  };

  public appPages = [
    {
      title: 'Home',
      url: 'home',
      image: '/assets/sidebar-top/house.png',
    },
    {
      title: 'Edit Profile',
      url: 'user-profile',
      image: '/assets/sidebar-bottom/user.png',
    },
    {
      title: 'Symptoms',
      url: 'symptoms',
      image: '/assets/sidebar-top/symptom.png',
    },
    {
      title: 'Diagnosis',
      url: 'diagnosis',
      image: '/assets/sidebar-top/diagnosis.png',
    },
    {
      title: 'Specialization',
      url: 'specialties',
      image: '/assets/sidebar-top/special.png',
    },
    {
      title: 'Appointments',
      url: 'appointments',
      image: '/assets/sidebar-top/appointments.png',
    },
    {
      title: 'Orders',
      url: 'orders',
      image: '/assets/sidebar-top/orders.png',
    },
    {
      title: 'My Doctors',
      url: 'my-doctors',
      image: '/assets/sidebar-top/doctor.png',
    },
    {
      title: 'Medical Records',
      url: 'medicalrecords',
      image: '/assets/sidebar-top/records.png',
    },
    {
      title: 'Prescription Pad',
      url: 'prescription-pad',
      image: '/assets/sidebar-top/compose.png',
    },
    {
      title: 'Consultations',
      url: 'consultations',
      image: '/assets/sidebar-top/consultation.png',
    },
  ];

  public login = [
    {
      title: 'Login',
      url: 'login',
      image: '/assets/sidebar-top/login.png',
    },
  ];

  public labels = [
    {
      text: 'Help Center',
      image: '/assets/sidebar-bottom/help.png',
    },
    {
      text: 'Settings',
      image: '/assets/sidebar-bottom/settings.svg',
    },
    {
      text: 'Like us? GIve us 5 stars',
      image: '/assets/sidebar-bottom/like.png',
    },
    {
      text: 'Are you a doctor',
      image: '/assets/sidebar-bottom/doctor.png',
    },
  ];

  public footer = [
    {
      text: 'Logout',
      image: '/assets/sidebar-bottom/logout.png',
    },
  ];

  constructor(
    private storage: StorageService,
    private auth: AuthenticationService,
    private header: HeadersService,
    private utils: UtilsService
  ) {
    this.storage.get('currentUser').then((data) => {
      console.log(JSON.parse(data));
      const userData = JSON.parse(data);
      this.userName = userData.sub.split('@')[0];
      this.userEmail = userData.sub;
    });

    this.header.getToken().then((token) => {
      console.log(token);
    });

    this.utils.getUserDetails().then((response) => console.log(response));
  }

  signout() {
    this.auth.logout();
  }
}
