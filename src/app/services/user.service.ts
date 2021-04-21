/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import {
  IAuthenticate,
  Usuario,
  ResponseUsers,
} from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ResponseUser } from '../interfaces/interfaces';

const URL = `${environment.url}/api/v1`;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usuario: IAuthenticate = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) {
    this.init();
  }

  init = async () => await this.storage.create();

  getUsers = (
    pageNumber: number = 0,
    pageRecords: number = 100,
  ) =>
    this.http.get<ResponseUsers>(
      `${URL}/users?pageNumber=${pageNumber}&pageRecords=${pageRecords}`
    );

  getUserById = (id: string) =>
    this.http.get<ResponseUser>(`${URL}/users/${id}`);

  createUser = (data: Usuario) => this.http.post<ResponseUser>(`${URL}/users`, data);

}
