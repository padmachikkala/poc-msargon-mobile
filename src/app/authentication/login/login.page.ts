import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimateService } from 'src/app/services/animate.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginSchema } from 'src/app/utils/interfaces';
import { Validators } from 'src/app/utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public showPassword: boolean = false;
  public isLoading: boolean = false;
  public eValid: boolean = false;
  private docEdited: string = '';
  private patEdited: string = '';
  private currentUser: string = '';

  public loginData: LoginSchema = {
    username: 'provider@gmail.com',
    password: 'test123',
  };

  constructor(
    private router: Router,
    private valid: Validators,
    private utils: UtilsService,
    private animate: AnimateService,
    private authService: AuthenticationService,
    private storage: StorageService
  ) {}

  ngOnInit() {}

  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  login(e: any) {
    this.storage
      .get('currentUser')
      .then((user: any) => (this.currentUser = JSON.parse(user).scope));

    this.storage.get('edited').then((data) => {
      console.log(data);
      this.docEdited = data;
    });

    this.storage.get('pedited').then((data) => {
      console.log(data);
      this.patEdited = data;
    });

    this.animate.animateButton(e);

    this.utils.ValidateEmail(this.loginData.username) &&
      this.loginData.password &&
      this.authService.login(this.loginData).subscribe((response: any) => {
        console.log(response.scope);

        if (response.status === 'Email does not exist') {
          this.utils.toast(response.status);
          return;
        } else {
          this.isLoading = true;
          if (this.docEdited !== 'edited' || this.patEdited !== 'edited') {
            if (this.currentUser === 'Doctor' && this.docEdited !== 'edited') {
              this.router.navigateByUrl('/doctor-profile');
            } else if (
              this.currentUser === 'Patient' &&
              this.patEdited !== 'edited'
            ) {
              this.router.navigateByUrl('/user-profile');
            } else {
              this.router.navigateByUrl('/home');
            }
          } else {
            this.router.navigateByUrl('/home');
          }
          this.isLoading = false;
        }
      });

    if (!this.loginData.password) {
      this.utils.toast('please enter your password');
    }
  }
}
