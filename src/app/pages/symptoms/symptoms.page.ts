import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

interface symptomsInput {
  symptoms: string;
}

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})
export class SymptomsPage implements OnInit {
  public symptoms: any = [];
  public symptomsCopy: any = [];
  public specializationsSearch: symptomsInput = { symptoms: '' };

  constructor(private main: MainService) {}

  ngOnInit() {
    this.main.getSymptoms().subscribe((response: any) => {
      this.symptoms = response.symptoms;
      this.symptomsCopy = response.symptoms;
    });
  }

  searchSymptoms(event: any) {
    const filterDiagnosis = event.target.value
      .toLowerCase()
      .replace(/\s\s+/g, ' ')
      .trim();

    if (!filterDiagnosis) {
      return (this.symptoms = this.symptomsCopy);
    }

    this.symptoms = this.symptoms.filter(
      (d: { symptomDescription: string }) => {
        if (d.symptomDescription) {
          this.symptoms = this.symptomsCopy;
          return (
            d.symptomDescription.toLowerCase().indexOf(filterDiagnosis) > -1
          );
        } else {
          return (this.symptoms = this.symptomsCopy);
        }
      }
    );
  }
}
