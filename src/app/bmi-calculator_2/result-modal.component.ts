import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Resultado IMC</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="result-container">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Tu Índice de Masa Corporal</ion-card-subtitle>
            <ion-card-title class="bmi-value">{{ bmiResult }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="category-container" [ngClass]="getCategoryClass()">
              <ion-text>
                <h2>{{ bmiCategory }}</h2>
              </ion-text>
            </div>
            <div class="recommendation">
              <ng-container [ngSwitch]="true">
                <p *ngSwitchCase="bmiCategory.toLowerCase().includes('bajo')">
                  Es importante consultar con un profesional de la salud para desarrollar un plan de alimentación saludable que te ayude a alcanzar un peso adecuado.
                </p>
                <p *ngSwitchCase="bmiCategory.toLowerCase().includes('normal')">
                  ¡Excelente! Estás manteniendo un peso saludable. Continúa con tus buenos hábitos de alimentación y actividad física.
                </p>
                <p *ngSwitchCase="bmiCategory.toLowerCase().includes('sobrepeso')">
                  Considera incorporar más actividad física y una dieta balanceada. Un profesional de la salud puede ayudarte a desarrollar un plan personalizado.
                </p>
                <p *ngSwitchCase="bmiCategory.toLowerCase().includes('obesidad')">
                  Es recomendable consultar con un profesional de la salud para recibir orientación personalizada sobre hábitos saludables.
                </p>
              </ng-container>
            </div>
            <div class="info-text">
              <p>
                El IMC es una medida del peso corporal basada en el peso y la altura.
                <br>
                <small>
                  Rangos: <br>
                  Bajo peso: < 18.5 <br>
                  Normal: 18.5 - 24.9 <br>
                  Sobrepeso: 25 - 29.9 <br>
                  Obesidad: ≥ 30
                </small>
              </p>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
      <ion-button expand="block" color="primary" (click)="dismiss()">
        <ion-icon name="close-circle-outline" slot="start"></ion-icon>
        Cerrar
      </ion-button>
    </ion-content>
    <style>
      .result-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
      }
      .bmi-value {
        font-size: 3em;
        font-weight: bold;
        text-align: center;
        color: var(--ion-color-primary);
      }
      .category-container {
        text-align: center;
        padding: 12px;
        margin: 12px 0;
        border-radius: 8px;
      }
      .category-container h2 {
        margin: 0;
        font-size: 1.5em;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .recommendation {
        margin-top: 16px;
        padding: 12px;
        border-radius: 8px;
        background: var(--ion-color-light);
        font-size: 0.9em;
      }
      .info-text {
        margin-top: 16px;
        font-size: 0.9em;
        color: var(--ion-color-medium);
        text-align: center;
      }
      .info-text small {
        display: block;
        margin-top: 8px;
        text-align: left;
      }
      .bajo-peso { background: #fff3e0; color: #e65100; }
      .normal { background: #e8f5e9; color: #2e7d32; }
      .sobrepeso { background: #fff3e0; color: #ef6c00; }
      .obesidad { background: #ffebee; color: #c62828; }
    </style>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ResultModalComponent {
  bmiResult: number = 0;
  bmiCategory: string = '';

  constructor(private modalCtrl: ModalController) {}

  getCategoryClass(): string {
    const category = this.bmiCategory.toLowerCase();
    if (category.includes('bajo')) return 'bajo-peso';
    if (category.includes('normal')) return 'normal';
    if (category.includes('sobrepeso')) return 'sobrepeso';
    if (category.includes('obesidad')) return 'obesidad';
    return '';
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}