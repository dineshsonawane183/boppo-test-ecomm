import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

let users = [{ id: 1, firstName: 'Jason', lastName: 'Stringify', username: 'admin', password: 'pass@123' }];

@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService) { }

    public isAuthenticated(): boolean {
        const token: any = sessionStorage.getItem('token');
         return !this.jwtHelper.isTokenExpired(token);
    }
    public login(username: string, password: string): Observable<any> {
        const user = users.find(x => x.username === username && x.password === password);
        if (!user) return this.error('Username or password is incorrect');
         return this.ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        });
    }
    public logout(): Observable<any>{
       sessionStorage.removeItem('token');
       const body = { message : "user logged out" }
       return of(new HttpResponse({ status: 200, body }))
    }
    // helper functions
     ok(body:any) {
         sessionStorage.setItem("token",body.token);
        return of(new HttpResponse({ status: 200, body }))
    }

    error(message:any) {
        return throwError({ error: { message } });
    }
}