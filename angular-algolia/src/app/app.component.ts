import { Component } from '@angular/core';
import { data } from '../data/data';
import { ProductService } from './../product.service';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import VoiceWidget from "../../public/voice-widget/voice-widget.js";
import algoliasearch from 'algoliasearch';
declare var instantsearch: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: 'angular-algolia';
  categories: any[];
  serverProducts: any[];
  uploadingData: boolean = false;

  constructor(private productService: ProductService) {
  }
  
  async ngOnInit() {
    this.productService.read_Products().subscribe(serverProduct => {
      if (this.uploadingData)
        return;

      this.serverProducts = serverProduct.map(e => {
        return {
          objectID: e.payload.doc.id,
          id: e.payload.doc.id,
          number: e.payload.doc.data()['number'],
          name: e.payload.doc.data()['name'],
          category: e.payload.doc.data()['category'],
          price: e.payload.doc.data()['price'],
        };
      });
      
      if (this.serverProducts.length == 0) {
        this.uploadingData = true;
        data.forEach(p => {
          this.CreateRecord(p);
        });
      }
  
      this.categories = this.groupBy(this.serverProducts, 'category');
      console.log(JSON.stringify(this.categories));

      const SearchClient = algoliasearch(environment.Algolia_Application_ID, environment.Algolia_Admin_API_Key);
      const index = SearchClient.initIndex("Products");

      index
      .saveObjects(this.serverProducts)
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      })
      .catch(err => {
        console.log(err);
      });
    });

    var socket = io.connect("http://....:port/");
// var socket = io.connect("https://voice-search-demo.herokuapp.com/");

    const search = instantsearch({
      indexName: 'Products',
      searchClient: algoliasearch('TDH1HFPX5P', 'c3227e6d3ffe36e1d3cdeefa6e290f0f'),
    });
    
    // search.addWidgets([
    //   instantsearch.widgets.searchBox({
    //     container: '#searchbox',
    //   }),
    //   instantsearch.widgets.clearRefinements({
    //     container: '#clear-refinements',
    //   }),
    //   instantsearch.widgets.refinementList({
    //     container: '#category-list',
    //     attribute: 'category',
    //   }),
    //   instantsearch.widgets.hits({
    //     container: '#hits',
    //     templates: {
    //       item: `
    //       <div class="card">
    //         <img src="" class="card-img-top" alt="...">
    //         <div class="card-body">
    //           <h5 class="card-title">{{category}}</h5>
    //           <p class="card-text">{{name}}</p>
    //         </div>
    //       </div>
    //       `,
    //     },
    //   }),
    //   instantsearch.widgets.pagination({
    //     container: '#pagination',
    //   }),
    // ]);




    search.addWidgets([
      instantsearch.widgets.hits({ 
        container: '#hits',
        templates: {
        item: `
        <div class="card">
          <img src="" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{category}}</h5>
            <p class="card-text">{{name}}</p>
          </div>
        </div>
        `,
      },
      }),
      new VoiceWidget({
        container: "#voice-search",
        placeholder: "Search for ....",
        socket: socket,
        processor: "gcp" // gcp || 
      })      
    ]);

    // search.addWidget(
    //   new VoiceWidget({
    //     container: "#voice-search",
    //     placeholder: "Search for ....",
    //     socket: socket,
    //     processor: "gcp" // gcp || 
    //   })
    // );
    
    search.start();
  }

  CreateRecord(item: any) {
    let record = {};
    record['number'] = item.number;
    record['name'] = item.name;
    record['category'] = item.category;
    record['price'] = item.price;
    this.productService.create_NewProduct(record).then(resp => {
      console.log('item.Name added successfully.');
    })
    .catch(error => {
      console.log(error);
    });
  }

  groupBy = function (objArr: any[], propName: string): any[] {
    return objArr.reduce((acc, obj) => {
      const key = obj[propName];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  };

}
