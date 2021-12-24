import { Component, OnInit } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nrecipe',
  templateUrl: './nrecipe.page.html',
  styleUrls: ['./nrecipe.page.scss'],
})
export class NrecipePage implements OnInit {

  mrecipe_details: any = [];
  docid: String
  user_id: String
  myForm: FormGroup;

  constructor(
    private myRecipesService: MyRecipesService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private navCtrl: NavController,
    private router: Router
  ) { 

    this.myForm = formBuilder.group({
      'recipe_name': '',
      'duration': '',
      'ingredients': '',
      'steps': '',
      'nutritionalvalues': ''
      });

  }

  ngOnInit() {
  }

  add() {
        this.myRecipesService.addMyRecipe(
          localStorage.getItem('uid'), 
          this.myForm.value.recipe_name,
          this.myForm.value.duration,
          this.myForm.value.ingredients,
          this.myForm.value.steps,
          this.myForm.value.nutritionalvalues)
          this.router.navigate(['/tabs/main']);
  }

}