import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyRecipesService {

  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

    addMyRecipe(id, name, duration, ingredients, steps, nv) {
    return this.firestore.collection('User Recipes').doc(id).collection('user recipe list').add({ recipe_name: name, duration: duration, ingredients: ingredients, steps:steps, nutritionalvalues: nv });
    }

    update(docid, id, name, duration, ingredients, steps, nv) {
      return this.firestore.collection('User Recipes').doc(id).collection('user recipe list').doc(docid).set({ recipe_name: name, duration: duration, ingredients: ingredients, steps:steps, nutritionalvalues: nv });
    }

    delete(id, docid) {
      return this.firestore.collection('User Recipes').doc(id).collection('user recipe list').doc(docid).delete();
    }

    getAllMyRecipes(id) {
      return this.firestore.collection('User Recipes').doc(id).collection('user recipe list').valueChanges({ idField: 'docid' });    
    }

    getOneOfMyRecipes(id, docid) {
      return this.firestore.collection('User Recipes').doc(id).collection('user recipe list').doc(docid).valueChanges();    
    }
}
