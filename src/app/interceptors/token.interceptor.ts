/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AppState } from '../store/app.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

      const token = this.authService.getToken();

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status !== 200) {
            console.log('Ocurrio algo raro!', 'Ver que onda..');
          }
        }

        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('err:: ', err);

        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
        // const mensajes = err.error.errores.mensajeErrores;

        // mensajes && mensajes.length > 0
        //   ? mensajes.forEach((mensaje) => this.toast.error(mensaje))
        //   : this.toast.error(err.error.errores.mensaje);

        return throwError(err);
      }),
    );
  }
}
