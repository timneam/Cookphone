import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.page.html',
  styleUrls: ['./ingredient-details.page.scss'],
})
export class IngredientDetailsPage implements OnInit {

  ingredient_details: any = [];
  docid: String
  user_id: String
  myForm: FormGroup;

  constructor(

    private activatedRoute: ActivatedRoute, 
    private ingredientService: IngredientService,
    private formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private authenticateService: AuthenticateService,
    private navCtrl: NavController,
    private router: Router

  ) {

    this.myForm = formBuilder.group({
      'ingredient': '',
      'quantity': '',
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
            this.ingredientService.getOneOfMyIngredients(this.user_id, docid).subscribe(result => {
            this.ingredient_details = result;
            console.log(result)
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
        let docid = this.activatedRoute.snapshot.paramMap.get('docid');
        console.log(docid, this.user_id, this.myForm.value.ingredient, this.myForm.value.quantity)
        this.ingredientService.updateMyIngredient(docid, this.user_id, this.myForm.value.ingredient, this.myForm.value.quantity);
        this.router.navigate(['/tabs/ingredients']);
        }
        
        delete() {
          const alert = this.alertController.create({
          header: 'Alert',
          message: 'Are you sure you want to delete the record?',
          buttons: [
          { text: 'No', role: 'cancel'},
          { text: 'Yes',
          handler: (alertData) => { // Delete user through user service
          let docid = this.activatedRoute.snapshot.paramMap.get('docid');
          this.ingredientService.deleteMyIngredient(this.user_id, docid);
          this.router.navigate(['/tabs/ingredients']);
        }
      }
    ]}).then(alert => alert.present());
  }

}
