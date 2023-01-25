import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimateService } from 'src/app/services/animate.service';
import { MainService } from 'src/app/services/main.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { userProfile } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  public userProfile: userProfile = {
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    userId: 0,
    state: '',
    city: '',
  };

  constructor(
    private utils: UtilsService,
    private animate: AnimateService,
    private main: MainService,
    private storage: StorageService,
    private router: Router
  ) {
    this.utils.getUserDetails().then((response) => {
      this.userProfile.userId = parseInt(response.userId);
    });
  }

  ngOnInit() {
    console.log(this.userProfile);
  }

  handleState(e: any) {
    this.userProfile.state = e.target.value;
  }

  handleCity(e: any) {
    this.userProfile.city = e.target.value;
  }

  handleGender(e: any) {
    this.userProfile.gender = e.target.value;
  }

  submit(e: any) {
    this.animate.animateButton(e);
    console.log(this.userProfile);
    this.main.saveUserProfile(this.userProfile).subscribe((response) => {
      console.log(response);
      this.storage.store('pedited', 'edited');
      this.router.navigateByUrl('/home');
    });
  }
}
