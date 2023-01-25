import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';
import { verify } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  public verificationData: verify = { token: '' };
  private forgotData: String = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private utils: UtilsService
  ) {
    const emailParams = this.router.getCurrentNavigation()!!.extras.queryParams;
    this.forgotData = emailParams?.['Email'];
  }

  ngOnInit() {}

  verify() {
    this.authService
      .verifyToken(this.verificationData.token)
      .subscribe((response: any) => {
        const naviagtionExtras: NavigationExtras = {
          queryParams: {
            Email: this.forgotData,
          },
        };
        if (response['status'] === 'validToken') {
          this.router.navigateByUrl('/reset-password', naviagtionExtras);
        } else {
          this.utils.toast(response.status);
        }
      });
  }
}
