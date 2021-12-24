import { Component, OnInit } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mrecipe-details',
  templateUrl: './mrecipe-details.page.html',
  styleUrls: ['./mrecipe-details.page.scss'],
})
export class MrecipeDetailsPage implements OnInit {

  mrecipe_details: any = [];
  docid: String
  user_id: String
  myForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, 
    private myRecipesService: MyRecipesService,
    private formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private authenticateService: AuthenticateService,
    private navCtrl: NavController,
    private router: Router) 
    
    {
      this.myForm = formBuilder.group({
        'recipe_name': '',
        'duration': '',
        'ingredients': '',
        'steps': '',
        'nutritionalvalues': ''
        });  
     }

  ngOnInit() {
    this.authenticateService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
            this.user_id = res.uid;

            // Get the id that was passed with the URL
            let docid = this.activatedRoute.snapshot.paramMap.get('docid');

            // Retrieve the user information through userService
            this.myRecipesService.getOneOfMyRecipes(this.user_id, docid).subscribe(result => {
            this.mrecipe_details = result;
            this.mrecipe_details.docid = docid;
            console.log(this.mrecipe_details)
            });
          } 
          else 
          {
            this.navCtrl.navigateBack('');
          }
        }, err => {
          console.log('err', err);
        })
      }

      update() {
        console.log(this.mrecipe_details.docid, this.user_id, this.myForm.value.recipe_name, this.myForm.value.duration, this.myForm.value.ingredients, this.myForm.value.steps, this.myForm.value.nutritionalvalues)
        this.myRecipesService.update(this.mrecipe_details.docid, this.user_id, this.myForm.value.recipe_name, this.myForm.value.duration, this.myForm.value.ingredients, this.myForm.value.steps, this.myForm.value.nutritionalvalues);
        this.router.navigate(['/tabs/main']);
        }
        
        delete() {
          const alert = this.alertController.create({
          header: 'Alert',
          message: 'Are you sure you want to delete the record?',
          buttons: [
          { text: 'No', role: 'cancel'},
          { text: 'Yes',
          handler: (alertData) => { // Delete user through user service
          this.myRecipesService.delete(this.user_id, this.mrecipe_details.docid);
          this.router.navigate(['/tabs/main']);
        }
      }
    ]}).then(alert => alert.present());
  }

}

