import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./onboarding/onboarding.page').then(m => m.OnboardingPage)
  },
  {
    path: 'bmi-calculator',
    loadChildren: () => import('../app/bmi-calculator/bmi-calculator.module').then(m => m.BmiCalculatorPageModule)
  },
  {
    path: 'result',
    loadComponent: () => import('./result/result.page').then(m => m.ResultPage)
  }
];