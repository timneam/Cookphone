import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  date: string;
  
  constructor(private firestore: AngularFirestore) { }

  addRecipeOnDay(id, date, recipe_name) {
    return this.firestore.collection('Recipe on day').doc(id).collection(date).add({ recipe_name: recipe_name});
    }

    getAllRecipesOnDay(id, date) {
      return this.firestore.collection('Recipe on day').doc(id).collection(date).valueChanges({ idField: 'docid' });
      }

      updateRecipeOnDay(id, date, docid, recipe_name) {
        return this.firestore.collection('Recipe on day').doc(id).collection(date).doc(docid).set({ recipe_name: recipe_name});
      }
  
      deleteRecipeOnDay(id, docid, date) {
        return this.firestore.collection('Recipe on day').doc(id).collection(date).doc(docid).delete();
      }

}
