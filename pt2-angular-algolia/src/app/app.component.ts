import { Component } from '@angular/core';
import { data } from '../data/data';
import { DogService } from './../dog.service';
import algoliasearch from 'algoliasearch';
import { environment } from 'src/environments/environment';
declare var instantsearch: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: 'angular-algolia';
  serverDogs: any[];
  uploadingData: boolean = false;

  constructor(private dogService: DogService) {
  }

  CreateRecord(item: any) {
    let record = {};
    record['number'] = item.number;
    record['name'] = item.name;
    record['breed'] = item.breed;
    record['pic'] = item.pic;
    record['description'] = item.description;
    this.dogService.create_NewDog(record).then(resp => {
      console.log('item.Name added successfully.');
    })
    .catch(error => {
      console.log(error);
    });
  }

  async ngOnInit() {
    this.dogService.read_Dogs().subscribe(serverProduct => {
      if (this.uploadingData)
        return;

      this.serverDogs = serverProduct.map(e => {
        return {
          objectID: e.payload.doc.id,
          id: e.payload.doc.id,
          number: e.payload.doc.data()['number'],
          name: e.payload.doc.data()['name'],
          breed: e.payload.doc.data()['breed'],
          pic: e.payload.doc.data()['pic'],
          description: e.payload.doc.data()['description']
        };
      });
      
      if (this.serverDogs.length == 0) {
        this.uploadingData = true;
        data.forEach(p => {
          this.CreateRecord(p);
        });
      }
  
      const SearchClient = algoliasearch(environment.Algolia_Application_ID, environment.Algolia_Admin_API_Key);
      const index = SearchClient.initIndex("Dogs");

      index
      .saveObjects(this.serverDogs)
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      })
      .catch(err => {
        console.log(err);
      });
    });
  }
}
