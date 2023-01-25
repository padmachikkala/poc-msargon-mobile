import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { doctorProfile, userProfile } from '../utils/interfaces';
import { HeadersService } from './headers.service';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(
    private http: HttpClient,
    private headers: HeadersService,
    private storage: StorageService,
    private utils: UtilsService
  ) {}

  getSpecialties() {
    return this.http
      .get(baseUrl + '/prov/specializations', {
        headers: this.headers.normalHeaders(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  }

  getSymptoms() {
    return this.http
      .get(baseUrl + '/prov/symptoms', {
        headers: this.headers.normalHeaders(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  }

  getDiagnosis() {
    return this.http
      .get(baseUrl + '/prov/diagnosis', {
        headers: this.headers.normalHeaders(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  }

  postTreatedByDoc(TreatedByDoctor: any) {
    return this.http
      .post(baseUrl + '/saveDocSpecialization', TreatedByDoctor, {
        headers: this.headers.tokenHeaders(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  }

  getDoctors() {
    return this.http
      .get(baseUrl + '/prov/doctors', {
        headers: this.headers.normalHeaders(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  }

  getDoctorsBy(searchType: string, searchTypeId: number) {
    return this.http
      .get(
        baseUrl +
          `/prov/getDoctors?searchType='${searchType}'&searchTypeId=${searchTypeId}`,
        {
          headers: this.headers.normalHeaders(),
        }
      )
      .pipe(
        map((data) => {
          console.log(data, '>>>>>');
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  }

  saveDoctorProfile(profileBody: doctorProfile) {
    console.log(profileBody);
    return this.http
      .post(baseUrl + '/saveDocProfile', profileBody, {
        headers: this.headers.tokenHeaders(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  }

  saveUserProfile(profileBody: userProfile) {
    return this.http
      .post(baseUrl + '/saveProfile', profileBody, {
        headers: this.headers.tokenHeaders(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  }
}
