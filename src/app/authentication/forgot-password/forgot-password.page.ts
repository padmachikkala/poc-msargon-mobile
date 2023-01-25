import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimateService } from 'src/app/services/animate.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';
import { forgot } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public forgotData: forgot = { email: '' };
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private animate: AnimateService,
    private utils: UtilsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  checkEmailExist(e: any) {
    this.animate.animateButton(e);
    console.log(e);
    let isValid = this.utils.ValidateEmail(this.forgotData.email);

    if (isValid) {
      this.authService
        .forgotPassword(this.forgotData.email)
        .subscribe((response: any) => {
          const naviagtionExtras: NavigationExtras = {
            queryParams: {
              Email: this.forgotData.email,
            },
          };

          if (response.status === true) {
            this.router.navigateByUrl('/verification', naviagtionExtras);
          } else {
            this.utils.toast(response.status);
          }
        });
    } else {
      if (this.forgotData.email === '') {
        this.utils.toast('Please enter your email');
      } else {
        this.utils.toast('Please enter a valid email address');
      }
    }
  }
}
