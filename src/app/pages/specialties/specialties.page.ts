import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

interface specializationsInput {
  specializations: string;
}

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.page.html',
  styleUrls: ['./specialties.page.scss'],
})
export class SpecialtiesPage implements OnInit {
  public specializations: any = [];
  public specializationsCopy: any = [];
  public specializationsSearch: specializationsInput = { specializations: '' };

  constructor(private main: MainService) {}

  ngOnInit(): void {
    this.main.getSpecialties().subscribe((response: any) => {
      this.specializations = response.specializations;
      this.specializationsCopy = response.specializations;
    });
  }

  searchSpecializations(event: any) {
    const filterDiagnosis = event.target.value
      .toLowerCase()
      .replace(/\s\s+/g, ' ')
      .trim();

    if (!filterDiagnosis) {
      return (this.specializations = this.specializationsCopy);
    }

    this.specializations = this.specializations.filter(
      (d: { specializationName: string }) => {
        if (d.specializationName) {
          this.specializations = this.specializationsCopy;
          return (
            d.specializationName.toLowerCase().indexOf(filterDiagnosis) > -1
          );
        } else {
          return (this.specializations = this.specializationsCopy);
        }
      }
    );
  }
}
