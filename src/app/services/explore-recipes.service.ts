import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExploreRecipesService {

  constructor(private firestore: AngularFirestore) { }

    getAllERecipes() {
    return this.firestore.collection('Recipes').valueChanges({ idField: 'docid' });
    }
    getOneERecipe(id) {
    return this.firestore.collection('Recipes').doc(id).valueChanges();
    }
    
}
