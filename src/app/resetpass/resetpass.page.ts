import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {

  myForm: FormGroup;

  constructor(
    public angularFireAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    ) { 

      this.myForm = formBuilder.group({
        'email': ''
        });
      
        
    }

  ngOnInit() {
  }

  sendPassword() {
    this.angularFireAuth.auth.sendPasswordResetEmail(this.myForm.value.email)
    .then(() => {
      console.log('email sent');
    })
  }

}
