import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bmi-calculator',
    pathMatch: 'full'
  },
  {
    path: 'bmi-calculator',
    loadChildren: () => import('../app/bmi-calculator/bmi-calculator.module').then(m => m.BmiCalculatorPageModule)
  }
];