import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent {

  //constructor(private fb: FormBuilder ) {}
  //Otra forma de hacer inyección de dependencias
  private fb = inject(FormBuilder); //envío la clase que quiero inyectar

  public color: string = 'green';

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.email]]
  });

  changeColor() {
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }
}
