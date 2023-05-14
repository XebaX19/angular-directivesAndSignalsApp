import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'counter-page',
  templateUrl: './counter-page.component.html',
  styles: [
  ]
})
export class CounterPageComponent {

  public counter = signal(10);

  //signal computada: si el "counter" cambia, vuelve a realizar el calculo y luego renderizar este valor
  //Esta signal computada tiene la propiedad que es de solo lectura, no se pude modificar a manopla...siempre se utiliza la función computada que se le definió
  public squareCounter = computed(() => this.counter() * this.counter());

  increaseBy(value: number) {
    //Una forma de actualizar el valor de una signal: "set"
    //this.counter.set(this.counter() + value);

    //Otra forma de actualizar el valir de una signal: "update"
    this.counter.update(currentValue => currentValue + value);
  }
}
