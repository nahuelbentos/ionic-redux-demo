import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { createUser } from '../../store/actions/user.actions';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.buildForm();
  }

  ngOnInit() {}

  buildForm() {
    this.form = this.fb.group({
      username: ['nahuel', Validators.required],
      password: ['nahuel123', Validators.required],
    });
  }

  create(e: Event) {
    e.preventDefault();

    this.store.dispatch(createUser({ user: this.form.value }));
  }

}
