import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'properties',
  templateUrl: './properties-page.component.html',
  styles: [
  ]
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  });

  public fullName = computed<string>(() => {
    if (!this.user()) {
      return 'Usuario no encontrado';
    }

    return `${ this.user()?.first_name } ${ this.user()?.last_name }`;
  });

  //Efectos (como una propiedad computada, con la excepción de que únicamente tiene un callback...y es lo que se ejecutará cada vez que la dependencia cambia)
  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${ this.counter() }`);
  });

  public counter = signal(10);

  ngOnInit(): void {
    //Demostración limpieza automática del "effect"
    //Ver que cuando salgo de la página Propiedades, no sigue emitiendo valores
    setInterval(() => {
      this.counter.update(current => current + 1);
    }, 1000);
    //Tener en cuenta que el setInterval se sigue ejecutando porque eso si lo deberiamos limpiar en un ngOnDestroy
    //Pero el effect (que tiene un console.log) se limpia automáticamente al salir del componente
  }

  ngOnDestroy(): void {
    //El destroy del efecto es automático...no hace falta ejecutarlo manualmente
    //this.userChangedEffect.destroy();
  }

  onFieldUpdated(field: keyof User, value: string) {
    //Una forma de hacerlo sin signals
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // });

    //Otra forma de hacerlo con "Update"
    // this.user.update(current => {
    //   //Lo que retorna el "update" es el nuevo valor de la signal
    //   return {
    //     ...current,
    //     [field]: value
    //   }
    // });

    //Forma de hacerlo con "Mutaciones"
    //Cualquier mutación/cambio que suceda en el objeto "user" va a disparar un nuevo valor en la signal
    this.user.mutate(current => {
      switch (field) {
        case 'id':
          current.id = Number(value);
          break;
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
      
        default:
          break;
      }
    });

    //3 formas de actualizar una signal:
    //  - set: se olvida del anterior valor, reemplazo directo
    //  - update: el valor que retorno en el callback será el nuevo valor de la signal
    //  - mutate: cuando se hace una modificación en el objeto, se dispara la actualización
  }

  increaseBy(value: number) {
    this.counter.update(current => current + value);
  }
}
