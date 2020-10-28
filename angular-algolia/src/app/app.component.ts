import { Component } from '@angular/core';
import { data } from '../data/data';
import { ProductService } from './../product.service';

const pageSize = 4;

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
  
  ngOnInit() {
    this.productService.read_Products().subscribe(serverProduct => {
      if (this.uploadingData)
        return;

      this.serverProducts = serverProduct.map(e => {
        return {
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
    });
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

  pageIndexes = function (items: number[]): number[] {
    return [...Array(Math.floor(Math.ceil(items.length / pageSize))).keys()];
  }

  pageItems = function (items: number[], pageIndex: number): number[] {
    return items.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  }
}
