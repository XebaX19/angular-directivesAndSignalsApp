import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'user-info',
  templateUrl: './user-info-page.component.html',
  styles: [
  ]
})
export class UserInfoPageComponent implements OnInit  {
  private userService = inject(UsersService);
  public userId = signal(1);
  
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  
  //Propiedad computada
  public fullName = computed<string>(() => {
    if (!this.currentUser()) {
      return 'Usuario no encontrado';
    }

    return `${ this.currentUser()?.first_name } ${ this.currentUser()?.last_name }`;
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if (id <= 0) {
      return;
    }

    this.userId.set(id);
    this.currentUser.set(undefined);
    
    this.userService.getUserById(id)
      .subscribe({
        //El "next" es el próximo paso que se ejecuta en el "subscribe". El "complete" es una vez cerrado el subscribe...no devuelve más nada
        next: (user) => {
          this.currentUser.set(user); //Cuando no me interesa el valor anterior que tiene la signal, utilizar el SET
          this.userWasFound.set(true);
        },
        error: () => {
          this.currentUser.set(undefined);
          this.userWasFound.set(false);
        }
      });
  }
}
