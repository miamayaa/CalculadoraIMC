import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-modal',
  template: `
    <ion-content class="result-modal-content" [ngClass]="getBackgroundClass()" [fullscreen]="true">
      <div class="modal-container">
        <h1 class="modal-title">Calculadora de IMC</h1>
        
        <div class="result-section">
          <p class="result-label">Su IMC</p>
          <h2 class="result-value">{{ bmiResult }}</h2>
          
          <div class="category-badge">
            <p class="category-text">{{ bmiCategory.toUpperCase() }}</p>
          </div>
          
          <div class="info-section">
            <p class="info-title">{{ getInfoTitle() }}</p>
            <p class="info-description">{{ getInfoDescription() }}</p>
            <p class="info-warning">{{ getInfoWarning() }}</p>
          </div>
        </div>

        <ion-button
          expand="block"
          class="close-button"
          (click)="dismiss()">
          Cerrar
        </ion-button>
      </div>
    </ion-content>
    <style>
      .result-modal-content {
        --background: #ffffff;
        
        &.bg-bajo-peso {
          --background: #f4a259 !important;
          background-color: #f4a259 !important;
        }
        &.bg-normal {
          --background: #ffffff !important;
          background-color: #ffffff !important;
        }
        &.bg-sobrepeso {
          --background: #f4a259 !important;
          background-color: #f4a259 !important;
        }
        &.bg-obesidad {
          --background: #e57373 !important;
          background-color: #e57373 !important;
        }
      }
      
      ion-content.result-modal-content {
        --background: #ffffff;
      }
      
      ion-content.bg-bajo-peso {
        --background: #f4a259 !important;
      }
      
      ion-content.bg-normal {
        --background: #ffffff !important;
      }
      
      ion-content.bg-sobrepeso {
        --background: #f4a259 !important;
      }
      
      ion-content.bg-obesidad {
        --background: #e57373 !important;
      }

      .modal-container {
        min-height: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 60px 24px 40px;
      }
      
      .bg-bajo-peso .modal-container {
        background-color: #f4a259;
      }
      
      .bg-normal .modal-container {
        background-color: #ffffff;
      }
      
      .bg-sobrepeso .modal-container {
        background-color: #f4a259;
      }
      
      .bg-obesidad .modal-container {
        background-color: #e57373;
      }

      .modal-title {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 40px;
      }

      .bg-bajo-peso .modal-title,
      .bg-sobrepeso .modal-title,
      .bg-obesidad .modal-title {
        color: #ffffff;
      }

      .bg-normal .modal-title {
        color: #000000;
      }

      .result-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 40px;
      }

      .result-label {
        font-size: 18px;
        margin: 0 0 8px;
        font-weight: 600;
      }

      .bg-bajo-peso .result-label,
      .bg-sobrepeso .result-label,
      .bg-obesidad .result-label {
        color: #ffffff;
      }

      .bg-normal .result-label {
        color: #000000;
      }

      .result-value {
        font-size: 64px;
        font-weight: 700;
        margin: 0 0 24px;
      }

      .bg-bajo-peso .result-value,
      .bg-sobrepeso .result-value,
      .bg-obesidad .result-value {
        color: #ffffff;
      }

      .bg-normal .result-value {
        color: #000000;
      }

      .category-badge {
        background-color: #ffffff;
        padding: 12px 32px;
        border-radius: 8px;
        margin-bottom: 32px;
      }

      .category-text {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
      }

      .bg-bajo-peso .category-text,
      .bg-sobrepeso .category-text {
        color: #f4a259;
      }

      .bg-normal .category-text {
        color: #4caf50;
      }

      .bg-obesidad .category-text {
        color: #e57373;
      }

      .info-section {
        text-align: center;
        margin-bottom: 40px;
      }

      .info-title {
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 12px;
      }

      .info-description {
        font-size: 14px;
        line-height: 1.5;
        margin: 0 0 16px;
      }

      .info-warning {
        font-size: 14px;
        line-height: 1.5;
        margin: 0;
      }

      .bg-bajo-peso .info-title,
      .bg-bajo-peso .info-description,
      .bg-bajo-peso .info-warning,
      .bg-sobrepeso .info-title,
      .bg-sobrepeso .info-description,
      .bg-sobrepeso .info-warning,
      .bg-obesidad .info-title,
      .bg-obesidad .info-description,
      .bg-obesidad .info-warning {
        color: rgba(255, 255, 255, 0.95);
      }

      .bg-normal .info-title,
      .bg-normal .info-description,
      .bg-normal .info-warning {
        color: #333333;
      }

      .close-button {
        --background: #ffffff !important;
        --color: #333333 !important;
        --border-radius: 8px;
        background-color: #ffffff !important;
        color: #333333 !important;
        font-weight: 600;
        font-size: 16px;
        height: 48px;
        margin: 0;
        text-transform: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      
      .close-button::part(native) {
        background: #ffffff !important;
        color: #333333 !important;
        border-radius: 8px;
        text-align: center;
        justify-content: center;
      }

      .bg-normal .close-button {
        --background: #e0e0e0 !important;
        --color: #333333 !important;
        background-color: #e0e0e0 !important;
      }
      
      .bg-normal .close-button::part(native) {
        background: #e0e0e0 !important;
      }
    </style>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ResultModalComponent {
  bmiResult: number = 0;
  bmiCategory: string = '';

  constructor(private modalCtrl: ModalController) {}

  getBackgroundClass(): string {
    const category = this.bmiCategory.toLowerCase();
    if (category.includes('bajo')) return 'bg-bajo-peso';
    if (category.includes('normal')) return 'bg-normal';
    if (category.includes('sobrepeso')) return 'bg-sobrepeso';
    if (category.includes('obesidad')) return 'bg-obesidad';
    return 'bg-normal';
  }

  getInfoTitle(): string {
    const category = this.bmiCategory.toLowerCase();
    if (category.includes('bajo')) return 'IMC menor a 18.5 = Bajo peso';
    if (category.includes('normal')) return 'IMC entre 18.5 y 24.9 = Peso normal';
    if (category.includes('sobrepeso')) return 'IMC entre 25 y 29.9 = Sobrepeso';
    if (category.includes('obesidad')) return 'IMC mayor a 30 = Obesidad';
    return '';
  }

  getInfoDescription(): string {
    const category = this.bmiCategory.toLowerCase();
    if (category.includes('bajo')) return 'Se considera con un peso no saludable para su altura.';
    if (category.includes('normal')) return 'Se considera con un peso saludable para su altura.';
    if (category.includes('sobrepeso')) return 'Se considera con un peso no saludable para su altura.';
    if (category.includes('obesidad')) return 'Se considera con un peso no saludable para su altura.';
    return '';
  }

  getInfoWarning(): string {
    return 'Puede tener un mayor riesgo ante enfermedades cardíacas.';
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }
}