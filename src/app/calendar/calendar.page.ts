import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticateService  } from '../services/authenticate.service';
import { AlertController } from '@ionic/angular';
import { CalendarService } from '../services/calendar.service'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  eventSource = [];
  user_id: String;
  onDateSelected: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  allRecipesOnDays: any = [];

  constructor(
    private db: AngularFirestore,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private authService: AuthenticateService,
    private calendarService:CalendarService,
    private router: Router

    ) 
    { }

  ngOnInit() {
  }

  onChange($event) {
    console.log($event);
    console.log($event.format('DD-MM-YYYY'));
    this.onDateSelected = $event.format('DD-MM-YYYY');
    this.calendarService.getAllRecipesOnDay(localStorage.getItem('uid'),this.onDateSelected).subscribe(result => {this.allRecipesOnDays = result
    console.log(result);
  });
  }

  createEvents() {
      const alert = this.alertController.create({
      header: 'Enter recipe:',
      inputs: [{name: 'recipe_name'}],
      buttons: [
      { text: 'Cancel', role: 'cancel'},
      { text: 'Ok',
      handler: (alertData) => { //takes the data
            this.calendarService.addRecipeOnDay(
            localStorage.getItem('uid'),
            this.onDateSelected,
            alertData.recipe_name
          )
        }
      }
    ]}).then(alert => alert.present());
  }

  edit(allRecipesOnDay) {
        const alert = this.alertController.create({
        header: 'Edit recipe:',
        inputs: [{name: 'recipe_name'}],
        buttons: [
        {text: 'Cancel', role: 'cancel'},
        {text: 'Ok',
        handler: (alertData) => { //takes the data

        //console.log(localStorage.getItem('uid'),this.onDateSelected,allRecipesOnDay.docid,alertData.recipe_name)

        this.calendarService.updateRecipeOnDay(
          localStorage.getItem('uid'),
          this.onDateSelected,
          allRecipesOnDay.docid,
          alertData.recipe_name
        )
        }
      }
    ]}).then(alert => alert.present());
  }

  delete(allRecipesOnDay) {
        const alert = this.alertController.create({
        header: 'Alert',
        message: 'Are you sure you want to delete the record?',
        buttons: [
        { text: 'No', role: 'cancel'},
        { text: 'Yes',
        handler: (alertData) => { // Delete user through user service

        this.calendarService.deleteRecipeOnDay(
          localStorage.getItem('uid'),
          allRecipesOnDay.docid,
          this.onDateSelected,
          );
      }
    }
  ]}).then(alert => alert.present());
}

}
