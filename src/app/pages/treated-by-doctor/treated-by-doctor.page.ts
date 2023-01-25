import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-treated-by-doctor',
  templateUrl: './treated-by-doctor.page.html',
  styleUrls: ['./treated-by-doctor.page.scss'],
})
export class TreatedByDoctorPage implements OnInit {
  public specializations: any = [];
  public symptoms: any = [];
  public Diagnosis: any = [];
  private TreatedByDoctor: any = [];
  private userId: string = '';
  public checked: boolean = false;

  constructor(private main: MainService, private utils: UtilsService) {
    this.utils
      .getUserDetails()
      .then((response) => (this.userId = response.userId));
  }

  ngOnInit() {
    this.main.getSpecialties().subscribe((response: any) => {
      this.specializations = response.specializations;
    });
    this.main.getSymptoms().subscribe((response: any) => {
      this.symptoms = response.symptoms;
    });
    this.main.getDiagnosis().subscribe((response: any) => {
      this.Diagnosis = response.diagnosis;
    });
  }

  getTreatedByDoc(id: string, type: string, event: any) {
    if (event.checked) {
      this.TreatedByDoctor.push({
        userId: this.userId,
        specializationType: type,
        specializationTypeId: id,
      });
    } else {
      if (
        this.TreatedByDoctor.find(
          (treated: {
            specializationType: string;
            specializationTypeId: string;
          }) =>
            treated.specializationType == type &&
            treated.specializationTypeId == id
        )
      ) {
        this.TreatedByDoctor.splice(
          this.TreatedByDoctor.findIndex(
            (treated: {
              specializationType: string;
              specializationTypeId: string;
            }) =>
              treated.specializationType == type &&
              treated.specializationTypeId == id
          ),
          1
        );
      }
    }

    console.log(this.TreatedByDoctor);
  }

  submit() {
    this.main
      .postTreatedByDoc(this.TreatedByDoctor)
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
