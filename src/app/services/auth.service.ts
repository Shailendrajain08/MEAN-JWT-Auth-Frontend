import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrls } from '../../api.url';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false)

  registerService(registerObj : any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj : any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  sendEmailService(email:string) {
    return this.http.post<any>(`${apiUrls.authServiceApi}forgetPassword`, {email:email});
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}resetPassword`, resetObj);
  }

  isLoggedIn(){ 
    return !!localStorage.getItem("user_id")
  }

}
