import { Component, NgZone } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.page.html',
  styleUrls: ['./bmi-calculator.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class BmiCalculatorPage {
  weight: number = 0;
  height: number = 0;
  bmiResult: number = 0;
  bmiCategory: string = '';
  triedCalculate: boolean = false;

  constructor(
    private router: Router,
    private platform: Platform,
    private ngZone: NgZone
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      App.addListener('appStateChange', ({ isActive }) => {
        this.ngZone.run(() => {
          if (isActive) {
            // La aplicación está activa
            console.log('App is active');
          } else {
            // La aplicación está en segundo plano
            console.log('App is inactive');
          }
        });
      });
    });
  }

  calculateBMI(): void {
    console.log('calculateBMI iniciado', { weight: this.weight, height: this.height });
    
    this.triedCalculate = true;
    
    if (!this.weight || !this.height || this.weight <= 0 || this.height <= 0) {
      console.log('Valores inválidos');
      alert('Por favor, ingrese valores válidos.');
      return;
    }

    const heightM = this.height / 100;
    this.bmiResult = +(this.weight / (heightM * heightM)).toFixed(2);
    this.setCategory();
    
    console.log('Resultado calculado:', { bmiResult: this.bmiResult, bmiCategory: this.bmiCategory });
    console.log('Navegando a página de resultados...');
    
    this.router.navigate(['/result'], {
      state: {
        bmiResult: this.bmiResult,
        bmiCategory: this.bmiCategory
      }
    });
  }

  setCategory() {
    if (this.bmiResult < 18.5) {
      this.bmiCategory = 'Bajo peso';
    } else if (this.bmiResult >= 18.5 && this.bmiResult < 25) {
      this.bmiCategory = 'Normal';
    } else if (this.bmiResult >= 25 && this.bmiResult < 30) {
      this.bmiCategory = 'Sobrepeso';
    } else {
      this.bmiCategory = 'Obesidad';
    }
  }
}
