import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { IAuthenticate } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import {
  authenticate,
  authenticateWithGoogle,
} from '../../store/actions/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('slidesPrincipal', { static: false }) slides: IonSlides;
  subscription: Subscription;

  loginUser = {
    username: 'nahuel',
    password: 'nahuel123',
  };

  registerUser: IAuthenticate = {
    username: 'nahuel',
    password: 'nahuel123',
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<AppState>,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('auth')
      .subscribe(({ redirectHome, token  }) => {
        if (redirectHome) {
          this.navController.navigateRoot('/main/tabs/tab1');
        }
      });

    this.store
      .select('ui')
      .subscribe(({ message }) => this.uiService.showToast(message));
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  ionViewDidLeave = () => this.subscription.unsubscribe();

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { username, password } = this.loginUser;
    const data = { username, password, loginWith: 'INTERNAL' };

    this.store.dispatch(authenticate({ data }));
  }

  loginWithGoogle = () => this.store.dispatch(authenticateWithGoogle());

  async register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const isOk = await this.userService.createUser(this.registerUser);
    if (isOk) {
      this.navController.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alertaInformacion(' Ese correo electronico ya existe');
    }
    console.log(form);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarIngresar() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
}
