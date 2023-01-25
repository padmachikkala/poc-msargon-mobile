import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimateService } from 'src/app/services/animate.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';
import { reset } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public showNewPassword: boolean = false;
  public showConfirmPassword: boolean = false;

  public ResetData: reset = {
    forgotData: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private router: Router,
    private animate: AnimateService,
    private authService: AuthenticationService,
    private utils: UtilsService
  ) {
    const emailParams = this.router.getCurrentNavigation()!!.extras.queryParams;
    this.ResetData.forgotData = emailParams?.['Email'];
  }

  ngOnInit() {}

  onPasswordNewToggle(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  onPasswordConfirmToggle(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  reset(e: any) {
    this.animate.animateButton(e);

    if (this.ResetData.newPassword === '') {
      this.utils.toast('please enter new password');
      return;
    } else if (this.ResetData.confirmPassword === '') {
      this.utils.toast('please conform your password');
      return;
    }

    if (this.ResetData.newPassword === this.ResetData.confirmPassword) {
      this.authService
        .resetPassword(
          this.ResetData.forgotData,
          this.ResetData.confirmPassword
        )
        .subscribe((response) => {
          this.router.navigateByUrl('/login', { replaceUrl: true });
        });
    } else {
      this.utils.toast("Password doesn't matched");
    }
  }
}
