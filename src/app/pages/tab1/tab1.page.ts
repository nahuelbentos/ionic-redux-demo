import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Usuario } from '../../interfaces/interfaces';
import { loadUsers } from '../../store/actions/users.actions';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  users: Usuario[];
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,) {}


  ionViewWillEnter(){
    this.store.dispatch( loadUsers()) ;
  }

  ionViewDidEnter() {
    this.subscription = this.store.select('users').subscribe( ({ users }) => this.users = users);
  }

}
