import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimateService {
  constructor() {}

  animateButton(e: any) {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(() => {
      e.target.classList.remove('animate');
    }, 700);
  }

  bubblyButtons = document.getElementsByClassName('button');
}
