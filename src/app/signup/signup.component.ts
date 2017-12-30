import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnChanges } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

import { O2AuthFbService } from 'o2-auth-fb-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authService: O2AuthFbService;
  email: string;
  password: string;
  token: string;
  user: string;
  isAuthenticated = false;

  constructor(private firebaseAuth: AngularFireAuth ) {
    this.authService = new O2AuthFbService(firebaseAuth) ;
  }

  ngOnInit() {
  }

  signup() {
    this.authService.signupUser(this.email, this.password);
  }

 }
