import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

interface diagnosisInput {
  diagnosis: string;
}

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.page.html',
  styleUrls: ['./diagnosis.page.scss'],
})
export class DiagnosisPage implements OnInit {
  public Diagnosis: any = [];
  public diagnosisCopy: any = [];
  public diagnosisSearch: diagnosisInput = { diagnosis: '' };

  constructor(private main: MainService) {}

  ngOnInit(): void {
    this.main.getDiagnosis().subscribe((response: any) => {
      this.Diagnosis = response.diagnosis;
      this.diagnosisCopy = response.diagnosis;
    });
  }

  searchDiagnosis(event: any) {
    const filterDiagnosis = event.target.value
      .toLowerCase()
      .replace(/\s\s+/g, ' ')
      .trim();

    if (!filterDiagnosis) {
      return (this.Diagnosis = this.diagnosisCopy);
    }

    this.Diagnosis = this.Diagnosis.filter(
      (d: { diagnosisDescription: string }) => {
        if (d.diagnosisDescription) {
          this.Diagnosis = this.diagnosisCopy;
          return (
            d.diagnosisDescription.toLowerCase().indexOf(filterDiagnosis) > -1
          );
        } else {
          return (this.Diagnosis = this.diagnosisCopy);
        }
      }
    );
  }
}
