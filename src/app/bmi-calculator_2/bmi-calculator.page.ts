import { Component, NgZone } from '@angular/core';
import { IonicModule, ModalController, Platform } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { App } from '@capacitor/app';
import { ResultModalComponent } from './result-modal.component';

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
    private modalCtrl: ModalController,
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

  async calculateBMI() {
    try {
      this.ngZone.run(async () => {
        this.triedCalculate = true;
        console.log('calculateBMI called', { weight: this.weight, height: this.height });
        
        if (!this.weight || !this.height || this.weight <= 0 || this.height <= 0) {
          const modal = await this.modalCtrl.create({
            component: ResultModalComponent,
            componentProps: {
              bmiResult: 0,
              bmiCategory: 'Por favor, ingrese valores válidos.'
            },
            breakpoints: [0, 1],
            initialBreakpoint: 1
          });
          return await modal.present();
        }

        const heightM = this.height / 100;
        this.bmiResult = +(this.weight / (heightM * heightM)).toFixed(2);
        this.setCategory();
        
        const modal = await this.modalCtrl.create({
          component: ResultModalComponent,
          componentProps: {
            bmiResult: this.bmiResult,
            bmiCategory: this.bmiCategory
          },
          breakpoints: [0, 1],
          initialBreakpoint: 1
        });
        await modal.present();
      });
    } catch (error) {
      console.error('Error en calculateBMI:', error);
    }
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
