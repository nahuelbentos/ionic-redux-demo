import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './create-user/create-user.component';



@NgModule({
  declarations: [

    AvatarSelectorComponent,
    HeaderComponent,
    UserComponent,
    CreateUserComponent,
  ],
  exports: [

    AvatarSelectorComponent,
    HeaderComponent,
    UserComponent,
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class ComponentsModule { }
