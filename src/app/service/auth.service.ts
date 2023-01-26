import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/interface';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User> (null);
//  private tokenExpirationTimer:any

  constructor(private http:HttpClient, private router:Router) { }


  signUp(email:any ,password:any){
    return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCI0SXIjBY4uQvZYf6GG5T4pjn_FET2XOE',{
      email:email,
      password:password,
      returnSecureToken: true,
    }).pipe(
      tap(res =>{
        this.authenticatedUser(res.email,res.localId,res.idToken,+res.expiresIn)
      })
    )
  }

  signIn(email:any ,password:any){
    return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCI0SXIjBY4uQvZYf6GG5T4pjn_FET2XOE',{
      email:email,
      password:password,
      returnSecureToken: true,
    }).pipe(
      tap(res =>{
        this.authenticatedUser(res.email,res.localId,res.idToken,+res.expiresIn)
      })
    )
  }

  signOut(){
    this.user.next(null)
    this.router.navigate(['/login']);
    sessionStorage.removeItem('UserData')
    // if(this.tokenExpirationTimer){
    //   clearTimeout(this.tokenExpirationTimer);
    // }

    // this.tokenExpirationTimer = null
  }

  // autoSignOut(expirationDuration:any){
  //   this.tokenExpirationTimer =  setTimeout(() => {
  //       this.signOut();
  //   }, expirationDuration);
  // }

  autoSignIn(){
    const userDataList = sessionStorage.getItem('UserData');
    const userData = JSON.parse(userDataList)
    if(!userData){
      return
    }
    const loggedInUser = new User(userData.email, userData.id , userData._token, new Date(userData._tokenExpirationDate))
    if(loggedInUser.token){
      this.user.next(loggedInUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      // this.autoSignOut(expirationDuration)
    }
  }

  private authenticatedUser(email:any,userId:any,token:any,expiredIn:any){
    const expirationDate = new Date(new Date().getTime() + expiredIn*100);
    const user =  new User(email,userId,token,expirationDate)
    // this.autoSignOut(expiredIn*1000)    
    this.user.next(user);
    sessionStorage.setItem('UserData',JSON.stringify(user) )
  } 

  forgotPassword(data:any){
    return  this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCI0SXIjBY4uQvZYf6GG5T4pjn_FET2XOE',{
      requestType:'PASSWORD_RESET',
      email:data
    })
  }

  getUserData(){  
    
  }

  changePassword(data:any){
    return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCI0SXIjBY4uQvZYf6GG5T4pjn_FET2XOE',{
      idToken:data.idToken,
      password:data.password,
      returnSecureToken:true
    })
  }
  
}
