import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

interface doctorsInput {
  doctor: string;
}

@Component({
  selector: 'app-my-doctors',
  templateUrl: './my-doctors.page.html',
  styleUrls: ['./my-doctors.page.scss'],
})
export class MyDoctorsPage implements OnInit {
  public doctors: any = [];
  public doctorsCopy: any = [];
  public specializationsSearch: doctorsInput = { doctor: '' };

  constructor(private main: MainService, private router: Router) {
    const Params = this.router.getCurrentNavigation()!.extras.queryParams;

    if (!Params) {
      this.main.getDoctors().subscribe((response: any) => {
        console.log('response', response.doctors);
        this.doctors = response.doctors;
        this.doctorsCopy = response.doctors;
      });
    } else {
      this.doctors = Params?.['doctors']['doctorsList'];
    }
  }

  ngOnInit() {}

  searchDocAndSpec(event: any) {
    const filter = event.target.value
      ?.toLowerCase()
      .replace(/\s\s+/g, ' ')
      .trim();
    console.log(filter);
    if (!filter) {
      return (this.doctors = this.doctorsCopy);
    }

    this.doctors = this.doctors.filter(
      (d: {
        firstName: any;
        lastName: any;
        qualification: any;
        city: any;
        symptomDescription: string;
      }) => {
        if (d.firstName || d.lastName || d.qualification || d.city) {
          this.doctors = this.doctorsCopy;
          return (
            d.firstName?.toLowerCase().indexOf(filter) > -1 ||
            d.lastName?.toLowerCase().indexOf(filter) > -1 ||
            d.qualification?.toLowerCase().indexOf(filter) > -1 ||
            d.city?.toLowerCase().indexOf(filter) > -1
          );
        } else {
          return (this.doctors = this.doctorsCopy);
        }
      }
    );
  }
}
