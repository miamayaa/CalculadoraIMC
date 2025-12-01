import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class OnboardingPage {
  constructor(private router: Router) {}

  goToCalculator(): void {
    this.router.navigate(['/bmi-calculator']);
  }
}
