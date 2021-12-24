import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private afAuth: AngularFireAuth) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG OUT");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.afAuth.user
  }

  updateProfilePic(url:string) {
      this.afAuth.currentUser.then((result) => { result.updateProfile(
        {
          photoURL: url
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });
    });
  }


    updatePassword(oldPw:string,newPw:string) {

      this.afAuth.currentUser.then((result) => {
        
        const credential = auth.EmailAuthProvider.credential(result.email, oldPw);
          console.log(credential);
       
        result.reauthenticateWithCredential(credential);

        result.updatePassword(newPw).then(function(result) {
          alert("Password updated!")
          })
          .catch(function(error) {
            alert(error);
          });

          })

      }

      updateEmail(oldPw,email) {

        return new Promise<any>(resolve => {

          this.afAuth.currentUser.then((result) => {
          
            const credential = auth.EmailAuthProvider.credential(
              result.email,oldPw
          );
              console.log(credential);
            // Now you can use that to reauthenticate
            result.reauthenticateWithCredential(credential).then((result2) => {
      
              result.updateEmail(email).then(function() {
                console.log('Email updated');
                localStorage.setItem('email', email);
                resolve(email);
              })
                .catch(function(error) {
                  alert(error);
                });
            });
          });  
      });
  }

}
