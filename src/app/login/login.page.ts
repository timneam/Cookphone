import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msg: any = "";
  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private googlePlus: GooglePlus,
    private router:Router,
    private firebaseAuth: AngularFireAuth

  ) { }

  ngOnInit() {
    var currentUser = localStorage.getItem('uid')
    console.log(currentUser);
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  googleSignIn() {
    let params = {
     'webClientId': '452180275055-319d2ma90ab1348isot1f3s82e2tfkfi.apps.googleusercontent.com',
     'offline': true
     }
     this.googlePlus.login(params)
     .then(user => {
     this.msg = "Welcome " + user.email
     this.firebaseAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(user.idToken, null))
     this.navCtrl.navigateForward('/tabs/main');
     })
     .catch(err => this.msg = JSON.stringify(err).toString());
     }

  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        localStorage.setItem('uid', res.user.uid);
        this.navCtrl.navigateForward('/tabs/main');
      }, err => {
        this.errorMessage = err.message;
      })
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  goToResetPasswordPage() {
    this.navCtrl.navigateForward('/resetpass');
  }
}
