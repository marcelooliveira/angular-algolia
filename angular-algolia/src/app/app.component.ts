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

  products: any;
  productNumber: number;
  productName: string;
  productCategory: string;
  productPrice: number;

  constructor(private productService: ProductService) {
    this.categories = this.groupBy(data, 'category');
  }

  ngOnInit() {
    this.productService.read_Products().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          Number: e.payload.doc.data()['Number'],
          Name: e.payload.doc.data()['Name'],
          Category: e.payload.doc.data()['Category'],
          Price: e.payload.doc.data()['Price'],
        };
      })
      console.log(this.products);
    });

    console.log(40);
    data.forEach(product => {
    console.log(42);

      this.CreateRecord(product)
    });
    console.log(46);

  }

  CreateRecord(item: any) {
    let record = {};
    record['Number'] = item.Number;
    record['Name'] = item.Name;
    record['Category'] = item.Category;
    record['Price'] = item.Price;
    this.productService.create_NewProduct(record).then(resp => {
      console.log('item.Name added successfully.');
    })
    .catch(error => {
      console.log(error);
    });
  }

  // RemoveRecord(rowID) {
  //   this.productService.delete_Product(rowID);
  // }

  // EditRecord(record) {
  //   record.isEdit = true;
  //   record.EditName = record.Name;
  //   record.EditCalories = record.Calories;
  //   record.EditDescription = record.Description;
  // }

  // UpdateRecord(recordRow) {
  //   let record = {};
  //   record['Number'] = recordRow.EditName;
  //   record['Name'] = recordRow.EditName;
  //   record['Category'] = recordRow.EditCalories;
  //   record['Price'] = recordRow.EditDescription;
  //   this.productService.update_Product(recordRow.id, record);
  //   recordRow.isEdit = false;
  // }

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
