// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:8080',
  firebase: {
    apiKey: 'AIzaSyBY1iKjwOliqouQjOb379ebVerCfJwgYF4',
    authDomain: 'spring-security-demo-1e56f.firebaseapp.com',
    projectId: 'spring-security-demo-1e56f',
    storageBucket: 'spring-security-demo-1e56f.appspot.com',
    messagingSenderId: '544087831482',
    appId: '1:544087831482:web:e0985cb3c495a52c58e383'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
