import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  //Menu tradicional
  // public menuItems: MenuItem[] = [
  //   { title: 'Contador', route: 'counter' },
  //   { title: 'Usuario', route: 'user-info' },
  //   { title: 'Mutaciones', route: 'properties' }
  // ];

  //Signals...ayuda a Angular a saber que es lo que se debe actualizar/renderizar al haber algún cambio asociado a una signal
  //Esto lo hace mucho más rápido al no tener que recorrer todos los elementos en el ciclo de detección de cambios
  //(directamente vuelve a renderizar el elemento en particular sin recorrer todos los demás)

  //Menu con signals
  //Cada vez que se modifique "menuItems" Angular sabrá donde actualizar/renderizar al estar vinculado a una signal
  public menuItems = signal<MenuItem[]>([ //Defino el tipo de dato que manejará la signal
    { title: 'Contador', route: 'counter' },
    { title: 'Usuario', route: 'user-info' },
    { title: 'Mutaciones', route: 'properties' }
  ]);

}
