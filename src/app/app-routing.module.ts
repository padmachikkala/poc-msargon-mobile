import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./authentication/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'providers-reg',
    loadChildren: () =>
      import('./authentication/providers-reg/providers-reg.module').then(
        (m) => m.ProvidersRegPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./authentication/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./authentication/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: 'verification',
    loadChildren: () =>
      import('./authentication/verification/verification.module').then(
        (m) => m.VerificationPageModule
      ),
  },
  {
    path: 'location-search',
    loadChildren: () =>
      import('./pages/location-search/location-search.module').then(
        (m) => m.LocationSearchPageModule
      ),
  },
  {
    path: 'symptoms',
    loadChildren: () =>
      import('./pages/symptoms/symptoms.module').then(
        (m) => m.SymptomsPageModule
      ),
  },
  {
    path: 'diagnosis',
    loadChildren: () =>
      import('./pages/diagnosis/diagnosis.module').then(
        (m) => m.DiagnosisPageModule
      ),
  },
  {
    path: 'specialties',
    loadChildren: () =>
      import('./pages/specialties/specialties.module').then(
        (m) => m.SpecialtiesPageModule
      ),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./pages/appointments/appointments.module').then(
        (m) => m.AppointmentsPageModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./pages/orders/orders.module').then((m) => m.OrdersPageModule),
  },
  {
    path: 'treated-by-doctor',
    loadChildren: () =>
      import('./pages/treated-by-doctor/treated-by-doctor.module').then(
        (m) => m.TreatedByDoctorPageModule
      ),
  },

  {
    path: 'my-doctors',
    loadChildren: () =>
      import('./pages/my-doctors/my-doctors.module').then(
        (m) => m.MyDoctorsPageModule
      ),
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
  },
  {
    path: 'doctor-profile',
    loadChildren: () =>
      import('./pages/doctor-profile/doctor-profile.module').then(
        (m) => m.DoctorProfilePageModule
      ),
  },
  {
    path: 'prescription-pad',
    loadChildren: () => import('./pages/prescription-pad/prescription-pad.module').then( m => m.PrescriptionPadPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
