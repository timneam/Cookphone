import { Component, OnInit } from '@angular/core';
import { ExploreRecipesService } from '../services/explore-recipes.service';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

erecipes: any =[];
public foodList: any[];

  constructor(
    private exploreRecipesService: ExploreRecipesService,
     private alertController: AlertController,
     private authenticateService: AuthenticateService,
     private navCtrl: NavController,
     private iab: InAppBrowser
  ) { }

  async ngOnInit() {

    this.foodList = await this.initializeItems();

    this.exploreRecipesService.getAllERecipes().subscribe(result => {this.erecipes = result;
      console.log(result);
    });
  }

  async initializeItems(): Promise<any> {
    const foodList = await this.exploreRecipesService.getAllERecipes()
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
      if (currentFood.Name && searchTerm) {
        return ((currentFood.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentFood.Duration.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)); 
      }
    });
    }
    this.erecipes = this.foodList;
  }

  open(){
    const browser = this.iab.create('https://www.allrecipes.com/recipes/', 'defaults' , { location:'no' });

    browser.on('loadstart').subscribe(event => {
    });

    browser.on('exit').subscribe(event => {
      browser.close();
    });
}








}

