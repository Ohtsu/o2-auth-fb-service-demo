import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { O2AuthFbService } from 'o2-auth-fb-service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  tokenSubscription: Subscription;
  userSubscription: Subscription;
  authService: O2AuthFbService;
  email: string;
  password: string;
  token: any;
  user: any;
  isAuthenticated = false;
  signin: any;
  signup: any;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.authService = new O2AuthFbService(firebaseAuth) ;
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.setTokenSubscription();
    this.setUserSubscription();
  }

  // signup() {
  //   this.authService.signupUser(this.email, this.password);
  // }

  loginEmail() {
    // console.log('loginEmail-----------------------');
    this.authService.loginEmail(this.email, this.password);
  }

  loginGoogle() {
    // console.log('loginGoogle-----------------------');
    this.token = this.authService.loginGoogle();
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
  }

  Logout() {
    this.authService.logout();
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
    });
  }
  getTokenByLocalStorage () {
    const token = this.authService.getTokenByLocalStorage();
    console.log('token-----------------', token);
    return token;
  }

  getUserByLocalStorage () {
    const user = this.authService.getUserByLocalStorage();
    console.log('user-----------------', user);
    return user;
  }

}
