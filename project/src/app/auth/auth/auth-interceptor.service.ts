// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpParams,
//   HttpRequest,
// } from '@angular/common/http';
// import { Observable, exhaustMap, take } from 'rxjs';
// import { AuthService } from './auth.service';

// export class AuthInterceptorService implements HttpInterceptor {
//   constructor(private authSer: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
//     return this.authSer.user.pipe(
//       take(1),
//       exhaustMap((user) => {
//         if (user?.token) {
//           const modifiedReq = req.clone({
//             params: new HttpParams().set('auth', user.token),
//           });
//           return next.handle(modifiedReq);
//         }
//         return next.handle(req);
//       })
//     );
//   }
// }
