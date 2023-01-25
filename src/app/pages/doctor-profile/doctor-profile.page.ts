import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimateService } from 'src/app/services/animate.service';
import { MainService } from 'src/app/services/main.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { doctorProfile } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {
  public doctorProfile: doctorProfile = {
    doctorId: '',
    firstName: '',
    lastName: '',
    professionalStatement: '',
    practicingFrom: '',
    userLoginId: '',
    age: '',
    gender: '',
    state: '',
    city: '',
    qualification: '',
    languages: '',
    consultation_fee: '',
  };

  public Age: number[] = [];

  constructor(
    private utils: UtilsService,
    private animate: AnimateService,
    private main: MainService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    for (let i = 1; i <= 100; i++) {
      this.Age.push(i);
    }
  }

  handleState(e: any) {
    this.doctorProfile.state = e.target.value;
  }

  handleCity(e: any) {
    this.doctorProfile.city = e.target.value;
  }

  handleGender(e: any) {
    this.doctorProfile.gender = e.target.value;
  }

  handleFrom(e: any) {
    this.doctorProfile.practicingFrom = e.target.value;
  }

  submit(e: any) {
    this.animate.animateButton(e);

    this.main.saveDoctorProfile(this.doctorProfile).subscribe((response) => {
      console.log(response);
      this.storage.store('edited', 'edited');
      this.router.navigateByUrl('/home');
    });
  }
}
