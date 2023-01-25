import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MainService } from '../services/main.service';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
  SwiperOptions,
} from 'swiper';
import { NavigationExtras, Router } from '@angular/router';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 10,
  };
  public bannerImages = [
    { img: 'assets/home/kidney.png', name: 'Kidney' },
    { img: 'assets/home/liver.png', name: 'Liver' },
    { img: 'assets/home/lungs.png', name: 'Lungs' },
    { img: 'assets/home/stomach.png', name: 'Stomach' },
  ];

  public services = [
    { img: 'assets/service/appointment.jpg', name: 'Book Appointment' },
    { img: 'assets/service/surgery.jpg', name: 'Surgeries' },
    { img: 'assets/service/lab-test.jpg', name: 'Lab Tests' },
    { img: 'assets/service/delivery.jpg', name: 'Medicine Delivery' },
  ];

  public symptoms: any = [];
  public specializations: any = [];
  public Diagnosis: any = [];

  constructor(private main: MainService, private router: Router) {}

  ngOnInit(): void {
    this.main.getSymptoms().subscribe((response: any) => {
      this.symptoms = response.symptoms;
    });
    this.main.getSpecialties().subscribe((response: any) => {
      this.specializations = response.specializations;
    });
    this.main.getDiagnosis().subscribe((response: any) => {
      this.Diagnosis = response.diagnosis;
    });
  }

  getDoctors(searchType: string, searchTypeId: number) {
    this.main
      .getDoctorsBy(searchType, searchTypeId)
      .subscribe((response: any) => {
        const naviagtionExtras: NavigationExtras = {
          queryParams: {
            doctors: response,
          },
        };

        this.router.navigateByUrl('/my-doctors', naviagtionExtras);
      });
  }
}
