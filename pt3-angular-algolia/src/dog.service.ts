import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(
    private firestore: AngularFirestore
  ) { }

create_NewDog(record){
  return this.firestore.collection('Dogs').add(record);
}

read_Dogs(){
  return this.firestore.collection('Dogs').snapshotChanges();
}

update_Dog(recordID,record) {
  this.firestore.doc('Dogs/' + recordID).update(record);
}

delete_Dog(record_id) {
  this.firestore.doc('Dogs/' + record_id).delete();
  }
}
