import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimateService } from 'src/app/services/animate.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Registration } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-providers-reg',
  templateUrl: './providers-reg.page.html',
  styleUrls: ['./providers-reg.page.scss'],
})
export class ProvidersRegPage implements OnInit {
  public showPassword: boolean = false;

  public registration: Registration = {
    fullName: '',
    username: '',
    mobileNumber: '',
    password: '',
    role: 'Doctor',
  };

  constructor(
    private router: Router,
    private animate: AnimateService,
    private auth: AuthenticationService,
    private utils: UtilsService
  ) {}

  ngOnInit() {}

  signup(e: any) {
    this.animate.animateButton(e);
    if (this.utils.ValidateEmail(this.registration.username) === false) {
      return;
    }

    this.auth.signUp(this.registration).subscribe((response) => {
      if (response.status === true) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
}
