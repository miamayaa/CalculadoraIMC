import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ResultPage implements OnInit {
  bmiResult: number = 0;
  bmiCategory: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.bmiResult = navigation.extras.state['bmiResult'] || 0;
      this.bmiCategory = navigation.extras.state['bmiCategory'] || '';
    }
  }

  ngOnInit(): void {
    console.log('ResultPage loaded:', { bmiResult: this.bmiResult, bmiCategory: this.bmiCategory });
  }

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

  goBack(): void {
    this.router.navigate(['/bmi-calculator']);
  }
}
