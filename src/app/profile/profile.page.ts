import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService  } from '../services/authenticate.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string;
  private myToast: any;
  photo: string = './assets/defaultprofilepicture.jpg';
  myForm: FormGroup;

  capturedSnapURL:string;

  // Upload Task 
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  //Uploaded Image List
  images: Observable<MyData[]>;

  //File details  
  fileName:string;
  fileSize:number;

  //Status check 
  isUploading:boolean;
  isUploaded:boolean;

  private imageCollection: AngularFirestoreCollection<MyData>;
  googlePlus: any;
  msg: string;
  constructor
  (
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private storage: AngularFireStorage, 
    private database: AngularFirestore,
    private toast: ToastController,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private camera: Camera
  ) 
  { 
    this.myForm = formBuilder.group({
      'current_email': '',
      'new_email':'',
      'current_password': '',
      'new_password':''
      });

    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('userprofilepictures');
    this.images = this.imageCollection.valueChanges();

  }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        if (res.photoURL !== null) {
          this.photo = res.photoURL;
        }
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

  }


  uploadFile(event: FileList) {
    
    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }

    this.isUploading = true;
    this.isUploaded = false;

    this.fileName = file.name;

    // The storage path
    const path = `UserStorage/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Cookphone' };

    //File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();

    this.authService.updateProfilePic(image.filepath);
    console.log(image.filepath);

    this.myToast = this.toast.create({
      message: 'Profile picture updated!',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
    this.photo = image.filepath;
  }

  updateProfileInfo(url:string) {
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

takeSnap() {
  const cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(cameraOptions).then((imageData) => {
    // this.camera.DestinationType.FILE_URI gives file URI saved in local
    // this.camera.DestinationType.DATA_URL gives base64 URI
    
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.capturedSnapURL = base64Image;
  }, (err) => {
    
    console.log(err);
    // Handle error
  });
  
}

upload() {
  let storageRef = firebase.storage().ref();
  // Create a timestamp as filename

  const filename = Math.floor(Date.now() / 1000);

  // Create a reference to 'images/todays-date.jpg'

  const imageRef = storageRef.child(`images/${filename}.jpg`);

  imageRef.putString(this.capturedSnapURL, firebase.storage.StringFormat.DATA_URL)
    .then((snapshot)=> {
      // Do something here when the data is succesfully uploaded!
    });
}

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        localStorage.removeItem('uid');
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
    }

  updateEmailOrPassword() {
      if (this.myForm.value.current_password !== '') {
        console.log(this.myForm.value.new_password)
        if (this.myForm.value.new_password !== '') {
          this.changePassword();
        }
        console.log(this.myForm.value.new_email)
        if (this.myForm.value.new_email !== '') {
          this.changeEmail();
        }
      }
      else { 
        console.log("Enter current password")
       }
    }
  
  changePassword() {
     this.authService.updatePassword(this.myForm.value.current_password,this.myForm.value.new_password);
      this.myForm.reset();
    }
  
  changeEmail() {
      this.authService.updateEmail(this.myForm.value.current_password,this.myForm.value.new_email).then((newemail) => 
      this.userEmail = newemail
      );
      this.myForm.reset();
    }
  
}
