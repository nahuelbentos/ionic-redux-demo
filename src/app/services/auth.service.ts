import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { environment } from '../../environments/environment';
import { IAuthenticate, IAuthenticateExternal } from '../interfaces/interfaces';
import * as firebase from 'firebase';
import { AppState } from '@capacitor/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = null;

  constructor(
    private auth: AngularFireAuth,
    private store: Store<AppState>,
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController
    ) {
      this.init();
    }

    init = async () => await this.storage.create();

    setToken = async ( token: string ) => {

      this.token = token;
      await this.storage.set('token', token);

    };

    getToken = ( ) => this.token;

    authenticate = ( data: IAuthenticateExternal ) => this.http.post<any>(`${URL}/authenticate`, data);


    loginFirebase = ({ email, password } ) => this.auth.signInWithEmailAndPassword(email, password);

    loginFirebaseGogle = ( ) => this.auth.signInWithPopup(  new firebase.default.auth.GoogleAuthProvider()  );

    goToHome = () => this.navController.navigateRoot('/main/tabs/tab1');


    logout = () => {
      this.storage.clear();
      this.navController.navigateRoot('/auth');
      return of(this.auth.signOut());
    };

}
