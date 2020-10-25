import { Component } from '@angular/core';
import { data } from '../data/data';

const pageSize = 4;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: 'angular-algolia';
  categories: any[];

  constructor() {
    this.categories = this.groupBy(data, 'category');
  }

  groupBy = function(objArr: any[], propName: string): any[] {
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

  pageIndexes = function(items: number[]) : number[] {
    return [...Array(Math.floor(Math.ceil(items.length / pageSize))).keys()];
  }

  pageItems = function(items: number[], pageIndex: number) : number[] {
    return items.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  }
}
