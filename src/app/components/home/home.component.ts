import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth/auth.reducer';
import { selectName } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor( private store: Store<AuthState>) {
    this.store.select(selectName).subscribe(name => {
      this.userName = name
    })
  }
  
  userName: string | null = '';

}
