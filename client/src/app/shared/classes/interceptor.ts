import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';




@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  user = {
    name: "Tolik",
    age: 25
  }

  private setTokenInRequest(req: HttpRequest<any>): HttpRequest<any>{
    return req.clone({
        setHeaders: {                   
            Authorization: JSON.stringify(this.user)
        }
    })
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.setTokenInRequest(req)
    return next.handle(req)
  }

}