import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo = '';
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private navController: NavController
    ) { }

  ngOnInit() {

    this.subscription = this.store.select('auth')
                                .subscribe( ({ authenticated }) =>
                                  (!authenticated) && this.navController.navigateRoot('/auth') );
  }

  ionViewDidLeave = () => this.subscription.unsubscribe();

  signOut = () => this.store.dispatch( logout());

}
