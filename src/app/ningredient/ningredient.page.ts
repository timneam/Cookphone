import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ningredient',
  templateUrl: './ningredient.page.html',
  styleUrls: ['./ningredient.page.scss'],
})
export class NingredientPage implements OnInit {

  ningredient_details: any = [];
  docid: String
  user_id: String
  myForm: FormGroup;

  constructor(

    private ingredientService: IngredientService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
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
  }

  add() {
    this.ingredientService.addMyIngredient(
      localStorage.getItem('uid'), 
      this.myForm.value.ingredient,
      this.myForm.value.quantity)
      this.router.navigate(['/tabs/ingredients']);
}

}
