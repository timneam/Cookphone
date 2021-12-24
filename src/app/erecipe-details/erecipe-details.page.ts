import { Component, OnInit } from '@angular/core';
import { ExploreRecipesService } from '../services/explore-recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-erecipe-details',
  templateUrl: './erecipe-details.page.html',
  styleUrls: ['./erecipe-details.page.scss'],
})
export class ErecipeDetailsPage implements OnInit {

  erecipe_details: any = [];
  id: String

  constructor(

    private activatedRoute: ActivatedRoute, 
    private exploreRecipesService: ExploreRecipesService,
    private alertController: AlertController, 
    private authenticateService: AuthenticateService,
    private navCtrl: NavController,
    private router: Router

  ) { }

  ngOnInit() {
    let docid = this.activatedRoute.snapshot.paramMap.get('docid');

    // Retrieve the user information through userService
    this.exploreRecipesService.getOneERecipe(docid).subscribe(result => {
    this.erecipe_details = result;
    this.erecipe_details.docid = docid;
    });
  }
}
