import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private firestore: AngularFirestore) { }

  addMyIngredient(id, ingredient, quantity) {
    return this.firestore.collection('Ingredients').doc(id).collection('ingredient list').add({ ingredient: ingredient, quantity: quantity });
    }

    updateMyIngredient(docid, id, ingredient, quantity) {
      return this.firestore.collection('Ingredients').doc(id).collection('ingredient list').doc(docid).set({ ingredient: ingredient, quantity: quantity});
    }

    deleteMyIngredient(id, docid) {
      return this.firestore.collection('Ingredients').doc(id).collection('ingredient list').doc(docid).delete();
    }

    getAllMyIngredients(id) {
    return this.firestore.collection('Ingredients').doc(id).collection('ingredient list').valueChanges({ idField: 'docid' });
    }

    getOneOfMyIngredients(id, docid) {
      return this.firestore.collection('Ingredients').doc(id).collection('ingredient list').doc(docid).valueChanges();    
    }
}
