import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { OnChanges } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { O2AuthFbService } from 'o2-auth-fb-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy, OnChanges  {
  tokenSubscription: Subscription;
  userSubscription: Subscription;
  authService: O2AuthFbService;
  email: string;
  password: string;
  token: string;
  user: string;
  isAuthenticated = false;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router ) {
    this.authService = new O2AuthFbService(firebaseAuth) ;
  }

  ngOnChanges() {
    this.getAuthStatus();
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.setTokenSubscription();
    this.setUserSubscription();
  }

  signup() {
    this.authService.signupUser(this.email, this.password);
  }

  refreshPage() {
    console.log('refreshPage--------------------');
    this.router.navigated = false;
    this.router.navigate([this.router.url]);
  }

  loginEmail() {
    // console.log('loginEmail-----------------------');
    this.authService.loginEmail(this.email, this.password);
  }

  loginGoogle() {
    // console.log('loginGoogle-----------------------');
    this.authService.loginGoogle();
  }


  loginFacebook() {
    // console.log('loginFacebook-----------------------');
    this.authService.loginFacebook();
  }

  loginTwitter() {
    // console.log('loginTwitter-----------------------');
    this.authService.loginTwitter();
  }

  loginGithub() {
    // console.log('loginGithub-----------------------');
    this.authService.loginGithub();
    this.getAuthStatus();
  }

  Logout() {
    this.authService.logout();
    this.getAuthStatus();
  }

  getUser () {
    console.log('User-----------------', this.user);
    return this.user;
  }

  getToken () {
    console.log('token-----------------', this.token);
    return this.token;
  }


  getAuthStatus() {
    console.log('isAuthenticated-----------------', this.isAuthenticated);
    return this.isAuthenticated;
  }



  setUserSubscription() {
    this.userSubscription = this.authService.getUser().subscribe(user => {
      this.user = user;
      console.log('user-----------------', this.user);
    });
  }

  setTokenSubscription() {
    this.tokenSubscription = this.authService.getToken().subscribe(token => {
      this.token = token;
      this.isAuthenticated = ( (this.token != null) && (this.token !== ''));
      console.log('token-----------------', this.token);
      console.log('isAuthenticated-----------------', this.isAuthenticated);
      this.refreshPage();
    });
  }

  getTokenByLocalStorage () {
    const tkn = O2AuthFbService.gToken;
    const token = this.authService.getTokenByLocalStorage();
    console.log('token-----------------', token, tkn);
    return token;
  }

  getUserByLocalStorage () {
    const user = this.authService.getUserByLocalStorage();
    console.log('user-----------------', user);
    return user;
  }


}
