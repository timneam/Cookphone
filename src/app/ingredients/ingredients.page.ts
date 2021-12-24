import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.page.html',
  styleUrls: ['./ingredients.page.scss'],
})
export class IngredientsPage implements OnInit {

  mingredients: any = [];
  user_id: String;
  public foodList: any[];

  constructor(private ingredientService: IngredientService,
    private alertController: AlertController,
    private authenticateService: AuthenticateService,
    private navCtrl: NavController) { }

    async ngOnInit() {

    this.foodList = await this.initializeItems();

    this.authenticateService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.user_id = res.uid;
        // subscribe allows the data to be fetched whenever there is any changes to the data
        this.ingredientService.getAllMyIngredients(this.user_id).subscribe(result => {this.mingredients = result;
        console.log(result);
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

  async initializeItems(): Promise<any> {
    const foodList = await this.ingredientService.getAllMyIngredients(localStorage.getItem('uid'))
    .pipe(first()).toPromise();
    return foodList;
  }

  async filterList(evt) {
    this.foodList = await this.initializeItems();
    console.log(this.foodList);
    const searchTerm = evt.srcElement.value;
    if (searchTerm.length == 0) {
      this.foodList = await this.initializeItems();
    } else {
  
    this.foodList = this.foodList.filter(currentFood => {
      if (currentFood.ingredient && searchTerm) {
        return ((currentFood.ingredient.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentFood.quantity.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)); 
      }
    });
    }
    this.mingredients = this.foodList;
  }


}
