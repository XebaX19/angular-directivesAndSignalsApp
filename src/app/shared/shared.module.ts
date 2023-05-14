import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';



@NgModule({
  declarations: [
    CustomLabelDirective  //Cada directiva personalizada debe ser declarada como un como un componente
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomLabelDirective  //Si quiero utilizar mi directiva personalizada en otro módulo la debo exportar
  ]
})
export class SharedModule { }
