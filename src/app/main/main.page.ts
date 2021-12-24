import { Component, OnInit } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  mrecipes: any = [];
  user_id: String
  public foodList: any[];

  constructor(private myRecipesService: MyRecipesService,
     private alertController: AlertController,
     private authenticateService: AuthenticateService,
     private navCtrl: NavController,
     private firestore: AngularFirestore)
     { }

     async ngOnInit() {

      this.foodList = await this.initializeItems();

      this.authenticateService.userDetails().subscribe(res => {
        console.log('res', res);
        if (res !== null) {
          this.user_id = res.uid;
          // subscribe allows the data to be fetched whenever there is any changes to the data
          this.myRecipesService.getAllMyRecipes(this.user_id).subscribe(result => {this.mrecipes = result;
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
    const foodList = await this.myRecipesService.getAllMyRecipes(localStorage.getItem('uid'))
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
      if (currentFood.recipe_name && searchTerm) {
        return ((currentFood.recipe_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentFood.duration.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)); 
      }
    });
    }
    this.mrecipes = this.foodList;
  }

}
